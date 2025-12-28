'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PrayerByDatePage() {
  const [date, setDate] = useState('');
  const [prayers, setPrayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!date) return;

    setLoading(true);
    const res = await fetch(`/api/prayer/by-date?date=${date}`);
    const data = await res.json();
    setPrayers(data);
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">View Prayers by Date</div>

      <div className="card-body">
        {/* Date Picker */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={search}>
              Search
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="table-responsive">
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
              {loading && (
                <tr>
                  <td colSpan={9} className="text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && prayers.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center">
                    No records found
                  </td>
                </tr>
              )}

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
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
