import { useState, useEffect } from 'react';
import api from '../api/axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Activity } from 'lucide-react';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({ totalSpent: 0, budgetRemaining: 0, topCategory: 'N/A' });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get('/expenses?size=100');
            const data = res.data.content;
            setExpenses(data);
            
            let total = 0;
            const catMap = {};
            data.forEach(e => {
                total += e.amount;
                catMap[e.category] = (catMap[e.category] || 0) + e.amount;
            });
            
            let topCat = 'N/A';
            let maxAmt = 0;
            for (const [cat, amt] of Object.entries(catMap)) {
                if (amt > maxAmt) { maxAmt = amt; topCat = cat; }
            }
            
            setSummary({ totalSpent: total, budgetRemaining: 5000 - total, topCategory: topCat });
        } catch (err) {
            console.error('Error fetching dashboard data', err);
        }
    };

    const chartData = expenses.map(e => ({
        date: e.expenseDate.substring(5),
        amount: e.amount
    })).sort((a,b) => a.date.localeCompare(b.date));

    // Custom Tooltip for Recharts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-panel p-3 rounded-xl shadow-lg border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
                    <p className="text-sm font-bold text-indigo-600">${payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Overview</h2>
                    <p className="text-slate-500 mt-1">Track your spending and manage your budgets effortlessly.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                    <Activity size={16} className="text-indigo-500" />
                    <span>Real-time sync</span>
                </div>
            </div>
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Spent Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                            <DollarSign size={24} />
                        </div>
                        <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                            <ArrowUpRight size={14} className="mr-1" /> +2.4%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Total Spent This Month</h3>
                        <p className="text-4xl font-bold tracking-tight text-slate-800">${summary.totalSpent.toFixed(2)}</p>
                    </div>
                </div>

                {/* Budget Remaining Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
                            <TrendingUp size={24} />
                        </div>
                        <span className={`flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm ${summary.budgetRemaining < 0 ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-slate-600 bg-slate-50 border-slate-200'}`}>
                            {summary.budgetRemaining < 0 ? 'Over Budget' : 'On Track'}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Estimated Budget Remaining</h3>
                        <p className={`text-4xl font-bold tracking-tight ${summary.budgetRemaining < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                            ${summary.budgetRemaining.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Top Category Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-fuchsia-100 flex items-center justify-center text-fuchsia-600 shadow-inner">
                            <CreditCard size={24} />
                        </div>
                        <span className="flex items-center text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 shadow-sm">
                            <ArrowDownRight size={14} className="mr-1" /> Target
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Top Spending Category</h3>
                        <p className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-indigo-600 truncate pb-1">
                            {summary.topCategory}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Chart Area */}
            <div className="bg-white rounded-3xl p-6 md:p-8 animate-stagger-1 border border-slate-100 shadow-lg shadow-indigo-100/20">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Spending Analytics</h3>
                        <p className="text-sm text-slate-500 mt-1">Your daily expenditure trend for the current period</p>
                    </div>
                    <select className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-sm rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 block p-2.5 outline-none cursor-pointer transition-colors">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Last 3 Months</option>
                    </select>
                </div>
                
                <div className="h-[350px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="date" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} 
                                dy={15}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} 
                                dx={-10}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area 
                                type="monotone" 
                                dataKey="amount" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorAmount)" 
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
