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
    `${startup.idea} news this week`,
    `${startup.idea} competitors funding news this week`
  ]);
  const result = await geminiJson(`Generate a concise 400-word founder briefing for ${JSON.stringify(startup)}.
Use research: ${JSON.stringify(research)}.
Return JSON: { "headline":"string", "market_pulse":"string", "competitor_moves":["string"],
"this_week_priority":"string", "quote_of_the_week":"string" }`);
  await saveAgentResult(startup.id, 'briefing', result, 75);
  send(res, 200, { result, research });
}
