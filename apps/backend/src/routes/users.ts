import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient() as any;

router.get('/v1/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  
  if (!user) return res.status(404).json({ error: "User profile not found" });
  
  // Provide safe structural fallback values if they aren't explicitly inside your Prisma Schema fields yet
  res.json({
    id: user.id,
    username: user.username,
    displayName: user.displayName || user.username,
    description: user.description || "",
    robux: user.robux ?? 0 
  });
});

router.get('/v1/users/:id/friends', async (req, res) => {
  const userId = parseInt(req.params.id);
  
  const records = await prisma.friendship.findMany({
    where: { userId },
    include: { friend: true }
  });

  // Explicit type injection avoids compile blocks on map sequences
  res.json({
    data: records.map((f: any) => f.friend)
  });
});

export default router;
