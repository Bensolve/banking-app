import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body: LoginRequestBody = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: 'Login successful',
        name: user.name,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing login request:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
