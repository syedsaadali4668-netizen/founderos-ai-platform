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
    `${startup.idea} competitors`,
    `${startup.idea} market size`,
    `${startup.idea} trends 2025 2026`
  ]);

  const result = await geminiJson(`You are a YC partner. Analyze this startup idea: ${startup.idea}.
Startup: ${JSON.stringify(startup)}
Using this market research: ${JSON.stringify(research)}.
Return JSON: {
 "score": 0-100,
 "verdict": "string",
 "strengths": ["string"],
 "risks": ["string"],
 "competitors": [{"name":"string","url":"string","weakness":"string"}],
 "tam_estimate": "string",
 "recommendation": "string"
}`);
  await saveAgentResult(startup.id, 'validation', result, result.score || 0);
  send(res, 200, { result, research });
}
