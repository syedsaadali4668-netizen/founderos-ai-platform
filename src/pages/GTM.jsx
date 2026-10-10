import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { apiClient } from '../lib/api';

export default function GTM() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const run=async()=>{ setLoading(true); const r=await apiClient(getToken).post(`/startup/${id}/gtm`); setData(r.data.result); setLoading(false); };
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">GTM</h1>
    <div className="mt-6"><AgentCard title="GTM Agent" description="Runs real AI analysis with Gemini and live research where required." loading={loading} onRun={run} /></div>
    <div className="mt-8">{data && <div className="space-y-4">{data.weeks?.map(w=><div className="card grid gap-4 md:grid-cols-[100px_1fr_200px]" key={w.week}><div className="text-amber-500 font-black">Week {w.week}</div><div><h3 className="font-bold">{w.theme}</h3><ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">{w.actions?.map((a,i)=><li key={i}>{a}</li>)}</ul></div><div className="text-sm text-zinc-400">{w.metric}</div></div>)}</div>}</div>
  </main></div>
}
