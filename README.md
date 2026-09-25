# Expert4visas frontend — GitHub and Vercel

This archive contains the React/Vite frontend source, its required content schema, and Vercel configuration. Extract the ZIP before uploading to GitHub.

## 1. Upload to GitHub

1. Open https://github.com/new and create a repository named `expert4visas-frontend`. You may keep the repository private. Initialize it with a README to make the upload menu easy to find.
2. Open the repository and select **Add file → Upload files**.
3. Open the extracted folder. Drag its contents into GitHub, including `src`, `public`, `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, and `vercel.json`. Upload the files and folders, not the ZIP or an extra enclosing folder.
4. Select **Commit changes**. Check that `package.json` is visible at the top level of the repository.

GitHub's browser uploader allows 100 files per upload and 25 MiB per file. This prepared archive is below both limits. If the repository is completely empty, its **uploading an existing file** link also opens the uploader.

## 2. Deploy on Vercel

1. Open https://vercel.com/new and sign in with GitHub.
2. Allow Vercel to access the new repository, select it, and click **Import**.
3. Use these settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | Leave at repository root (`.`) |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

The included `vercel.json` supplies the install, build, output, and framework settings.

4. Click **Deploy**. Open the deployment URL when the build finishes.
5. Later commits to the connected production branch trigger new deployments.

## What works with frontend hosting

The public website renders using the bundled default text and images. Navigation and client-side interactions remain available. Images hosted on other websites still require those external services.

The contact form, live review loading/submission, admin login, and inline editor require the original Python backend. They will not work from this frontend deployment alone. Content previously saved in the backend database is not included. No backend, database, credentials, Python environment, or installed Node dependencies are in this ZIP.

The frontend calls `/api/...` on the same site. The proxy in `vite.config.js` works only during local development; it does not connect Vercel to your computer. To enable these features, deploy the Python backend with persistent data storage, then configure a Vercel external rewrite for `/api/:path*` to that backend's HTTPS `/api/:path*` address and verify its authentication, cookies, and production settings. This package does not configure an unknown backend URL.

The `/edit` page has a Vercel rewrite so its login screen can load; sign-in and saving still need the backend.

## Package changes

- Copied the shared `content-schema.json` into `src` and updated its import so this frontend can build independently.
- Added `vercel.json` with Vite build settings and `/edit` routing.
- Added ignore rules for local Vercel settings and environment files.
- Preserved the website's application code and design apart from the schema import.

## Official references

- GitHub uploads: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Vercel project import: https://vercel.com/docs/getting-started-with-vercel
- Vite on Vercel: https://vercel.com/docs/frameworks/frontend/vite
