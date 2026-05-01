# Media management (Cloudinary)

All hero images and assessment-screen demo videos are served through
[Cloudinary](https://cloudinary.com) so they can be swapped without
touching the codebase or redeploying.

## Why Cloudinary

- **Free tier** covers this site comfortably (we use ~150 MB storage and
  generate well under 1 GB of monthly bandwidth)
- **Auto format/quality** — the same URL serves AVIF/WebP/MP4 depending on
  the visitor's browser, with quality tuned to bandwidth
- **Stable public IDs** — re-uploading a file with the same name overwrites
  the old asset, so `hero/1.jpg` always points at "the current first hero
  image" without code changes
- **Dashboard-friendly** — the client (or anyone given access) can swap
  assets through a UI

## One-time setup

1. **Create the account**
   - Go to <https://cloudinary.com/users/register/free>
   - Sign up and skip any "what are you building" surveys
   - On the dashboard, copy the **Cloud name** (top of the page, looks
     like `dxxxxxxxx`)

2. **Wire it into local builds**
   - Copy `.env.example` to `.env` at the repo root:
     ```bash
     cp .env.example .env
     ```
   - In `.env`, set:
     ```
     REACT_APP_CLOUDINARY_CLOUD=your-cloud-name
     ```
   - `npm start` to verify the site loads media from Cloudinary in dev.

3. **Bake it into deploys**
   - `npm run deploy` reads the same `.env`, so as long as the variable
     is set when you run the command locally, the production bundle
     will use Cloudinary URLs.

## Asset naming convention

Cloudinary identifies assets by **public ID** — essentially folder + filename
without the extension. Use these IDs exactly so the code finds the assets:

### Hero images (3 slots)

| Public ID         | What it is                          |
|-------------------|-------------------------------------|
| `wwm/hero/1`      | First hero image (currently swimmer in action) |
| `wwm/hero/2`      | Second hero image (currently swimmer training) |
| `wwm/hero/3`      | Third hero image (currently competitive diver) |

Source images should be at least **800 x 600 px** (Cloudinary will resize and
optimize down for each device). Landscape orientation, JPG or PNG.

### Assessment demo videos (6 clips)

| Public ID                                       | What it is                |
|-------------------------------------------------|---------------------------|
| `wwm/assessment-videos/thoracic-extension`      | Thoracic extension demo   |
| `wwm/assessment-videos/thoracic-rotation`       | Thoracic rotation demo    |
| `wwm/assessment-videos/hip-internal-rotation`   | Hip internal rotation demo|
| `wwm/assessment-videos/shoulder-external-rotation` | Shoulder external rot. demo |
| `wwm/assessment-videos/shoulder-internal-rotation` | Shoulder internal rot. demo |
| `wwm/assessment-videos/pelvic-tilt`             | Pelvic tilt demo          |

Videos can be `.mp4` or `.mov` source — Cloudinary transcodes to the optimal
format per browser. They loop, so keep them short (5–15 s) and start/end on
similar frames for a clean repeat.

## Initial upload (dashboard)

In the Cloudinary dashboard:

1. Go to **Media Library**
2. Click **Upload** → **Web Address** or drag-and-drop
3. **Important**: before uploading, click the gear/options icon and set
   the **public ID** to the value from the table above (e.g.
   `wwm/hero/1`). Cloudinary will create the `wwm` and `hero` folders
   automatically.
4. Make sure **Use filename or externally defined Public ID** is enabled,
   or just type the public ID manually.

The assessment videos are currently in this repo at
`public/assessment-videos/*.mp4` — the easiest path is to upload all 6
`.mp4` files (you can drop the `.mov` duplicates) into
`wwm/assessment-videos/` with public IDs matching the filenames.

## Initial upload (script — recommended)

From the repo root, put credentials in `.env` (gitignored):

```bash
cp .env.example .env
```

Either paste **Programmable API → API Environment variable** as `CLOUDINARY_URL=…`,
or set `REACT_APP_CLOUDINARY_CLOUD`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

Then:

```bash
npm run upload-media
```

This uploads the three **Unsplash** hero placeholders at **800×600** crop and all six
assessment **`.mp4`** files from `public/assessment-videos/` using the public IDs in the tables above.

After uploads succeed, bake the cloud name into production builds so GitHub Pages picks up CDN URLs:

Create **`.env.production`** (safe to commit — cloud names are public):

```
REACT_APP_CLOUDINARY_CLOUD=your_cloud_name_here
```

Then `npm run deploy`. Alternatively set `REACT_APP_CLOUDINARY_CLOUD` in your shell when deploying.

## Swapping a hero image (the common case)

When the client sends new hero photos:

1. Cloudinary dashboard → Media Library → `wwm/hero/`
2. Click the existing hero asset (`1`, `2`, or `3`) → **Replace**
3. Upload the new file. The public ID stays the same → live site updates
   within seconds (cache TTL).

No code change. No deploy.

## Removing local fallbacks (optional cleanup)

Once Cloudinary is uploaded and verified working in production:

```bash
git rm -r public/assessment-videos
git commit -m "Remove local assessment videos now that Cloudinary serves them"
git push origin main && npm run deploy
```

This shrinks the repo by ~150 MB. Keep this step until **after** you've
confirmed the Cloudinary URLs work in production — the local files act
as a fallback if `REACT_APP_CLOUDINARY_CLOUD` is unset.

## Where the URLs are constructed

All URL building lives in [`src/config/media.js`](./src/config/media.js).
If you ever change naming conventions, transformations, or providers,
that file is the single place to edit.
