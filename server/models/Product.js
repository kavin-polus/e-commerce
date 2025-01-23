import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'registeredUsers' }]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
