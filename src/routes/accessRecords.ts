import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { encrypt, decrypt } from "../utils/crypto";

const router = Router();
const prisma = new PrismaClient();

// Get all access records
router.get("/", async (req, res) => {
  const records = await prisma.accessRecord.findMany({
    include: { collaborator: true },
  });
  const decrypted = records.map(({ encryptedPassword, ...rest }) => ({
    ...rest,
    password: decrypt(encryptedPassword),
  }));
  res.json(decrypted);
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
  const { encryptedPassword, ...rest } = record;
  res.json({ ...rest, password: decrypt(encryptedPassword) });
});

// Create a new access record
router.post("/", async (req, res) => {
  const { service, username, password, url, notes, collaboratorId } = req.body;
  const created = await prisma.accessRecord.create({
    data: {
      service,
      username,
      encryptedPassword: encrypt(password),
      url,
      notes,
      collaboratorId,
    },
  });
  const { encryptedPassword, ...rest } = created;
  res.status(201).json({ ...rest, password });
});

// Update an access record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { service, username, password, url, notes, collaboratorId } = req.body;
  const updated = await prisma.accessRecord.update({
    where: { id },
    data: {
      service,
      username,
      encryptedPassword: encrypt(password),
      url,
      notes,
      collaboratorId,
    },
  });
  const { encryptedPassword, ...rest } = updated;
  res.json({ ...rest, password });
});

// Delete an access record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.accessRecord.delete({ where: { id } });
  res.json({ message: "Access record deleted" });
});

export default router;
