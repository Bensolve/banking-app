import mongoose, { Schema, Document } from "mongoose";

export interface AccountDocument extends Document {
  userId: mongoose.Types.ObjectId;
  accountType: string;
  balance: number;
}

const AccountSchema = new Schema<AccountDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  accountType: { type: String, required: true },
  balance: { type: Number, required: true },
});

export default mongoose.models.Account || mongoose.model<AccountDocument>("Account", AccountSchema);
