import Product from "../models/Product.js";
import Order from "../models/Order.js";

const placeOrder = async (req, res) => {
  console.log("Request body",req.body);
  console.log("userId",req.userId);
  
  
  const { cartItems } = req.body;
  const userId = req.userId;

  try {
    let insufficientStock = [];
    let totalAmount = 0;

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({ message: `Product with id ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        insufficientStock.push({
          product: product.name,
          available: product.stock,
          requested: item.quantity
        });
      } else {

        totalAmount += product.price * item.quantity;
        product.stock -= item.quantity;
        await product.save();
      }
    }

    if (insufficientStock.length > 0) {
      return res.status(400).json({
        message: "Insufficient stock for the following products.",
        details: insufficientStock
      });
    }

    const order = await Order.create({
      userId: userId,
      products: cartItems,
      totalAmount: totalAmount,
      status: 'Pending',
      orderDate: new Date()
    });

    return res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const orderHistoryCheck =  async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ orderDate: -1 });
    return res.status(200).json({ message: 'Order  History', orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orders' ,error});
  }
}


export  {placeOrder, orderHistoryCheck};
