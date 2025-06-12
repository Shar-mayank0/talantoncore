import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConfig';
import User from '../../model/user';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { Name, Email, Password } = await req.json();

        // Validate required fields
        if (!Email || !Password) {
            return NextResponse.json(
                { success: false, message: 'Email and Password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'User already exists' },
                { status: 409 }
            );
        }

        // Create new user with all fields
        const newUser = await User.create({
            Name,
            Email,
            Password
        });

        return NextResponse.json(
            { success: true, message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, message: 'Registration failed' },
            { status: 500 }
        );
    }
}