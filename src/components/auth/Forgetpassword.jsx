import {
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { StyleButton, UpdateBox } from "../../style/style";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Forgetpassword = () => {
  const [timer, setTimer] = useState(0);
  const [email, setEmail] = useState("");
  const [resetSpinner, setrSpinnnner] = useState(false);
  const [forgetSpinner, setfSpinnnner] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const sendmail = async () => {
    setfSpinnnner(true);
    if (!email) {
      setfSpinnnner(false);
      return toast.error("Enter valid Email");
    }
    try {
      const data = await API.post(`/auth/forgetpassword?email=${email}`);
      console.log(data);
      setTimer(60);
      setfSpinnnner(false);
      toast.success(`OTP send success in your ${email}`);
    } catch (err) {
      setfSpinnnner(false);
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

  const handleReset = async (e) => {
    e.preventDefault();
    setrSpinnnner(true);
    const token = e.target.token.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;

    if (password !== cpassword) {
      setrSpinnnner(false);
      return toast.error("Password Not Matched");
    }
    if (password.length < 5) {
      setrSpinnnner(false);
      return toast.error("Password must be 5 letters");
    }

    try {
      const data = await API.patch(`/auth/resetpassword?token=${token}`, {
        password: password,
      });

      setrSpinnnner(false);
      toast.success("password updated success");
      navigate("/login");
    } catch (err) {
      setrSpinnnner(false);
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
      <Container sx={{ mt: 5 }}>
        <UpdateBox boxShadow="5">
          <form onSubmit={handleReset}>
            <Typography
              textAlign="center"
              sx={{ my: 2 }}
              variant="h5"
              fontWeight="bold"
            >
              Reset Password
            </Typography>

            <Box mt={1}>
              <Stack spacing={2} mt={2}>
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Email
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          disabled={forgetSpinner || timer !== 0}
                          onClick={sendmail}
                          size="small"
                          variant="contained"
                        >
                          {timer === 0 ? "Get Otp" : `${timer}s`}
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="OTP"
                  variant="filled"
                  required
                  name="token"
                />
                <TextField
                  id="outlined-basic"
                  label="Enter Password"
                  variant="filled"
                  required
                  name="password"
                />
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="filled"
                  required
                  name="cpassword"
                />

                <StyleButton
                  disabled={resetSpinner}
                  type="submit"
                  sx={{ width: "100px" }}
                  size="large"
                  variant="contained"
                >
                  Reset
                </StyleButton>
              </Stack>
            </Box>
          </form>
        </UpdateBox>
      </Container>
    </>
  );
};

export default Forgetpassword;
