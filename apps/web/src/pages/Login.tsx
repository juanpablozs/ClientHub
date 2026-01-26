import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data: any) {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      // error handled in context
    }
  }

  return (
    <div className="auth-page">
      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <div className="error">{errors.email.message as string}</div>}
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <div className="error">{errors.password.message as string}</div>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
