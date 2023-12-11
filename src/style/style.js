import { Box, Button, styled } from "@mui/material";

export const LoginButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.white}`,
}));

export const StyledFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-between",
  },
}));

export const Footerbg = styled(Box)(({ theme }) => ({
  background: `${theme.palette.primary.text}`,
  color: "white",
  padding: "10px 0px",
}));

export const StyleButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: 16,
  height: "47px",
  padding: "6px 12px",
  borderRadius: "10px",
  lineHeight: 1.5,
  color: `${theme.palette.primary.white}`,
}));

export const UpdateBox = styled(Box)(({ theme }) => ({
  maxWidth: "500px",
  borderRadius: 10,
  width: "100%",
  padding: "20px",
  margin: "auto",
  background: `${theme.palette.primary.white}`,
}));

export const SpinnerBox = styled(Box)(() => ({
  position: "fixed",
  width: "100%",
  height: "100%",
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
}));
