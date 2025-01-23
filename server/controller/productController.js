import Product from "../models/Product.js";

const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
  
    const newProduct = new Product({
      name,
      description,
      price,
      stock,

    });
  
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error saving product', error });
      }
  };

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({message: "Lists of Posts", products:products});
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch products' });
  }
}

const getUserProduct = async (req,res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products:products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
}

const buyProduct = async (req,res) => {

}

export {createProduct, getProduct, getUserProduct}