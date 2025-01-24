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

const deleteProduct = async (req, res) => {
  const { userId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(userId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params; 
  const { name, description, price, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};



export {createProduct, getProduct, getUserProduct, updateProduct, deleteProduct}