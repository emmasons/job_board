"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState<{ message: string; type: "error" | "success" } | null>(null);

  useEffect(() => {
    showFlash("You must login to generate a CV.", "error");
  }, []);

  const showFlash = (message: string, type: "error" | "success") => {
    setFlash({ message, type });

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setFlash(null);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin
      ? "/api/auth/jobseeker-login"
      : "/api/auth/jobseeker-register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        const loginResult = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });

        if (loginResult?.ok) {
          showFlash("Login successful. Proceed to generate your CV.", "success");
          setTimeout(() => onClose(), 2000);
        } else {
          showFlash(loginResult?.error || "Login failed", "error");
        }
      } else {
        showFlash(result.error || "Something went wrong", "error");
      }
    } catch (err) {
      showFlash("An unexpected error occurred.", "error");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Flash message (top-right corner) */}
      {flash && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`max-w-sm w-full px-4 py-6 rounded shadow-lg text-white flex items-center justify-between space-x-4 animate-fade-in-out ${
              flash.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            <span className="text-sm">{flash.message}</span>
            <button onClick={() => setFlash(null)} className="text-xl font-bold leading-none">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="fixed inset-0 z-30 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}>
        <div className="bg-white rounded-2xl w-full max-w-xl p-6 relative" style={{ boxShadow: '0 5px 40px rgba(0, 0, 0, 0.2)' }}>
          <h2 className="text-xl mb-4 font-semibold text-center mt-2">
            {isLogin ? "Login" : "Register"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-primary/70 text-white py-2 rounded"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Register & Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 4s ease forwards;
        }
      `}</style>
    </>
  );
}
