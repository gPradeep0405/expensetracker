import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/authSlice';
import { authApi } from '../api/axios';
import { Wallet, ArrowRight, UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await authApi.post('/register', formData);
            dispatch(loginSuccess({ user: { email: res.data.email, name: res.data.name, role: res.data.role }, token: res.data.token }));
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            const message = err.response?.data?.error || 
                            err.response?.data?.message || 
                            (err.request ? 'Server is not responding. Please ensure the backend is running.' : 'Registration failed');
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-['Outfit']">
            {/* Left side pattern / hero */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950"></div>
                
                {/* Abstract shapes */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3"></div>

                <div className="relative z-10 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
                        <Wallet className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SpendSmart</span>
                </div>
                
                <div className="relative z-10 mb-20 animate-fade-in text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                        Join the future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">smart tracking</span>
                    </h1>
                    <p className="text-slate-300 text-lg max-w-md font-light leading-relaxed">
                        Create your free account today and unlock a beautiful, insightful way to manage your personal finances.
                    </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-4 text-slate-400 text-sm border-t border-white/10 pt-6">
                    <UserPlus size={18} />
                    <span>Takes less than a minute</span>
                </div>
            </div>

            {/* Right side register form */}
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
                        <h2 className="text-3xl font-bold text-slate-800 mb-3">Create Account</h2>
                        <p className="text-slate-500">Enter your details to register for a new SpendSmart account.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 text-rose-600 text-sm font-medium border border-red-100 flex items-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-indigo-600">Full Name</label>
                            <input 
                                className="input-field"
                                type="text" placeholder="John Doe" required 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-indigo-600">Email Address</label>
                            <input 
                                className="input-field"
                                type="email" placeholder="name@example.com" required 
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1 transition-colors group-focus-within:text-indigo-600">Password</label>
                            <input 
                                className="input-field" 
                                type="password" placeholder="Create a strong password" required minLength="6"
                                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                            />
                        </div>
                        
                        <button type="submit" disabled={isLoading} className="btn-primary bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 shadow-slate-500/30 w-full mt-6 flex items-center justify-center gap-2 group">
                            {isLoading ? 'Creating Account...' : 'Sign Up Now'}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already have an account? <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Sign in here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Register;
