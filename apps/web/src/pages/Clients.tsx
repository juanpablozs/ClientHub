import React from 'react';
import api from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Layout from '../shared/Layout';
import { Link } from 'react-router-dom';

function useClients() {
  return useQuery(['clients'], async () => {
    const res = await api.get('/api/clients');
    return res.data;
  });
}

export default function Clients() {
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const { data, isLoading, refetch } = useClients();

  React.useEffect(() => {
    // naive: refetch on filter change - backend currently ignores query params in mock
    refetch();
  }, [q, status, page]);

  return (
    <Layout>
      <h2>Clients</h2>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search name or company" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={status || ''} onChange={(e) => setStatus(e.target.value || undefined)} style={{ marginLeft: 8 }}>
          <option value="">All</option>
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {isLoading && <div>Loading...</div>}
      {data && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((c: any) => (
                <tr key={c.id}>
                  <td>
                    <Link to={`/clients/${c.id}`}>{c.name}</Link>
                  </td>
                  <td>{c.company}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
            <span style={{ margin: '0 8px' }}>Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </Layout>
  );
}
