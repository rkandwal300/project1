import React from 'react';
import { Box, CircularProgress, Typography, Paper, Fade, Container } from '@mui/material';

const LoadingPage = () => (
  <Fade in timeout={700}>
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            py: 6,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            boxShadow: 6,
            bgcolor: 'background.paper',
          }}
        >
          <CircularProgress size={56} color="primary" />
          <Typography
            variant="h5"
            component="div"
            sx={{ mt: 4, fontWeight: 'bold', color: 'text.primary' }}
          >
            Loading, please wait…
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'center', px: 2 }}
          >
            We’re getting things ready for you. This won’t take long.
          </Typography>
        </Paper>
      </Container>
    </Box>
  </Fade>
);

export default LoadingPage;
