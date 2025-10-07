import React from 'react';
import {
    Backdrop,
    CircularProgress,
    Stack,
    useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';


/**
 * Enhanced loading fallback using MUI Backdrop for better UX
 * Provides full-screen loading overlay with smooth transitions
 */


const LoadingFallback = () => {
    const theme = useTheme();

    return (
        <Backdrop
            open
            sx={{
                zIndex: theme.zIndex.modal + 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.7),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress
                size={48}
                sx={{
                    color: theme.palette.primary.main,
                }}
            />
        </Backdrop>
    );
};

export default LoadingFallback;
