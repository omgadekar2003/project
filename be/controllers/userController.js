const {
    getUserAddressById,
    updateUserAddressById,
    getAllUsers
  } = require("../models/userModel");

    
  // GET /api/users/address
  const getUserAddress = async (req, res) => {
    try {
      const userId = req.user.userId;
      const userData = await getUserAddressById(userId);
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { name, phone_number, address } = userData;
  
      res.status(200).json({
        name,
        phone_number,
        address: address || [],
      });
    } catch (error) {
      console.error("Get address error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  
  
  // PUT /api/users/update-address
  const updateUserAddress = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { address } = req.body;
  
      if (!address || typeof address !== "string") {
        return res.status(400).json({ message: "Address must be a plain string" });
      }
  
      const updatedAddress = await updateUserAddressById(userId, address);
  
      res.status(200).json({ message: "Address updated", address: updatedAddress });
    } catch (error) {
      console.error("Update address error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
// get all users for admin to see on dashboard
const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers(); // call directly
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
  module.exports = {
    getUserAddress,
    updateUserAddress,
    getAllUsersController
  };
  