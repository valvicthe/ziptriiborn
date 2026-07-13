// apps/backend/src/routes/avatar.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../prisma.js';

const router = Router();

// Fetch equipped layout and entire wardrobe item pool
router.get('/v1/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const inventory = await prisma.inventory.findMany({
      where: { userId },
      include: { asset: true }
    });

    const equipped = inventory.filter(item => item.isEquipped).map(item => item.asset);

    return res.json({ inventory, equipped });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch avatar state" });
  }
});

// Mutate items equipped flags inside the database rows
router.post('/v1/equip', async (req: Request, res: Response) => {
  try {
    const { userId, assetId } = req.body;

    const targetItem = await prisma.inventory.findUnique({
      where: { userId_assetId: { userId, assetId } },
      include: { asset: true }
    });

    if (!targetItem) return res.status(404).json({ error: "Asset not in inventory" });

    // Roblox rule: Unequip existing items of the same type (e.g. can't wear two shirts)
    if (!targetItem.isEquipped) {
      const activeItems = await prisma.inventory.findMany({
        where: { userId, isEquipped: true },
        include: { asset: true }
      });
      
      const conflictingItem = activeItems.find(i => i.asset.assetType === targetItem.asset.assetType);
      if (conflictingItem) {
        await prisma.inventory.update({
          where: { id: conflictingItem.id },
          data: { isEquipped: false }
        });
      }
    }

    // Toggle selected item status
    const updated = await prisma.inventory.update({
      where: { id: targetItem.id },
      data: { isEquipped: !targetItem.isEquipped }
    });

    return res.json({ success: true, isEquipped: updated.isEquipped });
  } catch (err) {
    return res.status(500).json({ error: "Inventory mutation failed" });
  }
});

export default router;
