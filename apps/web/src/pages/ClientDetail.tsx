import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Layout from '../shared/Layout';

export default function ClientDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(['client', id], async () => {
    const res = await api.get(`/api/clients/${id}`);
    return res.data;
  });

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Company: {data.company}</p>
          <p>Email: {data.email}</p>
          <p>Status: {data.status}</p>
        </div>
      )}
    </Layout>
  );
}
