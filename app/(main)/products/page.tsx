import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/products';
import Link from 'next/link';

// Strict TypeScript interface
interface ProductData {
  _id: { toString: () => string };
  title: string;
  price: number;
}

export default async function ProductsPage() {
  await connectDB();
  
  // Fetching directly from DB
  const products = await Product.find().lean() as unknown as ProductData[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Database Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link href={`/products/${p._id.toString()}`} key={p._id.toString()}>
            <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white text-black cursor-pointer">
              <h2 className="font-bold text-xl">{p.title}</h2>
              <p className="text-green-600 font-semibold">${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}