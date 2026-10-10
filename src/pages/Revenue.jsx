import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { apiClient } from '../lib/api';

export default function Revenue() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const run=async()=>{ setLoading(true); const r=await apiClient(getToken).post(`/startup/${id}/revenue`); setData(r.data.result); setLoading(false); };
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">Revenue</h1>
    <div className="mt-6"><AgentCard title="Revenue Agent" description="Runs real AI analysis with Gemini and live research where required." loading={loading} onRun={run} /></div>
    <div className="mt-8">{data && <div className="grid gap-4 md:grid-cols-3">{data.models?.map((m,i)=><div className="card" key={i}><h2 className="text-xl font-bold">{m.name}</h2><p className="mt-2 text-amber-500">{m.price_points?.join(' / ')}</p><p className="mt-3 text-sm text-zinc-300">{m.rationale}</p><p className="mt-3 text-sm">LTV: {m.ltv_estimate}<br/>CAC: {m.cac_estimate}<br/>Payback: {m.payback_months} months</p></div>)}</div>}</div>
  </main></div>
}
