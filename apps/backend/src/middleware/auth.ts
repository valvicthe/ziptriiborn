import { Request, Response, NextFunction } from 'express';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Extend the Express Request type globally to include the authenticated user context
declare global {
  namespace Express {
    interface Request {
      user?: User;
      sessionToken?: string;
    }
  }
}

export async function validateSession(req: Request, res: Response, next: NextFunction) {
  // Extract token from standard Roblox auth cookie or authorization header
  const authCookie = req.cookies?.['.ZIPTRIISECURITY'] || req.headers['authorization']?.replace('Bearer ', '');

  if (!authCookie) {
    return next(); // User is a guest, proceed forward cleanly
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token: authCookie },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      // Session has expired or is invalid
      if (session) await prisma.session.delete({ where: { id: session.id } });
      return next();
    }

    // Attach active database record directly to the request engine
    req.user = session.user;
    req.sessionToken = session.token;
    next();
  } catch (error) {
    console.error("[Auth Error] Critical session validation failure:", error);
    next();
  }
}

// Guard middleware to protect specific admin panels or internal API routes
export function requirePermission(minLevel: 'USER' | 'MODERATOR' | 'ADMIN' | 'OWNER') {
  const levels = { USER: 0, MODERATOR: 1, ADMIN: 2, OWNER: 3 };
  
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || levels[req.user.permission] < levels[minLevel]) {
      return res.status(403).json({ errors: [{ code: 403, message: "Unauthorized access attempt to Ziptrii Core." }] });
    }
    next();
  };
};
