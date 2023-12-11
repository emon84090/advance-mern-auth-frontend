import { Box, Button, Typography } from "@mui/material";
import { UpdateBox } from "../../style/style";
import { useContext, useEffect, useState } from "react";
import API from "../../utils/axios";
import { toast } from "react-toastify";
import { AuthContext } from "./Contextprovider";
const Verifyacount = () => {
  const [timer, setTimer] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getLink = async () => {
    setSpinner(true);

    try {
      const { data } = await API.post(`/auth/resendtoken`, {
        email: user?.email,
      });
      setSpinner(false);
      setTimer(60);
      toast.success(data?.message);
    } catch (err) {
      setSpinner(false);
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error);
      } else if (err?.response?.data) {
        toast.error(err?.response?.data);
      } else {
        toast.error(err?.message);
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UpdateBox
          boxShadow={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            textAlign="center"
            sx={{ my: 2 }}
            variant="h5"
            fontWeight="bold"
          >
            Please Verify Your Email
          </Typography>
          <Button disabled={spinner || timer !== 0} onClick={getLink}>
            {timer === 0 ? "Get Link" : `Get Link ( ${timer} s)`}
          </Button>
        </UpdateBox>
      </Box>
    </>
  );
};

export default Verifyacount;
