import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { accessId, accessIds, newCollaboratorId } = req.body;

  const ids: string[] = accessIds || (accessId ? [accessId] : []);
  if (ids.length === 0)
    return res.status(400).json({ error: "No access IDs provided" });

  const newOwner = await prisma.collaborator.findUnique({
    where: { id: newCollaboratorId },
  });
  if (!newOwner)
    return res.status(404).json({ error: "Collaborator not found" });

  const results = [] as any[];

  for (const id of ids) {
    const access = await prisma.accessRecord.findUnique({ where: { id } });
    if (!access) {
      results.push({ id, error: "Access record not found" });
      continue;
    }

    const updated = await prisma.accessRecord.update({
      where: { id },
      data: { collaboratorId: newCollaboratorId },
    });

    await prisma.reassignmentLog.create({
      data: {
        accessId: id,
        previousOwnerId: access.collaboratorId,
        newOwnerId: newCollaboratorId,
      },
    });

    results.push(updated);
  }

  res.json({ message: "Access reassigned successfully", updated: results });
});

export default router;
