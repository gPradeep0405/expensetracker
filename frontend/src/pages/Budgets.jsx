import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Target, AlertCircle } from 'lucide-react';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [formData, setFormData] = useState({ category: '', monthlyLimit: '', month: new Date().getMonth() + 1, year: new Date().getFullYear() });

    useEffect(() => { fetchBudgets(); }, []);

    const fetchBudgets = async () => {
        try {
            const res = await api.get(`/budgets?year=${formData.year}&month=${formData.month}`);
            setBudgets(res.data);
        } catch (err) { console.error(err); }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, month: parseInt(formData.month), year: parseInt(formData.year) };
            await api.post('/budgets', payload);
            fetchBudgets();
            setFormData({...formData, category: '', monthlyLimit: ''});
        } catch (err) { alert('Failed'); }
    };

    return (
        <div className="space-y-6 pb-8 animate-fade-in relative z-10 w-full max-w-5xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Monthly Budgets</h2>
                <p className="text-slate-500 mt-1">Set limits to maintain your financial health and save more.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Create Budget Section */}
                <div className="lg:col-span-5">
                    <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden border border-slate-200/60 shadow-lg shadow-indigo-100/20">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-2xl -z-10"></div>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                <Target size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Set Target</h3>
                        </div>

                        <form onSubmit={handleSave} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Category</label>
                                <input className="input-field" placeholder="e.g. Dining Out, Utilities" 
                                       value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Monthly Limit ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                                    <input className="input-field pl-8 font-semibold text-slate-800" type="number" step="0.01" placeholder="0.00"
                                           value={formData.monthlyLimit} onChange={e => setFormData({...formData, monthlyLimit: e.target.value})} required />
                                </div>
                            </div>
                            <button className="btn-primary w-full mt-2 py-3 text-base shadow-indigo-500/25">Save Budget Limit</button>
                        </form>
                    </div>
                </div>

                {/* Display Budgets Section */}
                <div className="lg:col-span-7">
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm animate-stagger-1 h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Active Budgets</h3>
                            <div className="flex bg-slate-100 rounded-lg p-1">
                                <button className="px-3 py-1 text-xs font-semibold bg-white shadow-sm rounded-md text-slate-800">This Month</button>
                                <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">Past</button>
                            </div>
                        </div>

                        {budgets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-indigo-200">
                                    <Target size={32} />
                                </div>
                                <h4 className="text-lg font-semibold text-slate-700">No active budgets</h4>
                                <p className="text-sm text-slate-500 mt-1 max-w-xs">Start by setting a limit for your most frequent spending categories.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {budgets.map(b => {
                                    // Mock progress - ideally fetched from actual spending
                                    const mockSpent = Math.random() * b.monthlyLimit * 0.8;
                                    const percent = Math.min((mockSpent / b.monthlyLimit) * 100, 100);
                                    let progressColor = "from-emerald-400 to-emerald-500";
                                    if (percent > 75) progressColor = "from-amber-400 to-amber-500";
                                    if (percent > 90) progressColor = "from-rose-500 to-rose-600";

                                    return (
                                        <div key={b.id} className="group pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-end mb-3">
                                                <div>
                                                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{b.category}</h4>
                                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                        <span className="text-slate-800 font-bold">${mockSpent.toFixed(2)}</span> spent of ${b.monthlyLimit.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-sm font-bold ${percent > 90 ? 'text-rose-600' : 'text-slate-700'}`}>
                                                        {percent.toFixed(0)}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                                                <div className={`h-full rounded-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out`} style={{width: `${percent}%`}}></div>
                                            </div>
                                            {percent > 90 && (
                                                <p className="text-xs text-rose-500 flex items-center gap-1 mt-2 font-medium">
                                                    <AlertCircle size={12} /> Approaching limit
                                                </p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Budgets;
