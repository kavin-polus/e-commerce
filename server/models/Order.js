import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  date: Date
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
