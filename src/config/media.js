/**
 * Centralized media configuration.
 *
 * All hero images and assessment-video URLs are resolved through this module
 * so swapping providers, names, or transformations only happens in one place.
 *
 * Behavior:
 * - If REACT_APP_CLOUDINARY_CLOUD is set at build time, URLs point to
 *   Cloudinary with auto-format and auto-quality optimization.
 * - Otherwise, falls back to the local files in /public/assessment-videos
 *   and the existing Unsplash placeholders in the hero. This keeps the
 *   site working before/while Cloudinary is being configured.
 *
 * See MEDIA.md for setup, upload conventions, and the workflow for
 * swapping client-provided assets without redeploying.
 */

const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD || '';
const PUBLIC_URL = process.env.PUBLIC_URL || '';
const useCloudinary = Boolean(CLOUDINARY_CLOUD);

const NS = 'wwm';

const cloudinary = (resource, publicId, transform = 'f_auto,q_auto') =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/${resource}/upload/${transform}/${NS}/${publicId}`;

// Assessment movement videos.
// Key = the slug used in FitnessAssessment movement configs.
// assetId = the file basename in /public/assessment-videos AND the Cloudinary
// public id under wwm/assessment-videos/<assetId>.
const VIDEO_ASSETS = {
  'thoracic-extension': {
    assetId: 'thoracic-extension',
    label: 'Thoracic extension demo video',
  },
  'thoracic-rotation': {
    assetId: 'thoracic-rotation',
    label: 'Thoracic rotation demo video',
  },
  'hip-internal-rotation': {
    assetId: 'hip-internal-rotation',
    label: 'Hip internal rotation demo video',
  },
  'shoulder-external': {
    assetId: 'shoulder-external-rotation',
    label: 'Shoulder external rotation demo video',
  },
  'shoulder-internal': {
    assetId: 'shoulder-internal-rotation',
    label: 'Shoulder internal rotation demo video',
  },
  'pelvic-tilt': {
    assetId: 'pelvic-tilt',
    label: 'Pelvic tilt demo video',
  },
};

export function getAssessmentVideo(slug) {
  const asset = VIDEO_ASSETS[slug];
  if (!asset) return null;

  if (useCloudinary) {
    // Public ID must match uploads under wwm/assessment-videos/<basename>
    // (see MEDIA.md — no extension in the delivery path).
    return {
      label: asset.label,
      sources: [
        {
          src: cloudinary('video', `assessment-videos/${asset.assetId}`),
          type: 'video/mp4',
        },
      ],
    };
  }

  const base = `${PUBLIC_URL}/assessment-videos`;
  return {
    label: asset.label,
    sources: [
      { src: `${base}/${asset.assetId}.mp4`, type: 'video/mp4' },
      { src: `${base}/${asset.assetId}.mov`, type: 'video/quicktime' },
    ],
  };
}

// Hero images. Three slots; in Cloudinary they live as wwm/hero/1.jpg,
// wwm/hero/2.jpg, wwm/hero/3.jpg so the client can re-upload with the same
// public id to swap them without touching code.
const HERO_FALLBACK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80',
    alt: 'Swimmer in action',
  },
  {
    src: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop&q=80',
    alt: 'Swimmer training',
  },
  {
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&q=80',
    alt: 'Competitive swimmer diving',
  },
];

export function getHeroImages() {
  if (useCloudinary) {
    return [1, 2, 3].map((idx) => ({
      // Public IDs wwm/hero/1 … wwm/hero/3 (see MEDIA.md).
      src: cloudinary('image', `hero/${idx}`, 'f_auto,q_auto,w_800,h_600,c_fill'),
      alt: HERO_FALLBACK_IMAGES[idx - 1].alt,
    }));
  }
  return HERO_FALLBACK_IMAGES;
}

export const mediaProvider = useCloudinary ? 'cloudinary' : 'local';
