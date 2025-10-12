import React from 'react';
import Backdrop from '../template/Backdrop';
import CircularProgress from '../template/CircularProgress'; 
import useTheme from '../template/useTheme' ;
import alpha from '../template/Alpha';

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
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingFallback;
