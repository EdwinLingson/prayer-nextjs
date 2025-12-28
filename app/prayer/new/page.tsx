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
    rosary: false,
    lectioDivina: false,
    lectioDivinaNotes: '',
    adoration: false,
    adorationHours: '',
  });

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const submit = async () => {
    if (!form.lectioDivina) form.lectioDivinaNotes = '';
    if (!form.adoration) form.adorationHours = '';
    const payload = {
      ...form,
      adorationHours: form.adoration
        ? parseFloat(form.adorationHours)
        : null,
    };

    console.log('Submitting form:', payload);

    await fetch('/api/prayer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
        <hr />
        <h5>Spiritual Practices</h5>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="rosary"
            checked={form.rosary}
            onChange={handleChange}
          />
          <label className="form-check-label">Rosary</label>
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="lectioDivina"
            checked={form.lectioDivina}
            onChange={handleChange}
          />
          <label className="form-check-label">Lectio Divina</label>
        </div>

        {form.lectioDivina && (
          <div className="mb-3">
            <label className="form-label">Lectio Divina Notes</label>
            <textarea
              className="form-control"
              name="lectioDivinaNotes"
              value={form.lectioDivinaNotes}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="adoration"
            checked={form.adoration}
            onChange={handleChange}
          />
          <label className="form-check-label">Adoration</label>
        </div>

        {form.adoration && (
          <div className="mb-3">
            <label className="form-label">Adoration Hours</label>
            <input
              type="number"
              step="0.25"
              className="form-control"
              name="adorationHours"
              value={form.adorationHours}
              onChange={handleChange}
            />
          </div>
        )}

        <button className="btn btn-primary" onClick={submit}>
          Save
        </button>
      </div>
    </div>
  );
}
