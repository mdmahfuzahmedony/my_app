import React from 'react';
import ProductClient from '../../../Component/productClient'; 

// ডাটা ফেচিং ফাংশন
async function getProduct(id) {
  const res = await fetch(`https://roam-car-server.vercel.app/roam_cars/${id}`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const ProductDetailsPage = async ({ params }) => {
  // 👇 পরিবর্তন: এখানে 'await' যোগ করা হয়েছে
  const { id } = await params;

  // ২. ডাটা ফেচ করা
  const product = await getProduct(id);

  // ৩. ডিজাইনের মধ্যে ডাটা পাঠানো
  return (
    <div>
      <ProductClient product={product} />
    </div>
  );
};

export default ProductDetailsPage;