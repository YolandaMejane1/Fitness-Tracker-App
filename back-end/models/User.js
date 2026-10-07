import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Empty for accounts that only use Google sign-in.
    password: { type: String, select: false },
    googleId: { type: String, index: true, sparse: true },
    picture: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = function (plain) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.toPublic = function () {
  return { id: this._id.toString(), name: this.name, email: this.email, picture: this.picture };
};

export default mongoose.model('User', userSchema);
