'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/prayer/list">
          Prayer App
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" href="/prayer/new">
            New
          </Link>
          <Link className="nav-link" href="/prayer/list">
            List
          </Link>
          <Link className="nav-link" href="/prayer/by-date">
            By Date
          </Link>
        </div>
      </div>
    </nav>
  );
}
