const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  } = require("../models/productModel");
  
  const createProduct = async (req, res) => {
    try {
      const product = await addProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error adding product" });
    }
  };
  
  const getProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
  };
  
  const getProduct = async (req, res) => {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  };
  
  const editProduct = async (req, res) => {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  };
  
  const removeProduct = async (req, res) => {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  };
  
  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    editProduct,
    removeProduct,
  };
  