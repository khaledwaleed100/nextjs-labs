'use server';

// Using relative paths to go up to the root, then into lib/models
import { connectDB } from '../lib/mongodb';
import Product from '../models/product';
import { revalidatePath } from 'next/cache';

export async function saveProduct(prevState: unknown, formData: FormData) {
  await connectDB();
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const price = Number(formData.get('price'));

  if (id) {
    await Product.findByIdAndUpdate(id, { title, price }); 
  } else {
    await Product.create({ title, price }); 
  }
  
  revalidatePath('/products');
  return { message: 'Product saved successfully!' };
}

export async function deleteProduct(id: string) {
  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath('/products');
}