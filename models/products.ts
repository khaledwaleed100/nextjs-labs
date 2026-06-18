import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);