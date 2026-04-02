import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Home, CreditCard, LogOut, Target, Wallet } from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();

    const links = [
        { to: '/', icon: <Home size={22} />, label: 'Dashboard' },
        { to: '/expenses', icon: <CreditCard size={22} />, label: 'Transactions' },
        { to: '/budgets', icon: <Target size={22} />, label: 'Budgets' },
    ];

    return (
        <div className="flex flex-col w-72 h-screen px-6 py-8 bg-white border-r border-slate-100 relative z-20">
            {/* Logo area */}
            <div className="flex items-center gap-3 px-2 mb-12">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Wallet size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">SpendSmart</span>
            </div>

            <div className="flex flex-col justify-between flex-1">
                <nav className="space-y-2">
                    <div className="px-3 mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">Menu</div>
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                                    isActive 
                                    ? 'text-indigo-700 bg-indigo-50/80 font-semibold' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
                                }`
                            }
                        >
                            {/* Active Indicator Bar */}
                            {({ isActive }) => (
                                <>
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-md transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}></div>
                                    <div className={`mr-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'}`}>
                                        {link.icon}
                                    </div>
                                    <span>{link.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
                
                <div className="pt-6 border-t border-slate-100">
                    <button
                        onClick={() => dispatch(logout())}
                        className="flex items-center w-full px-4 py-3.5 text-slate-500 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors group"
                    >
                        <LogOut size={22} className="mr-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                        <span>Logout Account</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
