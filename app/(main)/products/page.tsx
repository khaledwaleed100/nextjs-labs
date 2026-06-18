import { getServerSession } from "next-auth/next";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/product";
import ProductForm from "../../../components/ProductForm";

interface ProductData {
  _id: { toString: () => string };
  title: string;
  price: number;
}

export default async function ProductsPage() {
  const session = await getServerSession();
  await connectDB();

  // Task 2 Logic: 3 products if no session, all products if session
  const products = session 
    ? await Product.find().lean() 
    : await Product.find().limit(3).lean();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Products {session ? '(Admin View)' : '(Guest View)'}
      </h1>

      {/* Hide Post/Put component if no session */}
      {session && (
        <div className="mb-8">
          <ProductForm /> 
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {products.map((p: ProductData) => (
          <div key={p._id.toString()} className="border p-4 rounded text-black bg-white">
            <h2 className="font-bold">{p.title}</h2>
            <p>${p.price}</p>
            
            {/* Hide Update UI if no session */}
            {session && (
              <div className="mt-4 border-t pt-2">
                <ProductForm product={p} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}