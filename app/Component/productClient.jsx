"use client";

import React from "react";

const ProductClient = ({ product }) => {
  // আপনার ডাটা ফরমেট অনুযায়ী ভেরিয়েবলগুলো আলাদা করে নিলাম
  const { title, image, price, description, short_description, brand_logo, meta } = product;

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-base-100 p-5">
      <div className="max-w-5xl w-full mx-auto">
        
        {/* মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* ----- বাম পাশ: মেইন ইমেজ ----- */}
          <div className="w-full">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto rounded-2xl shadow-lg border border-base-200 object-cover"
            />
          </div>

          {/* ----- ডান পাশ: ডিটেইলস ----- */}
          <div className="flex flex-col gap-5 justify-center h-full">
            
            {/* ব্র্যান্ড লোগো এবং মেটা ট্যাগ */}
            <div className="flex items-center gap-3">
              {brand_logo && (
                <img 
                  src={brand_logo} 
                  alt="Brand" 
                  className="w-10 h-10 object-contain"
                />
              )}
              <span className="badge badge-neutral badge-lg uppercase tracking-wider text-xs">
                {meta}
              </span>
            </div>

            {/* টাইটেল এবং শর্ট ডেসক্রিপশন */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-2">
                {title}
              </h1>
              <p className="text-lg text-base-content/60 italic">
                {short_description}
              </p>
            </div>

            {/* প্রাইস */}
            <div className="text-3xl font-bold text-primary">
              {price}
            </div>

            {/* মেইন ডেসক্রিপশন */}
            <div className="divider"></div>
            <p className="text-base text-base-content/80 leading-7">
              {description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductClient;