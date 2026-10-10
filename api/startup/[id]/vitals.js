import { sql, getStartup } from '../../_lib/db.js';
import { requireAuth } from '../../_lib/auth.js';
import { send } from '../../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
  const user = await requireAuth(req, res); if (!user) return;
  const id = req.query.id || req.url.split('/').at(-2);
  const startup = await getStartup(id, user.id);
  if (!startup) return send(res, 404, { error: 'Startup not found' });

  const rows = await sql`SELECT agent_type, score, result, created_at FROM agent_results WHERE startup_id=${startup.id}`;
  const map = Object.fromEntries(rows.map(r => [r.agent_type, r]));
  const validation = map.validation?.score || 0;
  const icp = map.icp?.score || 0;
  const gtm = map.gtm?.score || 0;
  const revenue = map.revenue?.score || 0;
  const overall_score = Math.round(validation * .30 + icp * .20 + gtm * .25 + revenue * .25);
  const next_action = !validation ? 'Run Validation Agent' : !icp ? 'Run ICP Agent' : !gtm ? 'Run GTM Agent' : !revenue ? 'Run Revenue Agent' : 'Run Weekly Briefing';
  send(res, 200, {
    overall_score,
    breakdown: { market: validation, icp, gtm, revenue },
    trend: rows.length >= 4 ? 'up' : 'building',
    next_action,
    results: map
  });
}
