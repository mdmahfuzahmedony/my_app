"use client";

import React, { useState } from "react";
// ১. toast ইমপোর্ট করা হলো
import { toast } from "react-toastify"; 

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    imageUrl: "",
    meta: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://roam-car-server.vercel.app/roam_cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // ২. এখানে চেক করা হচ্ছে রেসপন্স ঠিক আছে কিনা
      if (res.ok) {
        // ৩. সাকসেস টোস্ট
        toast.success("Product added successfully! 🎉");
        
        // ফর্ম রিসেট
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          imageUrl: "",
          meta: "",
        });
      } else {
        // ৪. ফেইল টোস্ট
        toast.error("Failed to add product ❌");
      }
    } catch (error) {
      console.error(error);
      // ৫. এরর টোস্ট
      toast.error("Something went wrong! ⚠️");
    }
  };

  return (
    <div className="max-w-[1000px] bg-base-200 px-10 mx-auto p-8 shadow-lg rounded-[20px] mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium mb-1">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Enter short description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block font-medium mb-1">Full Description</label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Enter full description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">
            Price / Relevant Field
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price or relevant field"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Optional Image URL */}
        <div>
          <label className="block font-medium mb-1">Optional Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Meta / Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="meta"
            value={formData.meta}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 w-full mt-3 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;