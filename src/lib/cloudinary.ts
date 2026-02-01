import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
}

export async function uploadImage(
  file: File | string,
  folder: string = 'portfolio'
): Promise<UploadResult> {
  let uploadSource: string;

  if (typeof file === 'string') {
    uploadSource = file;
  } else {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    uploadSource = `data:${file.type};base64,${buffer.toString('base64')}`;
  }

  const result = await cloudinary.uploader.upload(uploadSource, {
    folder: `deepak-portfolio/${folder}`,
    resource_type: 'auto',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    size: result.bytes,
  };
}

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const { width, height, quality = 'auto', format = 'auto' } = options;

  const transformations: string[] = [`q_${quality}`, `f_${format}`];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push('c_fill');

  return cloudinary.url(publicId, {
    transformation: transformations.join(','),
  });
}

export default cloudinary;
