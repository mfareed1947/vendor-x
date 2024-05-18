import { cloudinary } from "../../utils/cloudinary";

export default async function handler(req, res) {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    res.json({ msg: "Upload successful", data: uploadResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
}
