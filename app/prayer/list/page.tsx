'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PrayerListPage() {
    const [prayers, setPrayers] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/prayer')
            .then(res => res.json())
            .then(setPrayers);
    }, []);

    const deletePrayer = async (id: string) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;

        await fetch(`/api/prayer/${id}`, {
            method: 'DELETE',
        });

        // Refresh list after delete
        setPrayers(prayers.filter(p => p.id !== id));
    };


    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <span>Saved Prayers</span>
                <Link href="/prayer/new" className="btn btn-success btn-sm">
                    Add New
                </Link>
            </div>

            <div className="card-body table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Interceded For</th>
                            <th>Good Work</th>
                            <th>Bad Work</th>
                            <th>Good Spirit</th>
                            <th>Bad Spirit</th>
                            <th>Good Fam</th>
                            <th>Bad Fam</th>
                            <th>Rosary</th>
                            <th>Lectio Divina</th>
                            <th>Adoration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prayers.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.intercededFor}</td>
                                <td>{p.goodWork}</td>
                                <td>{p.badWork}</td>
                                <td>{p.goodSpirit}</td>
                                <td>{p.badSpirit}</td>
                                <td>{p.goodFam}</td>
                                <td>{p.badFam}</td>
                                <td>{p.rosary ? 'Yes' : 'No'}</td>
                                <td>
                                    {p.lectioDivina ? p.lectioDivinaNotes || 'Yes' : 'No'}
                                </td>
                                <td>
                                    {p.adoration ? `${p.adorationHours} hrs` : 'No'}
                                </td>
                                <td>
                                    <Link
                                        href={`/prayer/edit/${p.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deletePrayer(p.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {prayers.length === 0 && (
                            <tr>
                                <td colSpan={9} className="text-center">
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
