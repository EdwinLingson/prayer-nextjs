'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPrayerPage() {
    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleChange = (e: any) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const submit = async () => {
        const payload = {
            ...form,
            adorationHours: form.adoration
                ? parseFloat(form.adorationHours)
                : null,
        };
        console.log('Submitting form:', payload);
        await fetch(`/api/prayer/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        router.push('/prayer/list');
    };

    return (
        <div className="card">
            <div className="card-header">Edit Prayer</div>
            <div className="card-body">
                {/* form fields here */}
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
