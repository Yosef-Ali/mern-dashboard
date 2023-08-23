import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        // Find stats for current product
        const stat = await ProductStat.find({
          productId: product._id,
        });
        // Return product with stat added
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // Get all users with 'user' role
    const customers = await User.find({ role: "user" }).select("-password"); // Omit password from response
    // Send customers data in response
    res.status(200).json(customers);
    // Catch any errors
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
