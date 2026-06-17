import Link from 'next/link';

// Fetch a single product by ID using ISR
async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 }, // ISR: Revalidates every hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch product details');
  return res.json();
}

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black rounded shadow-md mt-8">
      <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Products
      </Link>
      
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-2xl text-green-600 font-bold mb-4">${product.price}</p>
      
      <p className="text-gray-700 mb-6">{product.description}</p>
      
      <div className="flex gap-4">
        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
          ⭐ Rating: {product.rating}
        </span>
        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
          📦 Stock: {product.stock}
        </span>
      </div>
    </div>
  );
}