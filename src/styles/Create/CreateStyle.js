import styled from "@mui/material/styles/styled";
import { Box } from "@mui/material";

export const CreateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& .number-pics": {},
    button: {
      padding: "7px 20px",
      border: "none",
      outline: "none",
      backgroundColor: "#0467b3",
      marginTop: "5px",
      color: "white",
      cursor: "pointer",
      width: "fit-content",
      height: "40px",
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "10px",
  },
}));

export const SelectBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "5px",
  },
  "& .error": {
    color: "#d40412",
    fontSize: "12px",
    fontWeight: "600",
  },

  [theme.breakpoints.down("md")]: {},
}));

export const ImageContainer = styled("label")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "120px",
  height: "120px",
  border: "1px solid #c3c3c3",
  borderRadius: "5px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {},
}));

export const ImagePreviewer = styled("label")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  img: {
    width: "120px",
    height: "120px",
  },
  [theme.breakpoints.down("md")]: {},
}));
