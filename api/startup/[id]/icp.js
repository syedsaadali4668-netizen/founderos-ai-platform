import { getStartup, saveAgentResult } from '../../_lib/db.js';
import { requireAuth } from '../../_lib/auth.js';
import { tavilySearch, geminiJson } from '../../_lib/ai.js';
import { send } from '../../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const user = await requireAuth(req, res); if (!user) return;
  const id = req.query.id || req.url.split('/').at(-2);
  const startup = await getStartup(id, user.id);
  if (!startup) return send(res, 404, { error: 'Startup not found' });

  const research = await tavilySearch([
    `${startup.target_market || startup.idea} pain points`,
    `${startup.target_market || startup.idea} demographics`
  ]);

  const result = await geminiJson(`Build 3 detailed Ideal Customer Profiles for this startup: ${JSON.stringify(startup)}.
Use research: ${JSON.stringify(research)}.
Return JSON: { "profiles": [{
 "name":"string", "age_range":"string", "job_title":"string",
 "pain_points":["string"], "goals":["string"], "where_they_hang_out":["string"],
 "willingness_to_pay":"string", "sample_quote":"string"
}]}`);
  const score = Math.min(100, (result.profiles?.length || 0) * 30 + 10);
  await saveAgentResult(startup.id, 'icp', result, score);
  send(res, 200, { result, research });
}
