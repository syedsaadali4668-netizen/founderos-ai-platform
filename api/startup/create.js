import { sql } from '../_lib/db.js';
import { requireAuth } from '../_lib/auth.js';
import { readBody, send } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const user = await requireAuth(req, res);
  if (!user) return;

  const body = await readBody(req);
  const { name, idea, target_market, category, stage, budget } = body;
  if (!name || !idea) return send(res, 400, { error: 'name and idea are required' });

  const rows = await sql`
    INSERT INTO startups (user_id, name, idea, target_market, category, stage, budget)
    VALUES (${user.id}, ${name}, ${idea}, ${target_market || ''}, ${category || ''}, ${stage || 'idea'}, ${budget || 'low'})
    RETURNING *
  `;
  send(res, 200, { startup: rows[0] });
}
