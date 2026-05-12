import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  ChevronRight,
  Menu,
  Server
} from 'lucide-react';

const Topbar = () => {
  const location = useLocation();
  
  const titles = {
    '/dashboard': 'Overview',
    '/items': 'Inventory',
    '/users': 'Renter Base',
    '/rentals': 'Transaction Log',
    '/settings': 'Settings'
  };

  const currentTitle = titles[location.pathname] || 'Main Console';

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{currentTitle}</h2>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-sm font-semibold text-slate-900">Main Console</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search system..." 
            className="bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-xs w-64 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-2 pr-6 border-r border-slate-200 text-emerald-500">
           <Server size={18} />
           <span className="text-[10px] font-black uppercase tracking-widest">Network Online</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900">Enterprise Admin</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">System Access</p>
          </div>
          <div className="h-10 w-10 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-emerald-500">
            <i className="fa-solid fa-user-shield"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
