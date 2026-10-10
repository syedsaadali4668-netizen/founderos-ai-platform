import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function VitalsGauge({ label, score = 0 }) {
  const data = [{ name: label, value: score, fill: '#F59E0B' }];
  return <div className="card">
    <div className="h-36">
      <ResponsiveContainer>
        <RadialBarChart innerRadius="68%" outerRadius="100%" data={data} startAngle={180} endAngle={-180}>
          <RadialBar dataKey="value" cornerRadius={12} background />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
    <div className="text-center">
      <div className="text-3xl font-black">{score}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  </div>;
}
