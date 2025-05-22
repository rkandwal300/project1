import { Box } from '@mui/material'
import React from 'react'

function Logo() {
  return (
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            id="header-logo-img"
            src="/amd-header-logo.svg"
            alt="AMD Logo"
            style={{ width: "80px", cursor: "pointer" }}
          />
        </Box>
  )
}

export default Logo