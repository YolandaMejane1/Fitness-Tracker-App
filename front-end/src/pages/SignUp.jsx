import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthCard, { Field, PrimaryButton } from '../components/AuthCard';
import GoogleButton from '../components/GoogleButton';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../api/axiosInstance';
import { GOOGLE_ENABLED } from './Login';

const SignUp = () => {
  const { signUp, loginWithGoogle, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const run = async (fn) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(errorMessage(err, 'Could not create your account.'));
      setBusy(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Please enter your name.');
    if (form.password.length < 8) return setError('Password must be at least 8 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    run(() => signUp({ name: form.name.trim(), email: form.email, password: form.password }));
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start tracking every rep"
      error={error}
      footer={<>Already have an account? <Link to="/login" className="underline font-semibold">Log in</Link></>}
    >
      <form onSubmit={onSubmit} noValidate>
        <Field id="name" label="Full name" autoComplete="name" value={form.name} onChange={onChange} />
        <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={onChange} />
        <Field id="password" label="Password (8+ characters)" type="password" autoComplete="new-password" value={form.password} onChange={onChange} />
        <Field id="confirm" label="Confirm password" type="password" autoComplete="new-password" value={form.confirm} onChange={onChange} />
        <PrimaryButton type="submit" loading={busy}>Sign up</PrimaryButton>
      </form>
      {GOOGLE_ENABLED && (
        <>
          <div className="flex items-center my-5 text-xs text-red-200">
            <span className="flex-1 border-t border-red-800" /><span className="px-3">or</span><span className="flex-1 border-t border-red-800" />
          </div>
          <GoogleButton onCredential={(c) => run(() => loginWithGoogle(c))} onError={setError} />
        </>
      )}
    </AuthCard>
  );
};

export default SignUp;
