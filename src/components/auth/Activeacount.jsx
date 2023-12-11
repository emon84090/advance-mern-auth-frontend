import { Box, Typography } from "@mui/material";
import { UpdateBox } from "../../style/style";
import { useEffect, useState } from "react";
import API from "../../utils/axios";
import { useParams } from "react-router-dom";
import Spinner from "../../utils/Spinner";
import { toast } from "react-toastify";

const Activeacount = () => {
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);

  const { token } = useParams();

  const getData = async () => {
    setSpinner(true);
    try {
      await API.patch(`/auth/activeacount/${token}`);
      setSpinner(false);
      setError(false);
    } catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error);
      } else if (err?.response?.data) {
        toast.error(err?.response?.data);
      } else {
        toast.error(err?.message);
      }
      setError(true);
      setSpinner(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {spinner && <Spinner></Spinner>}
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
            {error ? (
              <Typography variant="h5" color="red">
                Something Went Wrong Try Again
              </Typography>
            ) : (
              <Typography variant="h5" color="green">
                Acount verification Success
              </Typography>
            )}
          </Typography>
        </UpdateBox>
      </Box>
    </>
  );
};

export default Activeacount;
