"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../Auth/Authprovider"; // পাথ আপনার ফোল্ডার অনুযায়ী চেক করবেন
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa6"; // হ্যামবার্গার মেনুর জন্য আইকন (অপশনাল)

const Navbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/all-products">All Products</Link></li>
      
      {user && (
        <>
          <li><Link href="/add-product">Add Product</Link></li>
          <li><Link href="/manage-product">Manage Product</Link></li>
        </>
      )}
    </>
  );

  return (
    // ১. আউটার ডিভ: এখানে ব্যাকগ্রাউন্ড, শ্যাডো এবং স্টিকি পজিশন থাকবে (পুরো উইডথ জুড়ে)
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      
      {/* ২. ইনার ডিভ: এখানে আপনার কাঙ্খিত max-width এবং navbar ক্লাস থাকবে */}
      <div className="navbar w-full max-w-[1450px] mx-auto">
        
        {/* --- Navbar Start --- */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              {/* ডিফল্ট আইকন না থাকলে এখানে আইকন দিন */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {navLinks}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl font-bold">Roam Car</Link>
        </div>

        {/* --- Navbar Center --- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
          </ul>
        </div>

        {/* --- Navbar End --- */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-cyan-500 ring-offset-2">
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img alt={user.displayName} src={user.photoURL} />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400 bg-white" />
                  )}
                </div>
              </div>
              <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-4 shadow-lg border border-gray-200">
                <li className="mb-2 border-b pb-2 text-center">
                  <p className="font-bold text-lg">{user.displayName || "User Name"}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </li>
                <li><a className="justify-between">Profile <span className="badge">New</span></a></li>
                <li className="mt-2">
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 font-bold hover:bg-red-100">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login">
              <button className="btn bg-cyan-500 text-white hover:bg-cyan-600">Login</button>
            </Link>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;