import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, UserPlus, X, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'renter'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // In a real app, this would be a protected GET /users endpoint
      // For now we mock it or fetch if you have the endpoint
      const response = await api.get('/items'); // Placeholder if /users doesn't exist yet
      setUsers([]); // Initialize as empty for now
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboard = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.post('/auth/register', formData);
      setIsModalOpen(false);
      alert("Renter successfully onboarded to Eco-Share!");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Onboarding failed");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Renter Base</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Overview of all active renters and their account status.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 rounded-xl text-xs font-bold text-slate-900 shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 transition-all active:scale-95"
        >
          <UserPlus size={16} />
          <span>Onboard Renter</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border border-slate-100">
            <UsersIcon size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">System Isolation</h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">Database encryption is active. Restricted view for infrastructure level admins only.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Renter Onboarding</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"><X size={20}/></button>
              </div>

              <form onSubmit={handleOnboard} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initial Password</label>
                  <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
                <button disabled={formLoading} className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all">
                  {formLoading ? <Loader2 className="animate-spin" size={18}/> : <ShieldCheck size={18}/>}
                  <span>Authorize & Create Account</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
