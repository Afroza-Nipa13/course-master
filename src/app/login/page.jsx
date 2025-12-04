"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Lottie from "lottie-react";
import login_animation from "../../../public/lottie/DATA SECURITY.json";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // Success - redirect to dashboard
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      setError("Google sign in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
      {/* Animation Side */}
      <div className="hidden lg:flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Lottie animationData={login_animation} loop={true} />
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Course<span className="text-primary">Master</span>
              </h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-6">
                <span>{error}</span>
              </div>
            )}

            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="btn btn-outline w-full mb-6"
            >
              {googleLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    width={20}
                    height={20}
                    alt="Google"
                    className="mr-2"
                  />
                  Continue with Google
                </>
              )}
            </button>

            <div className="divider">OR</div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm link link-primary">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-4"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="link link-primary font-semibold">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}