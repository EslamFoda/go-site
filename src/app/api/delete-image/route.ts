import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: 'dxrdyke2n',
  api_key: '942837621822288',
  api_secret: 'cWsGSZrxpEpnzjsBtSGhfIvKi-0'
});

export async function POST(request: Request) {
  const { publicId } = await request.json();

  if (!publicId) {
    return NextResponse.json(
      { success: false, message: 'Public ID is required' },
      { status: 400 }
    );
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to delete image' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}