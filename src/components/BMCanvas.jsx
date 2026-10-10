export default function BMCanvas({ vitals }) {
  const r = vitals?.results || {};
  const cells = [
    ['Problem', r.validation?.result?.risks?.slice(0,3)],
    ['Solution', r.validation?.result?.recommendation],
    ['Customers', r.icp?.result?.profiles?.map(p => p.name)],
    ['Channels', r.gtm?.result?.channels?.map(c => c.name)],
    ['Revenue', r.revenue?.result?.models?.map(m => m.name)],
    ['Competitors', r.validation?.result?.competitors?.map(c => c.name)]
  ];
  return <div className="grid gap-4 md:grid-cols-3">
    {cells.map(([title, value]) => <div className="card min-h-36" key={title}>
      <h3 className="font-bold text-amber-500">{title}</h3>
      <div className="mt-3 text-sm text-zinc-300">
        {Array.isArray(value) ? <ul className="list-disc pl-4">{value.map((v,i)=><li key={i}>{v}</li>)}</ul> : value || 'Run agents to auto-fill.'}
      </div>
    </div>)}
  </div>;
}
