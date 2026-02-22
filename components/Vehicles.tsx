import React, { useState } from 'react';
import { 
  Car, Plus, X, Shield, Activity, Zap, 
  Settings, Trash2, ChevronRight, AlertCircle,
  Truck, Gauge
} from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  status: 'Active' | 'Service' | 'Stored';
  value: string;
}

const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'v1', make: 'Tesla', model: 'Cybertruck Cyberbeast', year: '2024', vin: 'XXX-842-991', status: 'Active', value: '$120,000' },
  { id: 'v2', make: 'Lamborghini', model: 'Revuelto', year: '2024', vin: 'XXX-112-004', status: 'Stored', value: '$608,000' },
  { id: 'v3', make: 'Aston Martin', model: 'Valhalla', year: '2025', vin: 'XXX-007-SPECTRE', status: 'Service', value: '$800,000' },
];

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ make: '', model: '', year: '', vin: '', value: '' });

  const handleAdd = () => {
    if (!formData.make || !formData.model) return;
    const newV: Vehicle = {
      id: Math.random().toString(36).substr(2, 9),
      make: formData.make,
      model: formData.model,
      year: formData.year,
      vin: formData.vin,
      value: formData.value,
      status: 'Active'
    };
    setVehicles([...vehicles, newV]);
    setIsModalOpen(false);
    setFormData({ make: '', model: '', year: '', vin: '', value: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
        {/* Header Section */}
        <div className="terminal-panel p-10 rounded-[3rem] bg-gradient-to-br from-[var(--bg-panel)] to-blue-500/5 border-blue-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg">
                        <Car size={36} />
                    </div>
                    <div>
                        <h2 className="brand-font text-4xl font-black text-white uppercase tracking-tighter">Fleet <span className="gold-text">Matrix</span></h2>
                        <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mt-2">Manage physical & digital transport nodes</p>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                    <Plus size={18} /> Register Asset
                </button>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {vehicles.map(v => (
                <div key={v.id} className="terminal-panel p-8 rounded-[3rem] bg-[var(--text-primary)]/[0.01] border-white/5 hover:border-[var(--gold)]/30 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-[var(--gold)] uppercase tracking-widest">{v.make}</span>
                            <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{v.model}</h3>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-lg ${
                            v.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                            v.status === 'Service' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            'bg-blue-500/10 text-blue-500 border-blue-500/20'
                        }`}>
                            {v.status}
                        </div>
                    </div>
                    
                    <div className="space-y-4 mb-8 relative z-10">
                        <div className="flex justify-between py-3 border-b border-white/5 group-hover:border-white/10 transition-colors">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Model Year</span>
                            <span className="text-[11px] font-black text-white">{v.year}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-white/5 group-hover:border-white/10 transition-colors">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Asset ID (VIN)</span>
                            <span className="text-[11px] font-mono text-white/60 tracking-wider">{v.vin}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-white/5 group-hover:border-white/10 transition-colors">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Valuation</span>
                            <span className="text-[11px] font-black text-green-400">{v.value}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 relative z-10">
                        <button className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all text-white/60">Manage</button>
                        <button className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"><Trash2 size={18} /></button>
                    </div>
                    
                    <div className="absolute -bottom-10 -right-10 text-[var(--gold)] opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12 group-hover:scale-110 duration-700">
                        <Car size={200} />
                    </div>
                </div>
            ))}
            
            {/* Add New Placeholder Card */}
            <button onClick={() => setIsModalOpen(true)} className="terminal-panel p-8 rounded-[3rem] border-dashed border-white/10 bg-white/[0.005] hover:bg-white/[0.02] hover:border-[var(--gold)]/40 transition-all group flex flex-col items-center justify-center gap-6 min-h-[320px]">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[var(--gold)] group-hover:scale-110 transition-all shadow-xl">
                    <Plus size={32} />
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] group-hover:text-white transition-colors">Add Fleet Unit</span>
            </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 animate-fade-in">
                <div className="terminal-panel w-full max-w-xl p-12 rounded-[4rem] border-[var(--gold)]/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative bg-[#060b13]">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"><X size={20} /></button>
                    
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 mx-auto rounded-[2rem] bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] mb-6 border border-[var(--gold)]/20">
                            <Truck size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                            Initialize <span className="gold-text">Vehicle Node</span>
                        </h3>
                        <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.3em]">Enter Asset Parameters</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-3">Make</label>
                                <input value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-xs font-bold text-white focus:border-[var(--gold)]/50 focus:outline-none transition-all placeholder:text-white/20" placeholder="e.g. Tesla" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-3">Model</label>
                                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-xs font-bold text-white focus:border-[var(--gold)]/50 focus:outline-none transition-all placeholder:text-white/20" placeholder="e.g. Model X" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-3">Year</label>
                                <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-xs font-bold text-white focus:border-[var(--gold)]/50 focus:outline-none transition-all placeholder:text-white/20" placeholder="2024" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-3">Est. Value</label>
                                <input value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-xs font-bold text-white focus:border-[var(--gold)]/50 focus:outline-none transition-all placeholder:text-white/20" placeholder="$0.00" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-3">VIN / Asset ID</label>
                            <input value={formData.vin} onChange={e => setFormData({...formData, vin: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-xs font-bold text-white focus:border-[var(--gold)]/50 focus:outline-none transition-all placeholder:text-white/20" placeholder="Unique Identifier" />
                        </div>

                        <div className="pt-6">
                            <button onClick={handleAdd} className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-[var(--gold)] to-[#aa8a22] text-[#060b13] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                                Synchronize Node
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Vehicles;