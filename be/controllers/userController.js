const {
    getUserAddressById,
    updateUserAddressById,
  } = require("../models/userModel");
  
  // GET /api/users/address
  const getUserAddress = async (req, res) => {
    try {
      const userId = req.user.userId;
      const address = await getUserAddressById(userId);
  
      // If user not found (just being extra safe)
      if (address === undefined) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If address is null or empty in DB
      if (!address) {
        return res.status(200).json({ address: [] });
      }
  
      // Valid address found
      res.status(200).json({ address });
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
  
  module.exports = {
    getUserAddress,
    updateUserAddress,
  };
  