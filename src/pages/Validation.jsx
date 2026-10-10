import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { apiClient } from '../lib/api';

export default function Validation() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const run=async()=>{ setLoading(true); const r=await apiClient(getToken).post(`/startup/${id}/validate`); setData(r.data.result); setLoading(false); };
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">Validation</h1>
    <div className="mt-6"><AgentCard title="Validation Agent" description="Runs real AI analysis with Gemini and live research where required." loading={loading} onRun={run} /></div>
    <div className="mt-8">{data && <div className="space-y-4">
      <div className="card"><h2 className="text-2xl font-bold">{data.score}/100 — {data.verdict}</h2><p className="mt-3 text-zinc-300">{data.recommendation}</p></div>
      <div className="grid gap-4 md:grid-cols-2"><div className="card"><h3 className="font-bold text-amber-500">Strengths</h3><ul className="mt-3 list-disc pl-5">{data.strengths?.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div className="card"><h3 className="font-bold text-amber-500">Risks</h3><ul className="mt-3 list-disc pl-5">{data.risks?.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div>
      <div className="card"><h3 className="font-bold text-amber-500">Competitors</h3>{data.competitors?.map((c,i)=><p key={i} className="mt-2"><b>{c.name}</b> — {c.weakness}</p>)}</div>
    </div>}</div>
  </main></div>
}
