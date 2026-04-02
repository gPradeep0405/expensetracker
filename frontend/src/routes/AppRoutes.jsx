import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../components/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Expenses from '../pages/Expenses';
import Budgets from '../pages/Budgets';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="budgets" element={<Budgets />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
