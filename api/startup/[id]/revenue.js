import { getStartup, saveAgentResult } from '../../_lib/db.js';
import { requireAuth } from '../../_lib/auth.js';
import { geminiJson } from '../../_lib/ai.js';
import { send } from '../../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const user = await requireAuth(req, res); if (!user) return;
  const id = req.query.id || req.url.split('/').at(-2);
  const startup = await getStartup(id, user.id);
  if (!startup) return send(res, 404, { error: 'Startup not found' });

  const result = await geminiJson(`Suggest 3 pricing models for this startup: ${JSON.stringify(startup)}.
Return JSON: { "models": [{
"name":"string", "price_points":["string"], "rationale":"string",
"ltv_estimate":"string", "cac_estimate":"string", "payback_months": 0,
"pros":["string"], "cons":["string"]
}]}`);
  await saveAgentResult(startup.id, 'revenue', result, 85);
  send(res, 200, { result });
}
