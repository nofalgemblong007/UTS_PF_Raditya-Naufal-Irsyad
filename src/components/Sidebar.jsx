import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Repeat, 
  Settings, 
  ShieldCheck, 
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/items', icon: Package },
    { name: 'Renter Base', path: '/users', icon: Users },
    { name: 'Transaction Log', path: '/rentals', icon: Repeat },
  ];

  return (
    <aside className="w-72 bg-[#0F172A] flex-shrink-0 hidden lg:flex flex-col border-r border-slate-800 h-screen sticky top-0">
      <div className="h-20 flex items-center px-8 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg text-slate-900">
            <Leaf size={18} />
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight uppercase">Eco-Share</span>
        </div>
      </div>

      <div className="px-4 py-8 flex-grow space-y-1 overflow-y-auto font-['Inter']">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Management</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                isActive 
                  ? 'bg-emerald-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
        
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-8 mb-4">System</p>
        <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all">
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="p-4">
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-xl text-center">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Enterprise Console</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
