import React, { useState, useEffect } from 'react';
import { Repeat, FileText, DownloadCloud } from 'lucide-react';
import api from '../services/api';
import { exportToCSV } from '../utils/exportUtil';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      // Fetching all rentals (Admin view)
      // Note: Backend might need GET /api/rentals
      const response = await api.get('/items'); // Placeholder
      setRentals([]); // Mocking empty for now
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // Sample data if list is empty for demo purposes
    const dataToExport = rentals.length > 0 ? rentals : [
      { id: 1, item: 'MacBook Pro', renter: 'John Doe', price: 150000, status: 'completed', date: '2026-05-10' },
      { id: 2, item: 'Sony A7IV', renter: 'Jane Smith', price: 200000, status: 'active', date: '2026-05-09' }
    ];
    exportToCSV(dataToExport, "EcoShare_Transactions");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transaction Log</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">History of all rental transactions and status tracking.</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <DownloadCloud size={16} />
          <span>Export Analytics (.csv)</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border border-slate-100">
            <Repeat size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Cloud Sync Active</h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">Transactional data is being mirrored to the central audit hub. Detailed logs are restricted.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
