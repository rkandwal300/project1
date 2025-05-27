import React from 'react';
import { Box, Container, Grid, Link, Typography, Divider, IconButton, Stack } from '@mui/material';
import { bottomLinks, footerLinks, socialIcons } from './FooterData';
import FooterLinkItem from './FooterLinkItem';

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: '#121212', color: 'white', py: 6, width: '100%', flexShrink: 0 }}>
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Stack direction="row" spacing={2}>
          {socialIcons.map((item, index) => (
            <IconButton key={index} aria-label={item.label} sx={{ color: 'white' }}>
              {item.icon}
            </IconButton>
          ))}
        </Stack>
      </Box>

      <Grid container spacing={8}>
        {footerLinks.map((section, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              {section.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {section.links.map((link, i) => (
                <FooterLinkItem key={i}>{link}</FooterLinkItem>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4, bgcolor: '#333' }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        {bottomLinks.map((link, index) => (
          <Link key={index} href="#" variant="body2" color="#b8b8b8" sx={{
            '&:hover': { color: 'white', textDecoration: 'underline' },
            textDecoration: 'none'
          }}>
            {link}
          </Link>
        ))}
      </Box>

      <Typography variant="body2" color="#b8b8b8" align="center">
        © {new Date().getFullYear()} Advanced Micro Devices, Inc.
      </Typography>
    </Container>
  </Box>
);

export default Footer;