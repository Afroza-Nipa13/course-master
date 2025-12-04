"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import login_animation from "../../../public/lottie/DATA SECURITY.json";
import Lottie from "lottie-react";


export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔹 Handle Submit → Register User → Auto Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Register user in Express backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return alert(data.message || "Registration failed.");
      }

      // 2️⃣ Auto Login using NextAuth Credentials
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (loginRes?.error) {
        alert("Registered but unable to auto-login. Please login manually.");
        router.push("/login");
        return;
      }

      // 3️⃣ Redirect to home
      router.push("/");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
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
                  Create Your{" "}
                  <span className="text-primary">Course Master</span> Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Join us to book appointments with trusted doctors.
                </p>
              </div>

              {/* Register Card */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  {/* Google Signup */}
                  <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    disabled={loading}
                    className="btn btn-outline w-full hover:btn-primary transition-all"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        width={20}
                        height={20}
                        alt="Google icon"
                        className="mr-2"
                      />
                    )}
                    Sign Up with Google
                  </button>

                  <div className="divider">OR</div>

                  {/* Register Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="input input-bordered"
                      />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
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
                        placeholder="Create a password"
                        className="input input-bordered"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-full ${
                          loading ? "loading" : ""
                        }`}
                      >
                        {loading ? "Creating account..." : "Sign Up"}
                      </button>
                    </div>
                  </form>

                  {/* Footer */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="link link-primary font-semibold"
                      >
                        Login
                      </a>
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      By signing up, you agree to our{" "}
                      <a href="/terms" className="link link-primary">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="link link-primary">
                        Privacy Policy
                      </a>
                      .
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
