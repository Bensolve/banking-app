import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // Parse the request body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if the provided password matches
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user details
    return NextResponse.json(
      {
        message: 'User data retrieved successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return NextResponse.json(
      { message: 'An error occurred while retrieving user data' },
      { status: 500 }
    );
  }
}