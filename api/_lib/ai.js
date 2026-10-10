import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function tavilySearch(queries = []) {
  const all = [];
  for (const query of queries) {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: 'advanced',
        include_answer: true,
        max_results: 5
      })
    });
    if (!response.ok) throw new Error(`Tavily failed: ${response.status}`);
    const data = await response.json();
    all.push({ query, answer: data.answer, results: data.results || [] });
  }
  return all;
}

export async function geminiJson(prompt) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    tools: [{ googleSearch: {} }],
    generationConfig: { responseMimeType: 'application/json' }
  });

  const result = await model.generateContent(`${prompt}\n\nReturn valid JSON only. No markdown.`);
  const text = result.response.text();
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}
