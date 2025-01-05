// import React from "react";
import { Box } from "@mui/material";

import DisplayPanel from "./components/DisplayPanel";
import LoginPanel from "./components/LoginPanel";
function LoginPage() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
      }}
    >
      <LoginPanel />
      <DisplayPanel />
    </Box>
  );
}

export default LoginPage;
