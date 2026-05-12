import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-500/10 p-4 rounded-3xl border border-emerald-500/20">
            <Leaf className="text-emerald-500" size={48} />
          </div>
        </div>
        
        <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          Eco-Share Platform
        </h1>
        
        <p className="text-slate-400 max-w-lg mx-auto text-lg mb-8">
          Backend service is active. Access the interactive management dashboard via port 5173.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Operational</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Zap className="text-blue-500" size={14} />
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">v1.0.0 Stable</span>
          </div>
        </div>

        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl shadow-xl shadow-white/10 hover:bg-slate-100 transition-colors uppercase tracking-widest text-sm flex items-center gap-2 mx-auto"
          >
            <ShieldCheck size={20} />
            Enter Dashboard
          </motion.button>
        </Link>
      </motion.div>
      
      <footer className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          Powered by Eco-Share Infrastructure &bull; 2026
        </p>
      </footer>
    </div>
  );
};

export default Landing;
