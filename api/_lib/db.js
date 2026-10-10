import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) console.warn('DATABASE_URL missing');
export const sql = neon(process.env.DATABASE_URL);

export async function upsertUser(user) {
  await sql`
    INSERT INTO users (id, email, name)
    VALUES (${user.id}, ${user.email || ''}, ${user.name || ''})
    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name
  `;
}

export async function getStartup(id, userId) {
  const rows = await sql`SELECT * FROM startups WHERE id = ${id} AND user_id = ${userId}`;
  return rows[0];
}

export async function saveAgentResult(startupId, agentType, result, score = 0) {
  const rows = await sql`
    INSERT INTO agent_results (startup_id, agent_type, result, score)
    VALUES (${startupId}, ${agentType}, ${JSON.stringify(result)}, ${score})
    ON CONFLICT (startup_id, agent_type)
    DO UPDATE SET result = EXCLUDED.result, score = EXCLUDED.score, created_at = NOW()
    RETURNING *
  `;
  return rows[0];
}
