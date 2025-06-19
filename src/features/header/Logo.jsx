import { Box } from '@mui/material'
import React from 'react'
import logo from '@/assets/logos/amd-header-logo.svg'

function Logo() {
  return (
      <Box
      component={'a'}
      href="/"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            id="header-logo-img"
            src={logo}
            alt="AMD Logo"
            style={{ width: "80px", cursor: "pointer" }}
          />
        </Box>
  )
}

export default Logo