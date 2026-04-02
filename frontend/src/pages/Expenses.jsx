import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Search, Filter, Calendar, Edit2, Trash2, X } from 'lucide-react';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ amount: '', notes: '', category: '', expenseDate: '' });
    
    // Filters
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, [filterCategory, filterStartDate, filterEndDate]);

    const fetchExpenses = async () => {
        try {
            let url = '/expenses?size=100';
            if (filterCategory) url += `&category=${filterCategory}`;
            if (filterStartDate && filterEndDate) url += `&startDate=${filterStartDate}&endDate=${filterEndDate}`;
            
            const res = await api.get(url);
            setExpenses(res.data.content);
        } catch (err) {
            console.error('Failed to fetch expenses');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/expenses/${editingId}`, formData);
            } else {
                await api.post('/expenses', formData);
            }
            setShowModal(false);
            fetchExpenses();
            resetForm();
        } catch (err) {
            alert('Failed to save expense');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this expense?')) return;
        try {
            await api.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (err) { alert('Failed to delete expense'); }
    };

    const editExpense = (exp) => {
        setFormData({ amount: exp.amount, notes: exp.notes || '', category: exp.category, expenseDate: exp.expenseDate });
        setEditingId(exp.id);
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({ amount: '', notes: '', category: '', expenseDate: '' });
        setEditingId(null);
    };

    const handleOpenModal = () => {
        resetForm();
        setShowModal(true);
    };

    return (
        <div className="space-y-6 pb-8 animate-fade-in relative z-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Transactions</h2>
                    <p className="text-slate-500 mt-1">Manage and track your daily expenses seamlessly.</p>
                </div>
                <button onClick={handleOpenModal} className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    <Plus size={18} /> New Transaction
                </button>
            </div>

            {/* Filters Section */}
            <div className="glass-card p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-end animate-stagger-1 border border-slate-200/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
                
                <div className="flex-1 w-full relative">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Filter by Category</label>
                    <div className="relative">
                        <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="e.g. Food, Rent..." className="input-field pl-10" 
                               value={filterCategory} onChange={e => setFilterCategory(e.target.value)} />
                    </div>
                </div>
                <div className="flex-1 w-full relative">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">From Date</label>
                    <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="date" className="input-field pl-10 text-slate-600" 
                               value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} />
                    </div>
                </div>
                <div className="flex-1 w-full relative">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">To Date</label>
                    <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="date" className="input-field pl-10 text-slate-600" 
                               value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} />
                    </div>
                </div>
                <button onClick={() => {setFilterCategory(''); setFilterStartDate(''); setFilterEndDate('');}} 
                        className="btn-secondary whitespace-nowrap mt-4 md:mt-0 h-[50px]">
                    Clear Filters
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-stagger-2">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {expenses.map((exp) => (
                                <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-600">{exp.expenseDate}</td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                                            {exp.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-slate-500 max-w-xs truncate">{exp.notes || <span className="text-slate-300 italic">No notes</span>}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-800">${exp.amount.toFixed(2)}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => editExpense(exp)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(exp.id)} className="text-rose-600 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 p-2 rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {expenses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                <Search size={24} className="text-slate-300" />
                                            </div>
                                            <p className="text-lg font-medium text-slate-600">No transactions found</p>
                                            <p className="text-sm mt-1 text-slate-400">Try adjusting your filters or add a new expense.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-100">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{editingId ? 'Edit Transaction' : 'New Transaction'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-200 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Amount ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                                    <input type="number" step="0.01" required className="input-field pl-8 font-semibold text-slate-800 text-lg" 
                                           value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Category</label>
                                <input type="text" required className="input-field" placeholder="e.g. Groceries, Utilities..."
                                       value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Date</label>
                                <input type="date" required className="input-field text-slate-600" 
                                       value={formData.expenseDate} onChange={e => setFormData({...formData, expenseDate: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Notes (Optional)</label>
                                <textarea className="input-field min-h-[100px] resize-none" placeholder="Add some details about this expense..."
                                       value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                                <button type="submit" className="btn-primary flex-1 shadow-indigo-500/25">{editingId ? 'Save Changes' : 'Add Transaction'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Expenses;
