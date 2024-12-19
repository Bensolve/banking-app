import mongoose from 'mongoose';

// Define the schema for a session
const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true }, // Unique identifier for the session
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    createdAt: { type: Date, default: Date.now }, // Session creation time
    expiresAt: { type: Date, required: true }, // Expiration time for the session
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Indexes for optimization
sessionSchema.index({ userId: 1 }); // Speeds up queries on userId
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Automatically deletes expired sessions

// Create the session model based on the schema
const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
