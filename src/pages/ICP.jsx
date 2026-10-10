import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { apiClient } from '../lib/api';

export default function ICP() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const run=async()=>{ setLoading(true); const r=await apiClient(getToken).post(`/startup/${id}/icp`); setData(r.data.result); setLoading(false); };
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">ICP</h1>
    <div className="mt-6"><AgentCard title="ICP Agent" description="Runs real AI analysis with Gemini and live research where required." loading={loading} onRun={run} /></div>
    <div className="mt-8">{data && <div className="grid gap-4 md:grid-cols-3">{data.profiles?.map((p,i)=><div className="card" key={i}><h2 className="text-xl font-bold">{p.name}</h2><p className="text-amber-500">{p.job_title} · {p.age_range}</p><p className="mt-3 italic text-zinc-300">"{p.sample_quote}"</p><h3 className="mt-4 font-bold">Pain points</h3><ul className="list-disc pl-5 text-sm">{p.pain_points?.map((x,j)=><li key={j}>{x}</li>)}</ul></div>)}</div>}</div>
  </main></div>
}
