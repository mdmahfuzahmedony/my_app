"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../Auth/Authprovider"; // পাথ ঠিক আছে
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError(""); // আগের এরর ক্লিয়ার করা

    try {
      await signInUser(email, password);
      // সফল হলে হোম পেজে রিডাইরেক্ট
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Email or Password does not match!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Google Login Failed!");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-cyan-600">Login now!</h1>
          <p className="py-6">
            Welcome back to Roam Car. Please login to manage your products and see details.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body pb-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="form-control mt-6">
              <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white">Login</button>
            </div>
          </form>

          {/* Social Login */}
          <div className="px-8 pb-8">
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGoogle className="text-red-500" /> Login with Google
            </button>
            <p className="text-center mt-4 text-sm">
              New here?{" "}
              <Link href="/register" className="text-cyan-600 font-bold hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;