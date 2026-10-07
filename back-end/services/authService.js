import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const signToken = (user) =>
  jwt.sign({ userId: user._id.toString() }, env.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: `${env.tokenDays}d`,
  });

const session = (user) => ({ token: signToken(user), user: user.toPublic() });

export const signUp = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'An account with this email already exists');
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
  return session(user);
};

export const logIn = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  // Same message for unknown email and wrong password.
  if (!user || !(await user.isValidPassword(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  return session(user);
};

let googleClient;
export const verifyGoogle = async (credential) => {
  if (!env.googleClientId) throw new ApiError(501, 'Google sign-in is not configured');
  googleClient = googleClient || new OAuth2Client(env.googleClientId);
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: env.googleClientId });
    const p = ticket.getPayload();
    if (!p?.email || !p.email_verified) throw new Error('unverified');
    return p;
  } catch {
    throw new ApiError(401, 'Google sign-in failed. Please try again');
  }
};

export const signInWithGoogle = async (credential) => {
  const p = await verifyGoogle(credential);
  const email = p.email.toLowerCase();
  let user = await User.findOne({ $or: [{ googleId: p.sub }, { email }] });
  if (!user) {
    user = await User.create({ email, name: p.name || '', googleId: p.sub, picture: p.picture || '' });
  } else {
    user.googleId = user.googleId || p.sub;
    user.picture = p.picture || user.picture;
    user.name = user.name || p.name || '';
    await user.save();
  }
  return session(user);
};

export const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(401, 'Account no longer exists');
  return user.toPublic();
};
