import React from 'react';
import api from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Layout from '../shared/Layout';
import { Link } from 'react-router-dom';

function useProjects() {
  return useQuery(['projects'], async () => {
    const res = await api.get('/api/projects');
    return res.data;
  });
}

export default function Projects() {
  const { data, isLoading } = useProjects();

  return (
    <Layout>
      <h2>Projects</h2>
      {isLoading && <div>Loading...</div>}
      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((p: any) => (
              <tr key={p.id}>
                <td>
                  <Link to={`/projects/${p.id}`}>{p.name}</Link>
                </td>
                <td>{p.clientId}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
