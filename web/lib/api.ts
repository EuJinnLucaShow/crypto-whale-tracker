import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Whale {
  id: number;
  address: string;
  label: string;
  balance?: string | null;
  created_at: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export const api = {
  useWhales: () => {
    const { data, error, mutate } = useSWR<Whale[]>(
      `${API_URL}/whales`,
      fetcher,
      {
        refreshInterval: 10000,
        revalidateOnFocus: true,
      },
    );

    return {
      whales: data,
      isLoading: !error && !data,
      isError: error,
      mutate,
    };
  },

  addWhale: async (address: string, label: string) => {
    const res = await fetch(`${API_URL}/whales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, label }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        Array.isArray(data.message)
          ? data.message[0]
          : data.message || "Server Error",
      );
    }
    return data;
  },

  deleteWhale: async (id: number) => {
    const res = await fetch(`${API_URL}/whales/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    return true;
  },
};
