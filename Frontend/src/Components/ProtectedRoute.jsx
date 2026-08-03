import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../Hooks/useUserStore';

export default function ProtectedRoute() {
    const { user } = useUserStore();

    if (!user || user.account_type !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
