import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthCard, { Field, PrimaryButton } from '../components/AuthCard';
import GoogleButton from '../components/GoogleButton';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../api/axiosInstance';

export const GOOGLE_ENABLED = !!process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.from || '/dashboard';

  if (isAuthenticated) return <Navigate to={dest} replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const run = async (fn) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      navigate(dest, { replace: true });
    } catch (err) {
      setError(errorMessage(err, 'Could not sign you in.'));
      setBusy(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Enter your email and password.');
    run(() => login(form));
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to see your progress"
      error={error}
      footer={<>New here? <Link to="/signup" className="underline font-semibold">Create an account</Link></>}
    >
      <form onSubmit={onSubmit} noValidate>
        <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={onChange} />
        <Field id="password" label="Password" type="password" autoComplete="current-password" value={form.password} onChange={onChange} />
        <PrimaryButton type="submit" loading={busy}>Log in</PrimaryButton>
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

export default Login;
