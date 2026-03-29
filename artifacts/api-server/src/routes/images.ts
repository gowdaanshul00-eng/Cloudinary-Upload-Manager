import { Router, type IRouter } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@workspace/db";
import { imagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_KEY,
  api_key: process.env.CLOUDINARY_API_SECRET,
  api_secret: process.env.CLOUDINARY_CLOUD_NAME,
});

const router: IRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

router.get("/images", async (_req, res) => {
  try {
    const images = await db.select().from(imagesTable).orderBy(imagesTable.id);
    res.json(images);
  } catch (err) {
    console.error("Failed to list images:", err);
    res.json([]);
  }
});

router.post("/images/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  const label = req.body.label?.trim();
  if (!label) {
    res.status(400).json({ error: "No label provided" });
    return;
  }

  try {
    const stream = bufferToStream(req.file.buffer);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream(
        {
          folder: "cooper-school",
          public_id: label,
          overwrite: true,
          quality_analysis: true,
          eager: [
            {
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", JSON.stringify(error));
            return reject(error);
          }
          if (!result) return reject(new Error("No result from Cloudinary"));
          resolve(result);
        }
      );
      stream.pipe(cloudStream);
    });

    const [inserted] = await db
      .insert(imagesTable)
      .values({
        label,
        cloudinaryUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        originalFilename: req.file.originalname,
      })
      .onConflictDoUpdate({
        target: imagesTable.label,
        set: {
          cloudinaryUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          originalFilename: req.file.originalname,
        },
      })
      .returning();

    res.json(inserted);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error("Upload failed:", msg);
    res.status(500).json({ error: msg });
  }
});

router.delete("/images/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(imagesTable).where(eq(imagesTable.id, id));
    res.json({ success: true });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
