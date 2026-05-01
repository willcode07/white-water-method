#!/usr/bin/env node
/**
 * Upload hero placeholder images (from Unsplash) and local assessment MP4s
 * to Cloudinary with stable public IDs matching src/config/media.js and MEDIA.md.
 *
 * Requires in repo-root `.env` (gitignored):
 *   REACT_APP_CLOUDINARY_CLOUD=<cloud_name>
 *   CLOUDINARY_API_KEY=<api_key>
 *   CLOUDINARY_API_SECRET=<api_secret>
 *
 * Or a single line from the dashboard “API Environment variable”:
 *   CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 *
 * Usage:
 *   npm run upload-media
 */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

function configureCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    // SDK reads CLOUDINARY_URL automatically (dashboard → API Keys → env line).
    return;
  }

  const cloudName =
    process.env.REACT_APP_CLOUDINARY_CLOUD || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error(`
Missing Cloudinary credentials.

Add one of:
  CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

or all three:
  REACT_APP_CLOUDINARY_CLOUD=<cloud_name>
  CLOUDINARY_API_KEY=<key>
  CLOUDINARY_API_SECRET=<secret>

(copy from Cloudinary Dashboard → Programmable API → API Keys)

Then run: npm run upload-media
`);
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

const HERO_UNSPLASH = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80',
];

const VIDEO_BASE_NAMES = [
  'thoracic-extension',
  'thoracic-rotation',
  'hip-internal-rotation',
  'shoulder-external-rotation',
  'shoulder-internal-rotation',
  'pelvic-tilt',
];

async function uploadHeroes() {
  for (let i = 0; i < HERO_UNSPLASH.length; i += 1) {
    const idx = i + 1;
    const url = HERO_UNSPLASH[i];
    // eslint-disable-next-line no-await-in-loop
    const result = await cloudinary.uploader.upload(url, {
      public_id: `wwm/hero/${idx}`,
      overwrite: true,
      invalidate: true,
    });
    console.log(`Hero ${idx}:`, result.secure_url);
  }
}

function uploadVideoFile(localPath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      localPath,
      {
        resource_type: 'video',
        public_id: publicId,
        overwrite: true,
        invalidate: true,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

async function uploadVideos() {
  const root = path.join(__dirname, '..', 'public', 'assessment-videos');

  for (const base of VIDEO_BASE_NAMES) {
    const mp4 = path.join(root, `${base}.mp4`);
    if (!fs.existsSync(mp4)) {
      console.error(`Missing file: ${mp4}`);
      process.exit(1);
    }
    const publicId = `wwm/assessment-videos/${base}`;
    // eslint-disable-next-line no-await-in-loop
    const result = await uploadVideoFile(mp4, publicId);
    console.log(`Video ${base}:`, result.secure_url);
  }
}

async function main() {
  configureCloudinary();

  console.log('Uploading hero images from Unsplash…');
  await uploadHeroes();

  console.log('\nUploading assessment videos from public/assessment-videos…');
  await uploadVideos();

  console.log('\nDone. Build or deploy with REACT_APP_CLOUDINARY_CLOUD set to this cloud.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
