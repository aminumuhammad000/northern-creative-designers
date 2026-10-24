import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary SDK with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

/**
 * Upload an image (base64 data URI, buffer, or remote URL) to Cloudinary
 * @param file The file data URI or remote image URL
 * @param folder The folder path in Cloudinary (e.g. 'ncd-summit/attendees', 'ncd-summit/exhibitors')
 */
export async function uploadImage(file: string, folder = 'ncd-summit') {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName || cloudName.includes('your-cloud-name')) {
    // In preview/local mock mode
    return {
      success: true,
      url: file.startsWith('http') ? file : '/images/brand/logo.png',
      public_id: `mock-${Date.now()}`,
      isMock: true,
    }
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }, // Automatic WebP/AVIF compression
      ],
    })

    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to upload image to Cloudinary.'
    console.error('Cloudinary upload error:', message)
    return {
      success: false,
      error: message,
    }
  }
}
