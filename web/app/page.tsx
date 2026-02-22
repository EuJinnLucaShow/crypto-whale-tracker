"use client";

import { api } from "../lib/api";
import AddWhaleForm from "./components/AddWhaleForm";
import DeleteButton from "./components/DeleteButton";

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
    <div className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Decorative gradient on the background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-5xl mx-auto space-y-10 relative z-10">
        <header className="space-y-2">
          {/* Gradient title text */}
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-500">
            Whale Tracker
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

          {whaleList.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed backdrop-blur-sm">
              <p className="text-zinc-500 text-lg">
                No whales tracked yet. Add your first address above.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1">
              {whaleList.map((whale) => (
                <div
                  key={whale.id}
                  className="group p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                >
                  <div className="flex flex-col space-y-1 min-w-0 w-full">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <span className="font-bold text-zinc-200 uppercase text-xs tracking-widest">
                        {whale.label}
                      </span>
                      {whale.balance && (
                        <span className="ml-2 px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20 font-mono font-medium">
                          {Number.parseFloat(whale.balance).toFixed(4)} ETH
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm text-zinc-500 truncate block">
                      {whale.address}
                    </span>
                  </div>

                  <div className="flex items-center self-end sm:self-center">
                    <DeleteButton
                      id={whale.id}
                      label={whale.label}
                      onDelete={() => mutate()}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
