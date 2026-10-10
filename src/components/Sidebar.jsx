import { Link, useParams } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { BarChart3, Target, Users, Rocket, DollarSign, Landmark, Newspaper } from 'lucide-react';

export default function Sidebar() {
  const { id } = useParams();
  const links = [
    ['Dashboard', `/dashboard/${id}`, BarChart3],
    ['Validation', `/validation/${id}`, Target],
    ['ICP', `/icp/${id}`, Users],
    ['GTM', `/gtm/${id}`, Rocket],
    ['Revenue', `/revenue/${id}`, DollarSign],
    ['Investors', `/investors/${id}`, Landmark],
    ['Briefing', `/briefing/${id}`, Newspaper]
  ];
  return <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-zinc-950 p-5">
    <div className="mb-8 flex items-center justify-between">
      <Link to="/" className="text-2xl font-black">Founder<span className="text-amber-500">OS</span></Link>
      <UserButton />
    </div>
    <nav className="space-y-2">{links.map(([label, href, Icon]) => (
      <Link key={label} to={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 hover:bg-zinc-900 hover:text-white">
        <Icon size={18}/>{label}
      </Link>
    ))}</nav>
  </aside>;
}
