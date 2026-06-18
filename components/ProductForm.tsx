'use client';

import { useActionState } from 'react';
// Fixed: Capitalized to match your file system, and removed .ts
import { saveProduct } from '../actions/ProductActions';

// Fixed: Replaced 'any' with a defined interface
interface ProductData {
  _id?: { toString: () => string } | string;
  title?: string;
  price?: number;
}

export default function ProductForm({ product }: { product?: ProductData }) {
  const [state, formAction, isPending] = useActionState(saveProduct, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 p-4 border rounded max-w-md">
      <h3 className="font-bold">{product ? 'Edit Product' : 'Add New Product'}</h3>
      
      <input type="hidden" name="id" value={product?._id?.toString() || ''} />
      
      <input 
        name="title" 
        defaultValue={product?.title || ''} 
        placeholder="Product Title" 
        className="border p-2 text-black" 
        required 
      />
      <input 
        name="price" 
        type="number" 
        defaultValue={product?.price || ''} 
        placeholder="Price" 
        className="border p-2 text-black" 
        required 
      />
      
      <button type="submit" disabled={isPending} className="bg-blue-600 text-white p-2 rounded">
        {isPending ? 'Saving...' : 'Save Product'}
      </button>
      
      {state?.message && <p className="text-green-600">{state.message}</p>}
    </form>
  );
}