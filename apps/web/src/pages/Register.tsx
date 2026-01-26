import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });

export default function Register() {
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data: any) {
    try {
      await doRegister(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      // handled elsewhere
    }
  }

  return (
    <div className="auth-page">
      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <div className="error">{errors.name.message as string}</div>}
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <div className="error">{errors.email.message as string}</div>}
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <div className="error">{errors.password.message as string}</div>}
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
