import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Loader2, UserCircle2, Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'renter' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      alert("Account created! You can now login.");
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Registration failed";
      console.error("Registration Error:", error);
      alert(`Registration Failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-['Inter'] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-emerald-500 p-3 rounded-2xl mb-4"><Leaf className="text-slate-900" size={32} /></div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic text-center leading-none">Apply for <br/> Access</h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity Name</label>
              <div className="relative group">
                <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input required className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Node</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input required type="email" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input required type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Clearance</label>
              <select className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                <option value="renter">Renter (End-user)</option>
                <option value="owner">Owner (Asset Manager)</option>
              </select>
            </div>

            <button disabled={loading} className="w-full py-4 mt-4 bg-emerald-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all uppercase tracking-widest text-xs">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
              <span>Create Instance</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-slate-500 text-xs font-medium hover:text-emerald-500">Back to Authentication</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
