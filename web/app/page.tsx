import { api } from "../lib/api";
import AddWhaleForm from "./components/AddWhaleForm";

export default async function Home() {
  const whales = await api.getWhales();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crypto Whale Tracker</h1>

      <AddWhaleForm />

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Monitored Wallets ({whales.length})
        </h2>
        {whales.length === 0 ? (
          <p className="text-gray-500">No whales tracked yet.</p>
        ) : (
          <ul className="space-y-3">
            {whales.map((whale) => (
              <li
                key={whale.id}
                className="p-4 border rounded flex justify-between items-center shadow-sm hover:shadow transition"
              >
                <span className="font-mono text-sm text-gray-700">
                  {whale.address}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {whale.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
