import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import fs from "fs";

// Initialize S3 client
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

// Initialize multer for file uploads
const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error processing file upload" });
      }

      const file = req.file; // Accessing the file from multer
      const fileStream = fs.createReadStream(file.path);

      const uploadParams = {
        Bucket: "vendors-list",
        Key: new Date().getTime() + "-" + file.originalname, // Consider using a unique name for every upload
        Body: fileStream,
      };

      try {
        // Uploading the file to S3
        await s3Client.send(new PutObjectCommand(uploadParams));

        // Manually construct the file URL
        const fileId = encodeURIComponent(uploadParams.Key);

        // Responding with the URL of the uploaded file
        res
          .status(200)
          .json({ message: "File uploaded successfully", fileId: fileId });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: error || "Error uploading file to S3",
        });
      } finally {
        // Cleanup: delete the local file to save space
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting local file", err);
          }
        });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
