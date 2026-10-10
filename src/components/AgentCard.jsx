export default function AgentCard({ title, description, onRun, loading }) {
  return <div className="card flex items-center justify-between gap-4">
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-1 text-zinc-400">{description}</p>
    </div>
    <button onClick={onRun} disabled={loading} className="btn">{loading ? 'Running...' : 'Run Agent'}</button>
  </div>;
}
