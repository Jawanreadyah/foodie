import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, UserCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer'); // 'customer' | 'business'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Provide mock success for MVP to explore app without real Supabase connection working yet 
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes("weczvzipghgdjnhcrni.supabase.co")) {
      setTimeout(() => {
        if (role === 'business') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }, 1000);
      return; 
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(role === 'business' ? '/dashboard' : '/');
      } else {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { role: role }
          }
        });
        if (error) throw error;
        // Optionally create profile row here
        navigate(role === 'business' ? '/dashboard' : '/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card glass-card animate-slide-up">
        <h1 className="auth-title">FoodieQatar</h1>
        <p className="auth-subtitle">{isLogin ? 'Welcome back!' : 'Create your account'}</p>

        {!isLogin && (
          <div className="role-selector">
            <button 
              type="button" 
              className={`role-btn ${role === 'customer' ? 'active' : ''}`}
              onClick={() => setRole('customer')}
            >
              <UserCircle size={20} /> Customer
            </button>
            <button 
              type="button" 
              className={`role-btn ${role === 'business' ? 'active' : ''}`}
              onClick={() => setRole('business')}
            >
              <Store size={20} /> Business
            </button>
          </div>
        )}

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input 
              type="email" 
              className="input-glass" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="input-glass" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="toggle-btn" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Auth;
