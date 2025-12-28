'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrayerFormPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    intercededFor: '',
    goodWork: '',
    badWork: '',
    goodSpirit: '',
    badSpirit: '',
    goodFam: '',
    badFam: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await fetch('/api/prayer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/prayer/list');
  };

  return (
    <div className="card">
      <div className="card-header">New Prayer</div>
      <div className="card-body">
        {Object.keys(form).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label text-capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              className="form-control"
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className="btn btn-primary" onClick={submit}>
          Save
        </button>
      </div>
    </div>
  );
}
