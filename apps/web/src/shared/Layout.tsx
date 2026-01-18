import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  return (
    <div className="app">
      <aside className="sidebar">
        <h3>ClientHub</h3>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <div>{user ? `Welcome, ${user.name}` : ''}</div>
          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </header>
        <main className="container">{children}</main>
      </div>
    </div>
  );
}
