const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Whale {
  id: number;
  address: string;
  label: string;
  balance?: string | null;
  created_at: string;
}

export const api = {
  getWhales: async (): Promise<Whale[]> => {
    const res = await fetch(`${API_URL}/whales`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch whales");
    return res.json();
  },

  addWhale: async (address: string, label: string) => {
    const res = await fetch(`${API_URL}/whales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, label }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMessage = Array.isArray(data.message)
        ? data.message[0]
        : data.message;
      throw new Error(errorMessage || "Помилка сервера");
    }

    return data;
  },

  deleteWhale: async (id: number) => {
    const res = await fetch(`${API_URL}/whales/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Не вдалося видалити запис");
    }

    return true;
  },
};
