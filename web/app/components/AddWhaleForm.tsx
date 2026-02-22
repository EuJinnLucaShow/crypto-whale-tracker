"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AddWhaleForm() {
  const [address, setAddress] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.addWhale(address, label);
      setAddress("");
      setLabel("");

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 rounded-lg border mb-8"
    >
      <h2 className="text-lg font-semibold mb-4">Add New Whale</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Ethereum Address (0x...)"
          className="flex-1 p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Label (e.g., Binance Hot Wallet)"
          className="flex-1 p-2 border rounded"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Whale"}
        </button>
      </div>
    </form>
  );
}
