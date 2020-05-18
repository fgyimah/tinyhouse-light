const BASE_URL = 'http://localhost:7700';

interface Body {
  query: string;
}

export const server = {
  fetch: async <TData = any>(body: Body) => {
    const res = await fetch(`${BASE_URL}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return res.json() as Promise<{ data: TData }>;
  },
};
