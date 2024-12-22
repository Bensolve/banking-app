import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
  userId: string; // Reference to the user
  amount: number;
  type: "credit" | "debit"; // Type of transaction
  description: string;
  createdAt: Date;
}

const transactionSchema = new Schema<Transaction>(
  {
    userId: { type: Schema.Types.String, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", transactionSchema);
