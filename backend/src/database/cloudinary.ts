import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

export default cloudinary;
// app/api/upload/route.ts or pages/api/upload.ts



export async function POST(request: Request) {
  try {
    const file = await request.blob();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    
    return Response.json({ url: result.secure_url });
    
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ message: 'Upload failed' }, { status: 500 });
  }
}
