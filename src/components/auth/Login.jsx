import { Box, Container, TextField, Typography, Stack } from "@mui/material";
import { StyleButton, UpdateBox } from "../../style/style";
import { Person } from "@mui/icons-material";

import API from "../../utils/axios";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Contextprovider";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import moment from "moment/moment";

const Login = () => {
  const [captcha, setCaptcha] = useState(false);
  const [attempts, setAttempts] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginFun = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const { email, password } = e.target;

    const information = {
      email: email.value,
      password: password.value,
    };
    try {
      const { data } = await API.post(`/auth/login`, information);
      localStorage.setItem("auth_token", data.token);
      setUser(data?.data);
      setSpinner(false);
      setCaptcha(false);
      navigate("/", { replace: true });
    } catch (err) {
      setSpinner(false);
      setCaptcha(false);
      if (err?.response.status === 423) {
        return toast.error(
          `Your Acount Locked For ${moment(err?.response?.data?.time).format(
            "LLL"
          )} this time`
        );
      }
      if (err?.response?.data?.message) {
        setAttempts(err.response?.data?.attempts);
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (user) {
      return navigate("/");
    }
  }, [user]);

  function onChange() {
    setCaptcha(true);
  }
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <UpdateBox boxShadow="5">
          <form onSubmit={loginFun}>
            <Typography
              textAlign="center"
              sx={{ my: 2 }}
              variant="h4"
              fontWeight="bold"
            >
              Login
            </Typography>

            <TextField
              type="email"
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              name="email"
              required
            />

            <TextField
              type="password"
              label="Enter Password"
              sx={{ width: "100%", mt: 2 }}
              name="password"
              variant="outlined"
              required
            />

            <Box sx={{ my: 2 }}>
              <ReCAPTCHA
                sitekey={`${import.meta.env.VITE_API_GCAPTCHA}`}
                onChange={onChange}
              />
            </Box>
            {!spinner && attempts && (
              <Typography variant="body2" color="red">
                Incorrect password,Please retry or click Forgot Password? to
                reset.You have {4 - attempts} more chance left, After{" "}
                {4 - attempts} chance your acount will be lock for 2 hours
              </Typography>
            )}

            <StyleButton
              disabled={spinner || !captcha}
              type="submit"
              startIcon={<Person></Person>}
              fullWidth
              sx={{ mt: 3 }}
            >
              {!spinner ? "Login" : "Loading..."}
            </StyleButton>
            <Stack justifyContent="space-between" direction="row">
              <Link to="/forgetpassword">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ textDecoration: "underline", cursor: "pointer", mt: 1 }}
                >
                  Forget Password?
                </Typography>
              </Link>
              <Link to="/signup">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ textDecoration: "underline", cursor: "pointer", mt: 1 }}
                >
                  Create Acount?
                </Typography>
              </Link>
            </Stack>
          </form>
        </UpdateBox>
      </Container>
    </>
  );
};
export default Login;
