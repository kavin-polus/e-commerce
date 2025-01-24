import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";


const addItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (product.stock <= 0) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
  
      let cartItem = await CartItem.findOne({ userId, productId });
  
      if (cartItem) {
        if ( product.stock > 0) {
          const checkquantity = cartItem.quantity += quantity;
          console.log("QuantityIncrese",checkquantity);
          console.log("Stock",product.stock);  
          await cartItem.save();
        } else {
          return res.status(400).json({ message: 'Cannot exceed stock quantity' });
        }
      } else {
        cartItem = new CartItem({ userId, productId, quantity });
        await cartItem.save();
      }
      product.stock -= quantity;
      await product.save();
      console.log("Cannot increase quantity beyond stock. Current stock is", product.stock);
      res.status(200).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
      const cartItems = await CartItem.find({ userId })
      const cartItemsWithProducts = await Promise.all(cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        const totalPrice = product ? product.price * item.quantity : 0;
        return { ...item.toObject(), product: product || { name: 'Product not available', price: 0, description: 'Product no longer available' },totalPrice };
      }));
      res.status(200).json({ cartItems:cartItemsWithProducts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart' });
    }
  };
  

  const removeItem = async (req, res) => {
    const { userId, productId } = req.body;
    try {
      const cartItem = await CartItem.findOne({ userId, productId });
  
      if (cartItem) {
        const product = await Product.findById(productId);
        if (product) {
          product.stock += cartItem.quantity;
          await product.save();
        }
  
        await CartItem.deleteOne({ userId, productId });
        res.status(200).json({ message: 'Item removed from cart' });
      } else {
        res.status(404).json({ message: 'Cart item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error removing item from cart' });
    }
  };

  const updateQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    try {
      const cartItem = await CartItem.findOne({ userId, productId });
  
      if (cartItem) {
        const product = await Product.findById(productId);
        if (product) {
          if (quantity > 1) {
            cartItem.quantity -= 1;
            product.stock += 1;
            await cartItem.save();
            await product.save();
          } else {
            await CartItem.deleteOne({ userId, productId });
            product.stock += 1;
            await product.save();
          }
        }
        res.status(200).json({ message: 'Item updated successfully', cartItem });
      } else {
        res.status(404).json({ message: 'Cart item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating item from cart' });
    }
  };
  
  

  export {addItem,getCart,removeItem,updateQuantity}