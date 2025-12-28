'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPrayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return; // 🔑 prevent undefined fetch

    fetch(`/api/prayer/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to load data');
        }
        return res.json();
      })
      .then(setForm)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!form) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-header">Edit Prayer</div>
      <div className="card-body">
        {/* form fields here */}
      </div>
    </div>
  );
}
