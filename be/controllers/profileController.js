const pool = require("../config/db");

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        console.log("enter");
        const userId = req.user.userId; // Get user ID from authenticated user
        const result = await pool.query("SELECT name, email, phone_number, nationality, address FROM users WHERE id = $1", [userId]);
        console.log(result);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/*
exports.getUserProfile = async (req, res) => {
    try {
        console.log("🔍 Entering getUserProfile...");
        console.log("✅ Decoded User Object:", req.user);

        const userId = req.user.userId;  // Extracting ID from token
        console.log("🆔 Extracted User ID:", userId);

        // Run SQL Query
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1", 
            [userId]
        );

        console.log("📌 Query Result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]); // Send user data
    } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
*/

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, email, phone_number, nationality, address } = req.body;

        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, phone_number = $3, nationality = $4, address = $5 WHERE id = $6 RETURNING *",
            [name, email, phone_number, nationality, address, userId]
        );

        res.json({ message: "Profile updated successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
