import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { apiClient } from '../lib/api';

export default function Briefing() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const run=async()=>{ setLoading(true); const r=await apiClient(getToken).post(`/startup/${id}/briefing`); setData(r.data.result); setLoading(false); };
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">Briefing</h1>
    <div className="mt-6"><AgentCard title="Briefing Agent" description="Runs real AI analysis with Gemini and live research where required." loading={loading} onRun={run} /></div>
    <div className="mt-8">{data && <div className="card max-w-4xl"><h2 className="text-2xl font-bold">{data.headline}</h2><p className="mt-4 text-zinc-300">{data.market_pulse}</p><h3 className="mt-6 font-bold text-amber-500">Competitor moves</h3><ul className="mt-2 list-disc pl-5">{data.competitor_moves?.map((x,i)=><li key={i}>{x}</li>)}</ul><p className="mt-6"><b>This week:</b> {data.this_week_priority}</p><p className="mt-4 italic text-zinc-400">"{data.quote_of_the_week}"</p></div>}</div>
  </main></div>
}
