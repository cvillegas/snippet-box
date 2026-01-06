# Snippet Box

![Snippet library screenshot](./.github/img/snippets.png)

## Description

Snippet Box is a simple self-hosted app for organizing your code snippets. It allows you to easily create, edit, browse and manage your snippets in various languages. With built-in Markdown support, Snippet Box makes it very easy to add notes or simple documentation to your code.

> **Note:** This is a modernized fork with updated dependencies and security fixes.
> 
> **Original Author:** [Pawel Malak](https://github.com/pawelmalak) - [Original Repository](https://github.com/pawelmalak/snippet-box)
> 
> **Updated by:** [Cesar Villegas](https://github.com/cvillegas) - Security updates and dependency modernization (v2.0.0)

## Technology

- **Backend**
  - Node.js 20 LTS
  - TypeScript 5.3
  - Express.js 4.21
  - Sequelize ORM + SQLite
- **Frontend**
  - React 18.2
  - TypeScript 5.3
  - React Router 6
  - Bootstrap 5.3
- **Deployment**
  - Docker (Alpine-based)

## Quick Start

### Using Docker Compose (Recommended)

```yaml
services:
  snippet-box:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: snippet-box
    volumes:
      - ./data:/app/data
    ports:
      - 5050:5000
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

```bash
# Build and start
docker compose build
docker compose up -d

# Access the app
open http://localhost:5050
```

### Using Docker Run

```bash
# Build the image
docker build -t snippet-box .

# Run the container
docker run -d \
  --name snippet-box \
  -p 5050:5000 \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  snippet-box
```

## Development

```bash
# Clone repository
git clone https://github.com/pawelmalak/snippet-box
cd snippet-box

# Install dependencies
npm run init

# Start development servers (backend + frontend)
npm run dev
```

The development server will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Data Persistence

All your snippets are stored in a SQLite database at `/app/data/db.sqlite3` inside the container.

**Backup your data:**
```bash
cp ./data/db.sqlite3 ./backup-$(date +%Y%m%d).sqlite3
```

**Restore from backup:**
```bash
cp ./backup-20241223.sqlite3 ./data/db.sqlite3
docker compose restart
```

## Migration from v1.x

If you're upgrading from the original Snippet Box (v1.4 or earlier):

1. Stop your existing container
2. Backup your `data/db.sqlite3` file
3. Copy it to the new `data/` directory
4. Build and start the new container

Your existing snippets will be preserved automatically.

## Functionality

- **Import / Export**
  - Export all snippets to a JSON file for backup or migration
  - Import snippets from JSON file
  - Skip duplicates or overwrite existing snippets

- **Search**
  - Search your snippets with built-in tags and language filters

- **Pinned snippets**
  - Pin your favorite / important snippets to home screen for easy and quick access

![Homescreen screenshot](./.github/img/home.png)

- **Snippet library**
  - Manage your snippets through snippet library
  - Easily filter and access your code using tags

![Snippet library screenshot](./.github/img/snippets.png)

- **Snippet**
  - View your code, snippet details and documentation
  - Built-in syntax highlighting
  - Easily perform snippet actions like edit, pin or delete from a single place

![Snippet screenshot](./.github/img/snippet.png)

- **Editor**
  - Create and edit your snippets from simple and easy to use editor

![Editor screenshot](./.github/img/editor.png)

## Search Functionality

Visit wiki for search functionality and available filters reference: [Search functionality](https://github.com/pawelmalak/snippet-box/wiki/Search-functionality)

## Security Updates (v2.0)

This version includes critical security updates:

| Package | Previous | Updated | Fixes |
|---------|----------|---------|-------|
| Node.js | 14 (EOL) | 20 LTS | Multiple CVEs |
| Express | 4.17.1 | 4.21.0 | Path traversal, DoS |
| axios | 0.21.4 | 1.6.2 | SSRF, CSRF |
| react-scripts | 4.0.3 | 5.0.1 | Webpack, PostCSS CVEs |
| node-sass | 6.0.1 | sass 1.69.5 | LibSass deprecated |
| Sequelize | 6.6.5 | 6.35.2 | SQL injection |

See [CHANGELOG.md](./CHANGELOG.md) for the complete list of updates.

## License

MIT License - see [LICENCE.md](./LICENCE.md)

## Credits

- **Original Author:** [Paweł Malak](https://github.com/pawelmalak)
- **v2.0 Updates:** [Cesar Villegas](https://github.com/cvillegas)

This project is a fork of the original [snippet-box](https://github.com/pawelmalak/snippet-box) repository, updated to address security vulnerabilities and modernize dependencies.
