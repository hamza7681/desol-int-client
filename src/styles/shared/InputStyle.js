import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #c3c3c3",
    "&:focus": {
      outline: "none",
    },
  },
  "& .icon": {
    color: "#c3c3c3",
    position: "absolute",
    top: 39,
    right: 10,
  },
  "& .error": {
    color: "#d40412",
    fontSize: "12px",
    fontWeight: "600",
  },
}));
