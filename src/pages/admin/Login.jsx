import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { auth } from "../../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-5 text-white">

      <div className="mx-auto flex min-h-screen max-w-md items-center">

        <div className="w-full">

          {/* Logo */}

          <div className="mb-12">

            <a
              href="/"
              className="text-lg font-semibold tracking-[-0.03em]"
            >
              SNIPSYNC
              <span className="text-white/40">®</span>
            </a>

          </div>

          {/* Heading */}

          <div className="mb-10">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-white" />

              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Private Area
              </span>

            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.06em]">
              Admin Login
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-white/40">
              Sign in to manage your SnipSync portfolio.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
              />

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
              />

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-between rounded-full bg-white px-6 py-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading ? "Signing in..." : "Sign In"}

              {!loading && (
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              )}

            </button>

          </form>

          <p className="mt-10 text-center text-xs text-white/20">
            Authorized access only.
          </p>

        </div>

      </div>

    </main>
  );
}