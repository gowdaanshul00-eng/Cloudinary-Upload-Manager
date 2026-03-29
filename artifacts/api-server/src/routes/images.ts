import { Router, type IRouter } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@workspace/db";
import { imagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
  const images = await db.select().from(imagesTable).orderBy(imagesTable.id);
  res.json(images);
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
        transformation: [
          {
            quality: "auto",
            fetch_format: "auto",
            effect: "viesus_correct",
          },
        ],
      },
      (error, result) => {
        if (error || !result) return reject(error);
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
});

router.delete("/images/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(imagesTable).where(eq(imagesTable.id, id));
  res.json({ success: true });
});

export default router;
