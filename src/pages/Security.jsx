import React from 'react';
import { ShieldCheck, Lock, Key } from 'lucide-react';

const Security = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Security</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage access control and monitoring session security.</p>
        </div>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
          <ShieldCheck size={12} />
          <span>Verified Session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-slate-800 font-bold tracking-tight">
            <Lock size={20} className="text-slate-400" />
            <h3>JWT Access Token</h3>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 overflow-hidden">
            <code className="text-[10px] text-slate-500 break-all font-mono">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTY4NDUzMzkzfQ...
            </code>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-slate-800 font-bold tracking-tight">
            <Key size={20} className="text-slate-400" />
            <h3>Infrastructure Key</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your unique enterprise key is used to sign all outgoing requests from the management console to the API gateway.
          </p>
          <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-all uppercase tracking-widest">Rotate Secret Key</button>
        </div>
      </div>
    </div>
  );
};

export default Security;
