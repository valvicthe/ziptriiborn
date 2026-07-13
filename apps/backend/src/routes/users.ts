// apps/backend/src/routes/users.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../prisma.js';

const router = Router();

// Fetch true profile data from PostgreSQL
router.get('/v1/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, displayName: true, description: true, robux: true }
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch active relations from Friendship join table
router.get('/v1/users/:id/friends', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId, isAccepted: true },
          { receiverId: userId, isAccepted: true }
        ]
      },
      include: {
        sender: true,
        receiver: true
      }
    });

    // Map relationships to extract the friend's actual profile details
    const friendsList = friendships.map(f => f.senderId === userId ? f.receiver : f.sender);
    
    return res.json({ data: friendsList });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch friends" });
  }
});

export default router;
