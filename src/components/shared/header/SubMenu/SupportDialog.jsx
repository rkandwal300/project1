import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { supportMailtoLink, supportMobileNumber } from '@/lib/constant';

export default function SupportDialog({ onClose }) {
  return (
     
        <Box
      sx={{
        position: 'relative',
        px: 3,
        py: 2,
      }}
    >
      {/* Close Button */}
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ mt: -4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Support
        </Typography>
        <Divider />

        {/* Hotline */}
        <Box mt={2} display="flex" alignItems="flex-start">
          <PhoneIcon sx={{ mr: 3, mt: 1 }} />
          <Box
            component="a"
            href={supportMobileNumber}
            color="primary.main"
            sx={{ textDecoration: 'none' }} 
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Hotline Number
            </Typography>
            <Typography
              variant="body2"
              fontSize="0.8rem"
              sx={{ textDecoration: 'none' }} 
            >
              +1 (502) 388-6228
            </Typography>
          </Box>
        </Box>

        {/* Email */}
        <Box mt={2} display="flex" alignItems="flex-start"  component="a" href={supportMailtoLink} color={'primary.main'}  sx={{ textDecoration: 'none' }} > 
          <EmailIcon sx={{ mr: 3, mt: 1 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" >
              Email
            </Typography>
            <Link
              href="mailto:dl.epycservices@amd.com"
              underline="hover"
              fontSize="0.8rem"
              sx={{textDecoration:"underline"}}
            >
              dl.epycservices@amd.com
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  
  );
}
