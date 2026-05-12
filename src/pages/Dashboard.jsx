import React from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToCSV } from '../utils/exportUtil';
import { 
  Users, 
  Package, 
  Repeat, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, colorClass }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 transition-colors duration-300`}>
        <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
      </div>
      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold">
        <TrendingUp size={12} />
        {change}
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDownloadReport = () => {
    const reportData = [
      { metric: "Active Users", value: "24,800", status: "Stable" },
      { metric: "Inventory", value: "1,429", status: "Growing" },
      { metric: "Revenue", value: "Rp 142M", status: "Optimal" }
    ];
    exportToCSV(reportData, "EcoShare_System_Report");
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight italic">Eco-Share <span className="text-emerald-500">Analytics</span></h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Global statistics and platform performance metrics (Simulation Active).</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            Download Report
          </button>
          <button 
            onClick={() => navigate('/items')}
            className="px-4 py-2 bg-[#0F172A] rounded-xl text-xs font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95"
          >
            New Resource
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Users" value="1,284" change="+12.5%" icon={Users} colorClass="bg-blue-600" />
        <StatCard title="Inventory Count" value="856" change="+8.2%" icon={Package} colorClass="bg-emerald-600" />
        <StatCard title="Revenue Generated" value="Rp 142M" change="+24.1%" icon={Repeat} colorClass="bg-indigo-600" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Activity size={18} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-800 tracking-tight">Real-time Platform Activity</h3>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Details</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Owner</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'MacBook Pro M2', user: 'Admin One', status: 'In Service', val: '98%' },
                { name: 'Dell XPS 15', user: 'User 102', status: 'Available', val: '84%' },
                { name: 'Sony Alpha A7 IV', user: 'Admin Two', status: 'Maintenance', val: '12%' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <Package size={20} />
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500 font-medium">{row.user}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 
                      row.status === 'Maintenance' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: row.val }} />
                      </div>
                      <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
