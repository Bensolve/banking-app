import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';



export async function POST(req) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();
    console.log('Received signup request:', { email });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 400,
      });
    }

    // Save the new user to MongoDB
    const newUser = new User({ email, password });
    await newUser.save();
    console.log('User registered successfully:', { email });

    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return new Response(JSON.stringify({ message: 'Error saving user', error }), {
      status: 500,
    });
  }
}
