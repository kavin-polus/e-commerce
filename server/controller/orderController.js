import Product from "../models/Product.js";
import Order from "../models/Order.js";


const placeOrder = async (req, res) => {
    const { cartItems } = req.body;

    try {
        const order = await Order.create({
            products: cartItems,
            totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            status: 'Pending',
            date: new Date()
        });

        for (const item of cartItems) {
            const product = await Product.findById(item.productId);

            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
            }

            product.stock -= item.quantity;
            await product.save();
        }

        return res.status(201).json({ message: 'Order placed successfully', order });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
} 

export default placeOrder;