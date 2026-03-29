import { useState } from "react";
import { Link } from "wouter";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. This is a demo login — authentication is not active.");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 justify-center">
            <div className="w-12 h-12 bg-[#1e4d2b] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">JC</span>
            </div>
            <div className="text-left">
              <div className="text-[#1e4d2b] font-bold text-lg font-serif">The John Cooper School</div>
              <div className="text-gray-400 text-xs tracking-widest uppercase">The Woodlands, Texas</div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-2xl font-bold font-serif text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to your Cooper account</p>

          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@johncooper.org"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] focus:ring-1 focus:ring-[#1e4d2b] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-[#1e4d2b] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1e4d2b] focus:ring-1 focus:ring-[#1e4d2b] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-[#1e4d2b]" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1e4d2b] text-white font-semibold rounded-lg hover:bg-[#163820] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
            <p className="text-xs text-center text-gray-500">
              Student & Faculty Portal | Parent Community | Alumni Network
            </p>
            <p className="text-xs text-center text-gray-400">
              Need help? Contact{" "}
              <a href="mailto:support@johncooper.org" className="text-[#1e4d2b] hover:underline">
                support@johncooper.org
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#1e4d2b] transition-colors">
            ← Return to johncooper.org
          </Link>
        </div>
      </div>
    </div>
  );
}
