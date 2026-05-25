import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Content from '@/lib/models/Content';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    await connectDB();
    const items = await Content.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, image } = await req.json();

    if (!title || !image) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'qv_trattoria',
    });

    const newItem = await Content.create({
      title,
      imageUrl: uploadResponse.secure_url,
      cloudinaryId: uploadResponse.public_id,
    });

    // Revalidate the cache for paths that display this content
    revalidatePath('/');
    revalidatePath('/highlights');

    return NextResponse.json(newItem);
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
