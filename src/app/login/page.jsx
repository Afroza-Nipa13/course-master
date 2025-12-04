"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import login_animation from "../../../public/lottie/DATA SECURITY.json";
import Lottie from "lottie-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      alert("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    

     <div
      className="max-w-7xl mx-auto pt-10
     grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-70 min-h-screen"
    >
      <div className="hidden lg:flex">
        <Lottie animationData={login_animation} loop={true} />
      </div>

      <div className="flex items-center justify-center">
        <div className="flex-1 px-4 lg:px-0">
          {/*  */}
          <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">
            Welcome to <span className="text-primary">Course Master</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Log in to book your doctor appointments
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Google Login */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn btn-outline w-full hover:btn-primary transition-all"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  width={20}
                  height={20}
                  alt="Google icon"
                  className="mr-2"
                />
              )}
              Continue with Google
            </button>

            <div className="divider">OR</div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary w-full ${
                    loading ? "loading" : ""
                  }`}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="/register" className="link link-primary font-semibold">
                  Sign up
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                By continuing, you agree to our{" "}
                <a href="/terms" className="link link-primary">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="link link-primary">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}