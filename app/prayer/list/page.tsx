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
                <td>
                  <Link
                    href={`/prayer/edit/${p.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
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
