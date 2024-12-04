import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';


export async function POST(req) {
  await connectToDatabase();

  const { name, email, password } = await req.json();
  console.log('Received Signup Data:', { name, email, password }); // Debug log

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
  }

  const newUser = new User({
    name, // Ensure name is saved
    email,
    password,
  });

  await newUser.save();
  console.log('New user saved:', newUser); // Debug log

  return new Response(JSON.stringify({ message: 'Signup successful' }), { status: 201 });
}
