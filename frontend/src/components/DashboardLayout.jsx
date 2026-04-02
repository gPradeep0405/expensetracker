import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search } from 'lucide-react';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 font-['Outfit']">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Background decorative blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Top header */}
                <header className="flex items-center justify-between px-8 py-5 glass-panel border-b-0 shadow-sm z-20 sticky top-0">
                    <div className="flex items-center gap-4 text-slate-500 w-96">
                        <div className="relative w-full">
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search transactions, categories..." 
                                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white text-sm transition-all"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer group">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">Demo User</p>
                                <p className="text-xs text-slate-400">Personal Account</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm shadow-indigo-100 border border-indigo-200">
                                D
                            </div>
                        </div>
                    </div>
                </header>
                
                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 z-0">
                    <div className="max-w-7xl mx-auto animate-fade-in relative z-10 w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
