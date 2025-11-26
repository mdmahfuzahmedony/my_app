"use client";

import React from "react";
import Link from "next/link";
// আপনার AuthProvider এর পাথ ঠিক আছে কিনা দেখে নিবেন
import { useAuth } from "../Auth/Authprovider"; 
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"; // ডিফল্ট আইকনের জন্য

const Navbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  // লগআউট ফাংশন
  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login"); // লগআউট হলে লগইন পেজে পাঠাবে
    } catch (error) {
      console.error(error);
    }
  };

  // মেনু লিংকগুলো এক জায়গায় রাখলাম (Code Reusability এর জন্য)
  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/all-products">All Products</Link></li>
      
      {/* 🔥 কন্ডিশন: ইউজার থাকলেই শুধু এই লিংকগুলো দেখাবে 🔥 */}
      {user && (
        <>
          <li><Link href="/add-product">Add Product</Link></li>
          <li><Link href="/manage-product">Manage Product</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      
      {/* --- Navbar Start (Logo & Mobile Menu) --- */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold">Roam Car</Link>
      </div>

      {/* --- Navbar Center (Desktop Menu) --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      {/* --- Navbar End (User Profile or Login Button) --- */}
      <div className="navbar-end">
        {user ? (
          // ✅ ইউজার লগইন থাকলে প্রোফাইল এবং ড্রপডাউন দেখাবে
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-cyan-500 ring-offset-2">
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img alt={user.displayName} src={user.photoURL} />
                ) : (
                  // ছবি না থাকলে ডিফল্ট আইকন
                  <FaUserCircle className="w-full h-full text-gray-400 bg-white" />
                )}
              </div>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-4 shadow-lg border border-gray-200">
              
              {/* ইউজারের নাম ও ইমেইল */}
              <li className="mb-2 border-b pb-2 text-center">
                <p className="font-bold text-lg">{user.displayName || "User Name"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </li>

              {/* প্রোফাইল বাটন (অপশনাল) */}
              <li><a className="justify-between">Profile <span className="badge">New</span></a></li>
              
              {/* লগআউট বাটন */}
              <li className="mt-2">
                <button onClick={handleLogout} className="bg-red-50 text-red-600 font-bold hover:bg-red-100">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // ❌ ইউজার লগইন না থাকলে Login বাটন দেখাবে
          <Link href="/login">
            <button className="btn bg-cyan-500 text-white hover:bg-cyan-600">Login</button>
          </Link>
        )}
      </div>

    </div>
  );
};

export default Navbar;