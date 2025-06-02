import { Box } from "@mui/material";
import React from "react";
import Footer from "../Footer/Footer/Footer";
import InstanceAdviceBottomBar from "./InstanceAdviceBottomBar";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";
import InstanceAdviceHeader from "./InstanceAdviceHeader";

function InstanceAdviceLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box display={"flex"} minHeight={"100vh"} flexDirection={"column"}>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-start",
            mt: 8,
            p: 0,
          }}
        >
          <Sidebar />
          <Box
            sx={{
              flex: 1,
              p: 0,
              overflowY: "auto",
              bgcolor: "error.contrastText",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                padding: 2,
              }}
            >
              <InstanceAdviceHeader />
            </Box>
          </Box>
        </Box>
        <InstanceAdviceBottomBar />
      </Box>
      <Footer />
    </Box>
  );
}

export default InstanceAdviceLayout;
