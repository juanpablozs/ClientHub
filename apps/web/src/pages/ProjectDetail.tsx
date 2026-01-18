import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Layout from '../shared/Layout';

export default function ProjectDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(['project', id], async () => {
    const res = await api.get(`/api/projects/${id}`);
    return res.data;
  });

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Client: {data.clientId}</p>
          <p>Status: {data.status}</p>
          <p>Budget: {data.budget}</p>
        </div>
      )}
    </Layout>
  );
}
