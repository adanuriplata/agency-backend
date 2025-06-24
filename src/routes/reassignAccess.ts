import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { accessId, newCollaboratorId } = req.body;

  const access = await prisma.accessRecord.findUnique({
    where: { id: accessId },
  });
  if (!access)
    return res.status(404).json({ error: "Access record not found" });

  const newOwner = await prisma.collaborator.findUnique({
    where: { id: newCollaboratorId },
  });
  if (!newOwner)
    return res.status(404).json({ error: "Collaborator not found" });

  const updated = await prisma.accessRecord.update({
    where: { id: accessId },
    data: { collaboratorId: newCollaboratorId },
  });

  await prisma.reassignmentLog.create({
    data: {
      accessId,
      previousOwnerId: access.collaboratorId,
      newOwnerId: newCollaboratorId,
    },
  });

  res.json({ message: "Access reassigned successfully", updated });
});

export default router;
