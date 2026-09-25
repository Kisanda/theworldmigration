# Expert4visas frontend

React/Vite website, admin dashboard, and inline website editor for The World Migration.
This folder is a standalone Git repository root: package.json is at the top level.
The companion API is supplied in Expert4visas-backend.zip.

## Run locally

Use Node.js 22.12+ (the original project used Node 24). From this folder:

```powershell
npm ci --ignore-scripts
npm run dev
```

Open http://localhost:5175, /admin.html for the admin dashboard, or /edit for
the website editor. Start the companion backend on 127.0.0.1:5000 first for
forms, reviews, login, and content publishing. Vite forwards /api requests there.

```powershell
npm run build
npm run lint
```

The build is written to dist/. Serve dist/ with a production web server.
Route /api/ to the backend on the same public HTTPS origin and use an index.html
fallback for /edit. Vite's development proxy is not included in a production build.
The companion backend ZIP includes example Nginx configuration and headers.
This source uses same-origin requests; hosting the API on an unrelated origin
requires additional integration work, especially for editor cookies.

## GitHub

Commit the contents of this folder, including package-lock.json, .gitignore,
source assets, and content-schema.json. Dependency folders, dist/, and real
environment files are excluded. No frontend API secret is needed; never put
admin credentials or editor passwords in source code or VITE_ variables.

content-schema.json is shared with the backend. Keep the two copies synchronized
when changing editable fields. Website content saved through the editor lives in
the backend database; this ZIP contains source defaults, not existing database content.
Photo credits and external resource details are in DESIGN-SOURCES.md.

## Packaging changes

The original frontend directory was moved to this repository root and its schema
import was adjusted. Application behavior and design were otherwise preserved.
Installed dependencies, generated builds, and cache files were omitted.
