// pages/api/users.js
import User from "../../../models/User";
import dbConnect from "../../../../lib/mongodb";

export default async function handler(req, res) {
  await dbConnect();

  // Example: POST method to add a new user
  if (req.method === "POST") {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
