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
  const { data, isLoading } = useClients();

  return (
    <Layout>
      <h2>Clients</h2>
      {isLoading && <div>Loading...</div>}
      {data && (
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
      )}
    </Layout>
  );
}
