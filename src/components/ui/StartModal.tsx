"use client";

import React, { useState } from "react";

type StartModalProps = {
  onClose: () => void;
  canClose: boolean;
  onEmailSignIn: (email: string, password: string) => Promise<void>;
  onEmailSignUp: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  loading: boolean;
  error?: string | null;
};

export default function StartModal({ onClose, canClose, onEmailSignIn, onEmailSignUp, onGoogleSignIn, loading, error, }: StartModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || !password || loading) return;

    if (isSignUp) {
      await onEmailSignUp(email, password);
      return;
    }

    await onEmailSignIn(email, password);
  }

  return (
    <div className="bg-white/95 p-12 rounded-2xl text-center shadow-lg w-full max-w-md">
      <h1 className="text-black font-medium mb-3 text-3xl">
        Social media<br />relations simulator
      </h1>
      {canClose ? (
        <button
          onClick={onClose}
          className="mt-6 bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-105 transition"
        >
          START
        </button>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="text-left mt-6">
            <label className="block mb-3">
              <span className="text-sm text-black font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="bg-gray-200 p-2 mt-1 w-full rounded-xl"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-sm text-black font-semibold">Password</span>
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="bg-gray-200 p-2 mt-1 w-full rounded-xl"
                placeholder="••••••••"
                required
              />
            </label>

            {error ? (
              <p className="text-red-600 text-sm mb-3">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-105 transition w-full"
            >
              {isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsSignUp(prev => !prev)}
            className="mt-3 cursor-pointer text-sm text-gray-700 hover:underline"
          >
            {isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>

          <div className="mt-5">
            <button
              type="button"
              onClick={onGoogleSignIn}
              disabled={loading}
              className="w-full border cursor-pointer border-black text-black text-sm px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Continue with Google
            </button>
          </div>
        </>
      )}
    </div>
  );
}
