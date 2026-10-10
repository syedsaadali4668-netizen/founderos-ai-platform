import { createClerkClient } from '@clerk/backend';
import { upsertUser } from './db.js';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function requireAuth(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) throw new Error('Missing auth token');

    const verified = await clerk.verifyToken(token);
    const userId = verified.sub;
    const user = await clerk.users.getUser(userId);

    const payload = {
      id: userId,
      email: user.emailAddresses?.[0]?.emailAddress || '',
      name: [user.firstName, user.lastName].filter(Boolean).join(' ')
    };
    await upsertUser(payload);
    return payload;
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized', detail: err.message });
    return null;
  }
}
