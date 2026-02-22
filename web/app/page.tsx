"use client";

import { api } from "../lib/api";
import AddWhaleForm from "./components/AddWhaleForm";
import WhalesList from "./components/WhalesList";

export default function Home() {
  const { whales, isLoading, mutate } = api.useWhales();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-cyan-400 animate-pulse font-mono">
          Syncing with blockchain...
        </div>
      </div>
    );
  }

  const whaleList = whales || [];

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden bg-black text-white">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-5xl mx-auto space-y-10 relative z-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-500">
            Crypto Whale Tracker
          </h1>
          <p className="text-zinc-400 text-lg">
            Monitoring high-value crypto wallets in real-time.
          </p>
        </header>

        <section className="w-full">
          <AddWhaleForm onSuccess={() => mutate()} />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-zinc-100">
              Monitored Wallets
            </h2>
            <span className="bg-zinc-900 text-cyan-400 border border-zinc-800 px-3 py-1 rounded-full text-sm font-semibold shadow-[0_0_10px_rgba(34,211,238,0.1)]">
              {whaleList.length} Total
            </span>
          </div>
          <WhalesList whales={whaleList} onMutate={() => mutate()} />
        </section>
      </main>
    </div>
  );
}
