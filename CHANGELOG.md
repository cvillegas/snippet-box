### v2.1.0 (2025-12-23)

**New Feature: Import/Export Snippets** - *Added by [Cesar Villegas](https://github.com/cvillegas)*

- Added ability to export all snippets to JSON file
- Added ability to import snippets from JSON file
- Duplicate handling: skip by default, with option to overwrite
- Import/Export buttons available on the Snippets library page

---

### v2.0.0 (2025-12-23)

**Security Updates & Modernization** - *Updated by [Cesar Villegas](https://github.com/cvillegas)*

This release addresses critical security vulnerabilities and updates all dependencies to their latest stable versions.

> This is a community-maintained update. Original project by [Paweł Malak](https://github.com/pawelmalak).

#### Backend Updates
- Upgraded Node.js from 14 (EOL) to **20 LTS**
- Updated Express from 4.17.1 to **4.21.0** (path traversal & DoS fixes)
- Updated Sequelize from 6.6.5 to **6.35.2** (SQL injection fixes)
- Updated sqlite3 from 5.0.2 to **5.1.7** (buffer overflow fixes)
- Updated TypeScript from 4.4.3 to **5.3.2**
- Updated Umzug from 2.3.0 to **3.4.0** (migration system rewrite)
- Removed deprecated `@types/umzug` (now included in umzug)

#### Frontend Updates
- Updated React from 17.0.2 to **18.2.0**
- Updated react-scripts from 4.0.3 to **5.0.1** (webpack & postcss CVE fixes)
- Updated axios from 0.21.4 to **1.6.2** (SSRF & CSRF fixes)
- Updated react-router-dom from 5.3.0 to **6.21.0**
- Updated react-markdown from 7.0.1 to **9.0.1** (XSS fixes)
- Replaced deprecated `node-sass` with **sass 1.69.5** (dart-sass)
- Updated Bootstrap from 5.1.1 to **5.3.2**
- Updated highlight.js from 11.2.0 to **11.9.0**

#### Breaking Changes (handled in this release)
- Migrated from Umzug v2 to v3 API
- Migrated from React Router v5 to v6 (`Switch` → `Routes`, `useHistory` → `useNavigate`)
- Migrated from React 17 to React 18 (`ReactDOM.render` → `createRoot`)
- Fixed JSON named exports for webpack 5 compatibility

---

### v1.4 (2021-10-14)
- Added search functionality ([#18](https://github.com/pawelmalak/snippet-box/issues/18))
- Fixed date parsing bug ([#22](https://github.com/pawelmalak/snippet-box/issues/22))
- Minor UI fixes

### v1.3.1 (2021-10-05)
- Added support for raw snippets ([#15](https://github.com/pawelmalak/snippet-box/issues/15))

### v1.3 (2021-09-30)
- Added dark mode ([#7](https://github.com/pawelmalak/snippet-box/issues/7))
- Added syntax highlighting ([#14](https://github.com/pawelmalak/snippet-box/issues/14))

### v1.2 (2021-09-28)
- Added support for tags ([#10](https://github.com/pawelmalak/snippet-box/issues/10))

### v1.1 (2021-09-24)
- Added pin icon directly to snippet card ([#4](https://github.com/pawelmalak/snippet-box/issues/4))
- Fixed issue with copying snippets ([#6](https://github.com/pawelmalak/snippet-box/issues/6))

### v1.0 (2021-09-23)
Initial release
