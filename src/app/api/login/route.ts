import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConfig';
import User from '../../model/user';

export async function POST(req: NextRequest) {
    await dbConnect();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        return NextResponse.json({ success: true, isVerified: true}, { status: 200 });
    }
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}