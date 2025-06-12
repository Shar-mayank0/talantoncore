import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConfig';
import User from '../../model/user';

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
       const users = await User.find({}, { Email: 1, _id: 0 }).lean();
        if (!users || users.length === 0) {
            return NextResponse.json({ error: 'No users found' }, { status: 404 });
        }
        return NextResponse.json({ emails: users });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
