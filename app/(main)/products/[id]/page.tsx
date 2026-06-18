import { connectDB } from '../../../../lib/mongodb';
import Product from '../../../../models/products';
import Link from 'next/link';

export default async function SingleProductPage({ params }: { params: { id: string } }) {
  await connectDB();
  
  let product;
  try {
    product = await Product.findById(params.id).lean();
  } catch (err) {
    // This catches invalid MongoDB ObjectId formats
    throw new Error("Invalid Product ID format.");
  }

  // If the ID is valid but no product exists, throw an error to trigger error.tsx
  if (!product) {
    throw new Error("Product not found in the database!");
  }

  return (
    <div className="max-w-2xl mx-auto p-8 border rounded shadow-md bg-white text-black">
      <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
      <p className="text-2xl text-green-600 font-bold mb-6">${product.price}</p>
      <p className="text-gray-700">{product.description || "No description available."}</p>
    </div>
  );
}