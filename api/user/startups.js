import { sql } from '../_lib/db.js';
import { requireAuth } from '../_lib/auth.js';
import { send } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
  const user = await requireAuth(req, res);
  if (!user) return;
  const rows = await sql`SELECT * FROM startups WHERE user_id = ${user.id} ORDER BY created_at DESC`;
  send(res, 200, { startups: rows });
}
