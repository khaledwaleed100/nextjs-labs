'use client';

import { useState, useTransition, useDeferredValue, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Define the shape of our product to keep TypeScript happy
interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const deferredSearch = useDeferredValue(searchTerm);

  // Update URL params without blocking the UI
  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (deferredSearch) params.set('search', deferredSearch);
      else params.delete('search');
      
      router.push(`?${params.toString()}`);
    });
  }, [deferredSearch, router, searchParams]);

  const handleSort = (type: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', type);
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        {/* Filtration Input */}
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Sorting Buttons */}
        <button onClick={() => handleSort('price')} className="bg-blue-600 px-4 py-2 rounded text-white">
          Sort by Price
        </button>
        <button onClick={() => handleSort('rate')} className="bg-green-600 px-4 py-2 rounded text-white">
          Sort by Rating
        </button>
      </div>

      {isPending && <p className="text-sm text-gray-500">Updating results...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {initialProducts.map((product: Product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border p-4 rounded shadow-sm bg-white text-black hover:shadow-lg transition-shadow cursor-pointer h-full">
              <h2 className="font-bold">{product.title}</h2>
              <p>${product.price} - ⭐ {product.rating}</p>
              <p className="text-sm text-blue-500 mt-2">View Details &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}