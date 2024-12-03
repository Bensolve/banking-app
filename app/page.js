
import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';


export default async function Home() {
  let message = 'Database connection failed';

  try {
    await connectToDatabase();
    const users = await User.find({});
    message = `Connected to MongoDB. User count: ${users.length}`;
  } catch (error) {
    console.error('Database connection error:', error);
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to My Banking App</h1>
      <p>{message}</p>
    </div>
  );
}
