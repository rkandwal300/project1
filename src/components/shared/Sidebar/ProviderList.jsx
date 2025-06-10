import React from "react";
import { Box, Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectorProviderData } from "@/redux/features/providerData/providerData.selector";

 
 

const ProviderDisplay  = () => {
    const providers = useSelector(selectorProviderData)
    console.log({providers})
    
  return (
    <Box sx={{ padding: 2 }}>
      {Object.entries(providers).map(([category, providerList]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ textTransform: "capitalize" }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {providerList.map((provider, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card variant="outlined" sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                  <Avatar
                    src={provider.logo}
                    alt={provider.label}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  >
                    {provider.label[0]}
                  </Avatar>
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="subtitle1">{provider.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ProviderDisplay;
