import { Router } from "express";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

const router = Router();

router.post("/forms/inquire", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gradeLevel, studentName, message } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "firstName, lastName, and email are required" });
    }
    const [record] = await db
      .insert(inquiriesTable)
      .values({ firstName, lastName, email, phone, gradeLevel, studentName, message, type: "inquiry" })
      .returning();
    return res.json({ success: true, id: record.id });
  } catch (err) {
    console.error("Inquiry submission error:", err);
    return res.status(500).json({ error: "Failed to save inquiry" });
  }
});

router.post("/forms/visit", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gradeLevel, preferredDate, visitType } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "firstName, lastName, and email are required" });
    }
    const message = `Visit Type: ${visitType ?? "N/A"}\nPreferred Date: ${preferredDate ?? "N/A"}`;
    const [record] = await db
      .insert(inquiriesTable)
      .values({ firstName, lastName, email, phone, gradeLevel, message, type: "visit" })
      .returning();
    return res.json({ success: true, id: record.id });
  } catch (err) {
    console.error("Visit submission error:", err);
    return res.status(500).json({ error: "Failed to save visit request" });
  }
});

router.get("/forms/inquiries", async (_req, res) => {
  try {
    const records = await db
      .select()
      .from(inquiriesTable)
      .orderBy(desc(inquiriesTable.createdAt))
      .limit(100);
    return res.json(records);
  } catch (err) {
    console.error("Inquiries list error:", err);
    return res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

export default router;
