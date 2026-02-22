"use client";

import { Whale } from "../../lib/api";
import { formatCrypto } from "../../lib/format";
import DeleteButton from "./DeleteButton";

interface WhalesListProps {
  whales: Whale[];
  onMutate: () => void;
}

export default function WhalesList({
  whales,
  onMutate,
}: Readonly<WhalesListProps>) {
  if (whales.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed backdrop-blur-sm">
        <p className="text-zinc-500 text-lg">
          No whales tracked yet. Add your first address above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1">
      {whales.map((whale) => (
        <div
          key={whale.id}
          className="group p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <div className="flex flex-col space-y-2 min-w-0 w-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="font-bold text-zinc-200 uppercase text-xs tracking-widest">
                {whale.label}
              </span>
            </div>

            <span className="font-mono text-sm text-zinc-500 truncate block">
              {whale.address}
            </span>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {formatCrypto(whale.usdt_balance, true)} USDT
              </span>

              <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {formatCrypto(whale.balance)} ETH
              </span>
            </div>
          </div>

          <div className="flex items-center self-end sm:self-center">
            <DeleteButton
              id={whale.id}
              label={whale.label}
              onDelete={onMutate}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
