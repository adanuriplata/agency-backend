import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all access records
router.get("/", async (req, res) => {
  const records = await prisma.accessRecord.findMany({
    include: { collaborator: true },
  });
  res.json(records);
});

// Get a single access record by id
router.get("/:id", async (req, res): Promise<any> => {
  const { id } = req.params;
  const record = await prisma.accessRecord.findUnique({
    where: { id },
    include: { collaborator: true, reassignments: true },
  });
  if (!record)
    return res.status(404).json({ error: "Access record not found" });
  res.json(record);
});

// Create a new access record
router.post("/", async (req, res) => {
  const { service, username, password, url, notes, collaboratorId } = req.body;
  const created = await prisma.accessRecord.create({
    data: { service, username, password, url, notes, collaboratorId },
  });
  res.status(201).json(created);
});

// Update an access record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { service, username, password, url, notes, collaboratorId } = req.body;
  const updated = await prisma.accessRecord.update({
    where: { id },
    data: { service, username, password, url, notes, collaboratorId },
  });
  res.json(updated);
});

// Delete an access record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.accessRecord.delete({ where: { id } });
  res.json({ message: "Access record deleted" });
});

export default router;
