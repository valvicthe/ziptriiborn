import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateSession } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Dynamic User Endpoint pulling straight from the PostgreSQL database
router.get('/v1/users/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, displayName: true, description: true, created: true, isBanned: true }
    });

    if (!user) {
      return res.status(404).json({ errors: [{ code: 1, message: "User not found within Ziptrii registries." }] });
    }

    return res.json({
      id: user.id,
      name: user.username,
      displayName: user.displayName,
      description: user.description,
      created: user.created.toISOString(),
      isBanned: user.isBanned,
      externalAppDisplayName: null
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ code: 0, message: "Internal Server Error" }] });
  }
});

export default router;
