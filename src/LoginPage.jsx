import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, firebaseConfigured, createAccount, login, logout, resetPassword } = useAuth();
  const [mode, setMode] = useState('login');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    promoOptIn: true,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const returnTo = location.state?.from || '/';

  const handleProfileChange = (event) => {
    const { name, type, checked, value } = event.target;
    setProfile((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const formatFirebaseError = (errorCode, message) => {
    const loginErrors = [
      'auth/invalid-credential',
      'auth/user-not-found',
      'auth/wrong-password',
      'auth/invalid-email',
      'auth/too-many-requests',
    ];

    if (mode === 'login' && loginErrors.includes(errorCode)) {
      return 'Invalid username or password.';
    }

    return message
      .replace('Firebase: ', '')
      .replace(/\s*\(auth\/.*\)\.?$/, '')
      .replaceAll('-', ' ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'signup') {
        await createAccount({ email, password, profile });
        setStatus('Account created. You are signed in.');
      } else {
        await login(email, password);
        setStatus('Signed in.');
      }
      navigate(returnTo);
    } catch (err) {
      setError(formatFirebaseError(err.code, err.message || 'Something went wrong.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    setStatus('');
    setError('');

    if (!email.trim()) {
      setError('Enter your email first, then request a password reset.');
      return;
    }

    try {
      await resetPassword(email);
      setStatus('Password reset email sent.');
    } catch (err) {
      setError(formatFirebaseError(err.code, err.message || 'Unable to send reset email.'));
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
      <img
        src="/fanclub1.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-12 pt-32 sm:px-6 lg:pt-36">
        <div className="w-full max-w-xl border border-purple-800 bg-zinc-950/90 p-5 shadow-[0_0_35px_rgba(126,34,206,0.22)] backdrop-blur-md sm:p-8">
          {!firebaseConfigured && (
            <div className="mb-6 border border-yellow-500/50 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
              Firebase is not configured yet. Add the `VITE_FIREBASE_*` values from your Firebase project to `.env`.
            </div>
          )}

          {currentUser ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">Signed in</p>
                <h1 className="mt-2 text-3xl font-extrabold text-purple-200">
                  {currentUser.displayName || currentUser.email}
                </h1>
                <p className="mt-2 text-purple-200">{currentUser.email}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => navigate('/merch')}
                  className="rounded-full border border-purple-600 px-5 py-3 font-bold text-purple-100 transition hover:border-green-400 hover:text-green-300"
                >
                  Shop Merch
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-400">
                  Vanylla Godzylla
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-purple-100">Account</h1>
              </div>

              <div className="mb-6 grid grid-cols-2 overflow-hidden rounded-full border border-purple-800 bg-black">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-bold transition ${
                    mode === 'login' ? 'bg-purple-700 text-white' : 'text-purple-200 hover:text-green-300'
                  }`}
                >
                  <LogIn size={18} />
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-bold transition ${
                    mode === 'signup' ? 'bg-purple-700 text-white' : 'text-purple-200 hover:text-green-300'
                  }`}
                >
                  <UserPlus size={18} />
                  Create
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        placeholder="First name"
                        className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        placeholder="Last name"
                        className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      placeholder="Phone"
                      className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      name="addressLine1"
                      value={profile.addressLine1}
                      onChange={handleProfileChange}
                      placeholder="Address"
                      className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      name="addressLine2"
                      value={profile.addressLine2}
                      onChange={handleProfileChange}
                      placeholder="Apartment, suite, etc."
                      className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_0.65fr_0.75fr]">
                      <input
                        type="text"
                        name="city"
                        value={profile.city}
                        onChange={handleProfileChange}
                        placeholder="City"
                        className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        name="state"
                        value={profile.state}
                        onChange={handleProfileChange}
                        placeholder="State"
                        maxLength="2"
                        className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        value={profile.postalCode}
                        onChange={handleProfileChange}
                        placeholder="ZIP"
                        className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  required
                  className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-purple-700 bg-zinc-900 px-4 py-3 pr-12 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 transition hover:text-green-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {error && <p className="text-sm font-semibold text-red-300">{error}</p>}
                {status && <p className="text-sm font-semibold text-green-300">{status}</p>}

                {mode === 'signup' && (
                  <label className="flex items-start gap-3 rounded-xl border border-purple-900/70 bg-black/50 px-4 py-3 text-sm text-purple-100">
                    <input
                      type="checkbox"
                      name="promoOptIn"
                      checked={profile.promoOptIn}
                      onChange={handleProfileChange}
                      className="mt-1 h-4 w-4 accent-green-500"
                    />
                    <span>Send me merch drops, show updates, and promotional offers.</span>
                  </label>
                )}

                <button
                  type="submit"
                  disabled={submitting || !firebaseConfigured}
                  className="w-full rounded-full bg-green-500 px-7 py-3 font-bold text-black shadow-md transition hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                >
                  {submitting ? 'Working...' : mode === 'signup' ? 'Create Account' : 'Login'}
                </button>
              </form>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={!firebaseConfigured}
                  className="mt-5 text-sm font-semibold text-purple-200 transition hover:text-green-300 disabled:cursor-not-allowed disabled:text-gray-500"
                >
                  Send password reset email
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
