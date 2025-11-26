"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../Auth/Authprovider"; // পাথ ঠিক আছে
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      // ১. ইউজার তৈরি করা
      await createUser(email, password);
      
      // ২. প্রোফাইল আপডেট করা (নাম ও ছবি)
      await updateUserProfile(name, photo);

      // ৩. সফল হলে হোম পেজে রিডাইরেক্ট
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
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
    <div className="hero min-h-screen bg-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-cyan-600">Register now!</h1>
          <p className="py-6">
            Join Roam Car community today. Create an account to get started.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body pb-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
              />
            </div>
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
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="form-control mt-6">
              <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white">Register</button>
            </div>
          </form>

          {/* Social Login */}
          <div className="px-8 pb-8">
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGoogle className="text-red-500" /> Register with Google
            </button>
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-600 font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;