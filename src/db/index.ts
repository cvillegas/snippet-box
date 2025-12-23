import path from 'path';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { Logger } from '../utils';

const logger = new Logger('db');

// DB config
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/db.sqlite3',
  logging: false
});

// Migrations config (umzug v3)
const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, './migrations/*.{js,ts}').replace(/\\/g, '/'),
    resolve: ({ name, path: migrationPath, context }) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const migration = require(migrationPath as string);
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context)
      };
    }
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined
});

export const connectDB = async () => {
  const isDev = process.env.NODE_ENV === 'development';

  try {
    // Create & connect db
    await sequelize.authenticate();
    logger.log('Database connected');

    // Check migrations
    const pendingMigrations = await umzug.pending();

    if (pendingMigrations.length > 0) {
      logger.log(`Found pending migrations. Executing...`);

      if (isDev) {
        pendingMigrations.forEach(({ name }) =>
          logger.log(`Executing ${name} migration`, 'DEV')
        );
      }
    }

    await umzug.up();
  } catch (err) {
    logger.log(`Database connection error`, 'ERROR');

    if (isDev) {
      console.log(err);
    }

    process.exit(1);
  }
};
