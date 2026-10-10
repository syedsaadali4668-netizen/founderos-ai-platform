import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { apiClient } from '../lib/api';

export default function Investors() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [data,setData]=useState(null); const [loading,setLoading]=useState(false);
  const run=async()=>{ setLoading(true); const r=await apiClient(getToken).post(`/startup/${id}/investors`); setData(r.data.result); setLoading(false); };
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">Investors</h1>
    <div className="mt-6"><AgentCard title="Investor Agent" description="Finds relevant VCs/angels and drafts outreach." loading={loading} onRun={run}/></div>
    {data && <div className="card mt-8 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-amber-500"><th>Name</th><th>Firm</th><th>Focus</th><th>Check</th><th>Email</th></tr></thead><tbody>{data.investors?.map((v,i)=><tr className="border-t border-white/10" key={i}><td className="py-3">{v.name}</td><td>{v.firm}</td><td>{v.focus}</td><td>{v.check_size}</td><td><button className="btn" onClick={()=>navigator.clipboard.writeText(v.cold_email_draft)}>Copy Email Draft</button></td></tr>)}</tbody></table></div>}
  </main></div>;
}
