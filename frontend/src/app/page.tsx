"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:6001/users")
      .then(res => {
        if (!res.ok) throw new Error(`Бэкенд ответил ${res.status}`);
        return res.json();
      })
      .then(data => setUsers(Array.isArray(data.items) ? data.items : []))
      .catch(e =>
        setError(e instanceof Error ? e.message : "Неизвестная ошибка"),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>Пользователи</h1>
      {loading && <p>Загрузка…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map(u => (
            <li key={u.id}>
              <b>{u.name}</b> — {u.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
