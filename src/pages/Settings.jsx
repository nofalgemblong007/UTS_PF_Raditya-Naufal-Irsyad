import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Configure your enterprise platform preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-xl text-xs font-bold text-slate-900 shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 transition-all">
          <Save size={16} />
          <span>Save Configuration</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Name</label>
            <input type="text" defaultValue="Eco-Share Enterprise" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support Email</label>
            <input type="email" defaultValue="infra@eco-share.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
