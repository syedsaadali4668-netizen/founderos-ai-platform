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

  const research = await tavilySearch([`investors funding ${startup.category || startup.idea} 2024 2025 2026`]);
  const result = await geminiJson(`Extract 10 relevant VCs or angels for this startup ${JSON.stringify(startup)}
from research: ${JSON.stringify(research)}.
Return JSON: { "investors": [{
"name":"string","firm":"string","focus":"string","check_size":"string",
"linkedin_url":"string","cold_email_draft":"string"
}]}`);
  await saveAgentResult(startup.id, 'investors', result, 70);
  send(res, 200, { result, research });
}
