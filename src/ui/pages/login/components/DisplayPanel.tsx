import { Box, Typography } from "@mui/material";
import LoginDisplay from "../../../assets/login/LoginDisplay.svg";
const DisplayPanel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: "55%",
        height: "100%",
        background: "radial-gradient(at top left, #7B59E2, #3220E6)",
        boxSizing: "border-box",
        padding: "2rem",
      }}
    >
      <Box
        component={"img"}
        src={LoginDisplay}
        alt="Login Display"
        sx={{ width: "60%", height: "60%" }}
      />

      <Box sx={{ textAlign: "center", color: "white" }}>
        <Typography variant="h5"> Your library solution awaits.</Typography>
        <Typography>
          Simplifying Library Management, One book at a time.
        </Typography>
      </Box>
    </Box>
  );
};

export default DisplayPanel;
