import dbConnect from "../../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      console.log("Request Body:", req.body);

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists" });
      }

      const user = await User.create(req.body);
      return res.status(201).json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
