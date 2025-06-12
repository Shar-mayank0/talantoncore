import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../lib/dbConfig';
import User from '../../model/user';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();

        // Validate required fields
        const file = formData.get('file') as File;
        const fileName = formData.get('fileName');
        const fileType = formData.get('fileType');
        const password = formData.get('password');

        if (!file || !fileName || !fileType || !password) {
            return NextResponse.json(
                { success: false, message: 'File name, file type, and password are required' },
                { status: 400 }
            );
        } else if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/gif') {
            return NextResponse.json(
                { success: false, message: 'Invalid file type. Only PNG, JPEG, and GIF are allowed.' },
                { status: 400 }
            );
        }
        const user = await User.findOne({ Password: password });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid password' },
                { status: 401 }
            );
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filename = `${uuidv4()}-${file.name}`;

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: `uploads/${filename}`,
            Body: buffer,
            ContentType: file.type,
            ACL: 'public-read' // or remove if private
        });

        await s3.send(command);

        const publicUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/uploads/${filename}`;
        await User.findOneAndUpdate(
            { Password: password },
            { $set: { PhotoUrl: publicUrl } }
        );
        return NextResponse.json({ success: true, message: 'File uploaded successfully' }, { status: 201 });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { success: false, message: 'File upload failed' },
            { status: 500 }
        );
    }
}