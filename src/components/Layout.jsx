import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Inter'] text-slate-900 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-grow flex flex-col min-w-0">
        <Topbar />
        
        <main className="p-10 flex-grow overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>

        <footer className="h-16 flex items-center justify-between px-10 border-t border-slate-200 bg-white">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Eco-Share &bull; Enterprise Management System &bull; 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
