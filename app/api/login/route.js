import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';



export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // Ensure the user's name is included in the response
  return new Response(
    JSON.stringify({ message: 'Login successful', name: user.name, email: user.email }),
    { status: 200 }
  );
}
