
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

function PublicLayout() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" replace />
    }
    return (
        <Outlet />
    )
}

export default PublicLayout