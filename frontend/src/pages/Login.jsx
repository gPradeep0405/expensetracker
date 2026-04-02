import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/authSlice';
import { authApi } from '../api/axios';
import { Wallet, ArrowRight, Activity } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await authApi.post('/login', formData);
            dispatch(loginSuccess({ user: { email: res.data.email, name: res.data.name, role: res.data.role }, token: res.data.token }));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-['Outfit']">
            {/* Left side pattern / hero */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900"></div>
                
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="relative z-10 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                        <Wallet className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SpendSmart</span>
                </div>
                
                <div className="relative z-10 mb-20 animate-fade-in">
                    <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                        Take control of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-indigo-200">your finances</span>
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-md font-light leading-relaxed">
                        The most advanced, beautifully designed personal finance tracker that helps you build wealth and visualize your spending journey.
                    </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-4 text-indigo-200 text-sm">
                    <Activity size={18} />
                    <span>Real-time Financial Analytics</span>
                </div>
            </div>

            {/* Right side login form */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-16 lg:px-24 xl:px-32 relative">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center gap-3 text-indigo-600 mb-12">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <Wallet size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SpendSmart</span>
                </div>

                <div className="w-full max-w-md mx-auto animate-fade-in">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-800 mb-3">Welcome back</h2>
                        <p className="text-slate-500">Sign in to your account to continue your financial journey.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-indigo-600">Email Address</label>
                            <input 
                                className="input-field"
                                type="email" placeholder="name@example.com" required 
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>
                        <div className="group">
                            <div className="flex items-center justify-between mb-1.5 ml-1">
                                <label className="block text-sm font-medium text-slate-700 transition-colors group-focus-within:text-indigo-600">Password</label>
                                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                            <input 
                                className="input-field" 
                                type="password" placeholder="••••••••" required 
                                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                            />
                        </div>
                        
                        <button type="submit" disabled={isLoading} className="btn-primary w-full mt-4 flex items-center justify-center gap-2 group">
                            {isLoading ? 'Signing In...' : 'Sign In'}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account? <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Create one now</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;
