"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
// আপনার ফায়ারবেস ফাইলের লোকেশন অনুযায়ী ইমপোর্ট করুন
import { auth } from "../Firebase/Firebase"; 

export const AuthContext = createContext(null);

// হুক বানিয়ে দিলাম যাতে অন্য পেজে সহজে ব্যবহার করা যায়
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ১. রেজিস্ট্রেশন (Create User)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ২. লগইন (Login User)
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ৩. গুগল লগইন (Google Login)
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ৪. প্রোফাইল আপডেট (নাম ও ছবি)
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // ৫. লগআউট (Logout)
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ইউজার আছে কি নাই তা চেক করা (Observer)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;