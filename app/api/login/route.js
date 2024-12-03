import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';

export async function POST(req) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Error during login', error }), {
      status: 500,
    });
  }
}
