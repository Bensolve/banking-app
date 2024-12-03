import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';



export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Set an httpOnly cookie with the user's email (example, use session ID in real apps)
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `session=${email}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`
    );

    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Error during login' }), {
      status: 500,
    });
  }
}
