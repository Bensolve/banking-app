import mongoose from 'mongoose';

// Define the session schema
const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true }, // Unique session identifier
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    createdAt: { type: Date, default: Date.now }, // Creation time
    expiresAt: { type: Date, required: true }, // Expiration time
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// TTL Index to automatically delete expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // NEW CHANGE: Added TTL index for automatic cleanup

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
