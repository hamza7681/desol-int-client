import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
  "& .login-container": {
    width: "500px",
    padding: "20px",
    border: "1px solid #c3c3c3",
    boxShadow: "10px 10px 21px -14px rgba(0,0,0,0.75)",
    h2: {
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      button: {
        padding: "7px",
        border: "none",
        outline: "none",
        backgroundColor: "#0467b3",
        marginTop: "5px",
        color: "white",
        cursor: "pointer",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .login-container": {
      width: "95%",
      padding: "10px",
    },
  },
}));
