import { Box, LinearProgress } from "@mui/material";
import { SpinnerBox } from "../style/style";

const Spinner = () => {
  return (
    <>
      <LinearProgress />
      <SpinnerBox>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width="150"
            src="https://svgshare.com/i/ug5.svg"
            alt=""
            srcSet=""
          />
        </Box>
      </SpinnerBox>
    </>
  );
};

export default Spinner;
