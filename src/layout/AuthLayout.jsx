import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import authBackgroud from '../assets/auth/authScreen.mp4';

const AuthLayout = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Background Video */}
            <Box
                component="video"
                autoPlay
                loop
                muted
                playsInline
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            >
                <source src={authBackgroud} type="video/mp4" />
                Your browser does not support the video tag.
            </Box>


            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 0,
                }}
            />

            {/* Content Container - Scrollable */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    padding: { xs: 2, sm: 3, md: 4 },
                    minHeight: '100vh',
                    overflowY: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AuthLayout;