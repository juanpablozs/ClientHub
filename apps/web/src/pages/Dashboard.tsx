import React from 'react';
import api from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Layout from '../shared/Layout';

function useStats() {
  return useQuery(['stats'], async () => {
    const res = await api.get('/api/stats/dashboard');
    return res.data;
  });
}

export default function Dashboard() {
  const { data, isLoading } = useStats();

  return (
    <Layout>
      <h2>Dashboard</h2>
      {isLoading && <div>Loading...</div>}
      {data && (
        <div className="cards">
          <div className="card-sm">Total Clients: {data.totalClients}</div>
          <div className="card-sm">Total Projects: {data.totalProjects}</div>
        </div>
      )}
    </Layout>
  );
}
