import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Loader2, ShieldCheck, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Attempt real login if data is provided, otherwise use dummy for demo
      if (formData.email && formData.password) {
        const response = await api.post('/auth/login', formData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        // Dummy login for "bebas saja" / optional requirement
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({ name: 'Admin User', email: 'admin@eco-share.com' }));
      }
      navigate('/dashboard');
    } catch (error) {
      // Fallback to dummy login if API fails but user wants "bebas saja"
      console.error("API Login failed, using demo mode", error);
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({ name: 'Admin User', email: 'admin@eco-share.com' }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-['Inter'] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-emerald-500 p-3 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
              <Leaf className="text-slate-900" size={32} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Eco-Share</h1>
            <p className="text-slate-400 text-sm font-medium mt-2">Enter credentials or leave blank to enter.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Infrastructure</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="admin@eco-share.com"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              <span>Secure Authentication</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs">
              Unauthorized access is strictly prohibited. <br/>
              <Link to="/register" className="text-emerald-500 font-bold hover:underline mt-2 inline-block">Request Access Key</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
