import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import VitalsGauge from '../components/VitalsGauge';
import BMCanvas from '../components/BMCanvas';
import { apiClient } from '../lib/api';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { id } = useParams(); const { getToken } = useAuth();
  const [vitals, setVitals] = useState(null);
  useEffect(()=>{ apiClient(getToken).get(`/startup/${id}/vitals`).then(r=>setVitals(r.data)); },[id]);
  const b = vitals?.breakdown || {};
  return <div><Sidebar/><main className="ml-64 p-8">
    <h1 className="text-4xl font-black">Startup Vitals</h1>
    <p className="mt-2 text-zinc-400">Next action: {vitals?.next_action || 'Loading...'}</p>
    <div className="mt-8 grid gap-4 md:grid-cols-4">
      <VitalsGauge label="Market" score={b.market || 0}/><VitalsGauge label="ICP" score={b.icp || 0}/><VitalsGauge label="GTM" score={b.gtm || 0}/><VitalsGauge label="Revenue" score={b.revenue || 0}/>
    </div>
    <h2 className="mt-10 mb-4 text-2xl font-bold">Business Model Canvas</h2>
    <BMCanvas vitals={vitals}/>
  </main></div>;
}
