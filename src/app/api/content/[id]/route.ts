import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/lib/models/Content';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const item = await Content.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(item.cloudinaryId);

    // Delete from MongoDB
    await Content.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { title, image } = await req.json();

    const item = await Content.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    let updateData: any = { title };

    // If new image is provided, upload to Cloudinary and replace
    if (image && image.startsWith('data:image')) {
      // Small check to see if it's already the same URL (unlikely with base64)
      await cloudinary.uploader.destroy(item.cloudinaryId);
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'qv_trattoria',
      });
      updateData.imageUrl = uploadResponse.secure_url;
      updateData.cloudinaryId = uploadResponse.public_id;
    }

    const updatedItem = await Content.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
