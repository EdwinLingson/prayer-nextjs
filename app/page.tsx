'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/entries')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  );
}
