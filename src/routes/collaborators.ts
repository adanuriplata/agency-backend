import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const collaborators = await prisma.collaborator.findMany({
    include: { accesses: true },
  });
  res.json(collaborators);
});

router.get("/:id", async (req, res): Promise<any> => {
  const { id } = req.params;
  const collaborator = await prisma.collaborator.findUnique({
    where: { id },
    include: { accesses: true },
  });

  if (!collaborator) {
    return res.status(404).json({ error: "Collaborator not found" });
  }

  return res.json(collaborator);
});

router.post("/", async (req, res) => {
  const { name, email, role } = req.body;
  const newColab = await prisma.collaborator.create({
    data: { name, email, role },
  });
  res.status(201).json(newColab);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role, isActive } = req.body;
  const updated = await prisma.collaborator.update({
    where: { id },
    data: { name, email, role, isActive },
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await prisma.collaborator.update({
    where: { id },
    data: { isActive: false },
  });
  res.json({ message: "Collaborator deactivated", updated });
});

export default router;
