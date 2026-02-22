"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface AddWhaleFormProps {
  onSuccess: () => void;
}

export default function AddWhaleForm({
  onSuccess,
}: Readonly<AddWhaleFormProps>) {
  const [address, setAddress] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.addWhale(address, label);
      toast.success("Whale added successfully!");
      setAddress("");
      setLabel("");
      onSuccess();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error adding whale";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-xl space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="wallet-address"
            className="text-sm font-medium text-zinc-400 ml-1"
          >
            Wallet Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all font-mono"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="wallet-label"
            className="text-sm font-medium text-zinc-400 ml-1"
          >
            Wallet Label
          </label>
          <input
            type="text"
            placeholder="e.g. Binance Hot Wallet"
            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full md:w-auto px-8 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Track Wallet"}
      </button>
    </form>
  );
}
