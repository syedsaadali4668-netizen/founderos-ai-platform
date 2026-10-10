import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api';

export default function StartupWizard() {
  const { getToken } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', idea:'', target_market:'', category:'', stage:'idea', budget:'low' });
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault(); setLoading(true);
    const api = apiClient(getToken);
    const { data } = await api.post('/startup/create', form);
    nav(`/dashboard/${data.startup.id}`);
  };

  return <form onSubmit={submit} className="card mx-auto max-w-3xl space-y-4">
    <input className="input" placeholder="Startup name" onChange={e=>setForm({...form,name:e.target.value})}/>
    <textarea className="input min-h-28" placeholder="What are you building?" onChange={e=>setForm({...form,idea:e.target.value})}/>
    <input className="input" placeholder="Target market" onChange={e=>setForm({...form,target_market:e.target.value})}/>
    <input className="input" placeholder="Category e.g. AI SaaS, EdTech" onChange={e=>setForm({...form,category:e.target.value})}/>
    <div className="grid gap-4 md:grid-cols-2">
      <select className="input" onChange={e=>setForm({...form,stage:e.target.value})}><option>idea</option><option>mvp</option><option>revenue</option></select>
      <select className="input" onChange={e=>setForm({...form,budget:e.target.value})}><option>low</option><option>medium</option><option>high</option></select>
    </div>
    <button className="btn w-full" disabled={loading}>{loading ? 'Creating...' : 'Launch FounderOS'}</button>
  </form>;
}
