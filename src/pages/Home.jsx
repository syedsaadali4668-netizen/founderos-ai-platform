import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import StartupWizard from '../components/StartupWizard';

export default function Home() {
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3f2b07,transparent_35%),#09090B] px-6 py-10">
    <nav className="mx-auto flex max-w-6xl items-center justify-between">
      <div className="text-2xl font-black">Founder<span className="text-amber-500">OS</span></div>
      <SignedOut><div className="flex gap-3"><SignInButton><button className="rounded-xl border border-white/10 px-4 py-2">Sign in</button></SignInButton><SignUpButton><button className="btn">Start free</button></SignUpButton></div></SignedOut>
    </nav>
    <section className="mx-auto mt-20 max-w-5xl text-center">
      <p className="text-amber-500">Autonomous AI co-founder for solo entrepreneurs</p>
      <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">Validate, launch, price, and fund your startup with AI agents.</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">FounderOS runs market research, ICP design, GTM planning, revenue strategy, investor discovery, and weekly founder briefings.</p>
    </section>
    <section className="mt-14"><SignedIn><StartupWizard /></SignedIn><SignedOut><div className="text-center"><SignUpButton><button className="btn px-8 py-4">Create your founder workspace</button></SignUpButton></div></SignedOut></section>
  </main>;
}
