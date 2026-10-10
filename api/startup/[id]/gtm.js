import { sql, getStartup, saveAgentResult } from '../../_lib/db.js';
import { requireAuth } from '../../_lib/auth.js';
import { geminiJson } from '../../_lib/ai.js';
import { send } from '../../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const user = await requireAuth(req, res); if (!user) return;
  const id = req.query.id || req.url.split('/').at(-2);
  const startup = await getStartup(id, user.id);
  if (!startup) return send(res, 404, { error: 'Startup not found' });
  const icpRows = await sql`SELECT result FROM agent_results WHERE startup_id=${startup.id} AND agent_type='icp'`;
  const icp = icpRows[0]?.result || {};

  const result = await geminiJson(`Create a 12-week go-to-market plan for ${JSON.stringify(startup)} targeting ${JSON.stringify(icp)}.
Stage: ${startup.stage}. Budget: ${startup.budget}.
Return JSON: { "weeks": [{"week":1,"theme":"string","actions":["string"],"metric":"string"}],
"channels": [{"name":"string","priority":"High|Medium|Low","rationale":"string"}] }`);
  const score = Math.min(100, (result.weeks?.length || 0) * 7 + (result.channels?.length || 0) * 5);
  await saveAgentResult(startup.id, 'gtm', result, score);
  send(res, 200, { result });
}
