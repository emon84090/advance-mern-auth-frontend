import { Box, Container, TextField, Typography } from "@mui/material";
import { StyleButton, UpdateBox } from "../../style/style";
import { Person } from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import API from "../../utils/axios";
import { toast } from "react-toastify";
import { useContext, useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { AuthContext } from "./Contextprovider";

const Signup = () => {
  const [captcha, setCaptcha] = useState(false);

  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (value) => {
    setSpinner(true);

    const information = {
      name: value?.name,
      email: value?.email,
      password: value?.password,
    };
    try {
      const { data } = await API.post(`/auth/signup`, information);
      setSpinner(false);
      toast.success(data?.message);
      navigate("/login", { replace: true });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              textAlign="center"
              sx={{ my: 2 }}
              variant="h4"
              fontWeight="bold"
            >
              Signup
            </Typography>

            <TextField
              error={errors?.name}
              type="text"
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              helperText={
                (errors.name?.type === "required" && " Name required") ||
                (errors.name?.type === "minLength" && "Minimum 3 letters")
              }
              {...register("name", { required: true, minLength: 3 })}
            />

            <TextField
              error={errors?.email}
              type="email"
              sx={{ width: "100%", mt: 2 }}
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              name="email"
              helperText={
                errors.email?.type === "required" && " Email required"
              }
              {...register("email", { required: true })}
            />

            <TextField
              error={errors?.password}
              type="password"
              label="Password"
              sx={{ width: "100%", mt: 2 }}
              name="password"
              variant="outlined"
              helperText={
                (errors.password?.type === "required" &&
                  " Password required") ||
                (errors.password?.type === "minLength" && "Minimum 5 letters")
              }
              {...register("password", { required: true, minLength: 5 })}
            />

            <TextField
              error={errors?.cpassword}
              type="password"
              label="Confirm Password"
              sx={{ width: "100%", mt: 2 }}
              variant="outlined"
              helperText={
                (errors.cpassword?.type === "required" &&
                  "Confirm Password required") ||
                (errors?.cpassword?.message && "The passwords  not match")
              }
              {...register("cpassword", {
                required: true,
                validate: (value) =>
                  value === password.current || "The passwords  not match",
              })}
            />

            <Box sx={{ my: 2 }}>
              <ReCAPTCHA
                sitekey={`REACT_APP_GOOGLE_CAPTCHA`}
                onChange={onChange}
              />
            </Box>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Terms And Condition"
            />
            <StyleButton
              disabled={spinner}
              type="submit"
              startIcon={<Person></Person>}
              fullWidth
              sx={{ mt: 3 }}
            >
              {!spinner ? "Signup" : "Loading..."}
            </StyleButton>
            <Link to="/login">
              <Typography
                variant="body2"
                color="secondary"
                sx={{ textDecoration: "underline", cursor: "pointer", mt: 1 }}
              >
                Already Acount?
              </Typography>
            </Link>
          </form>
        </UpdateBox>
      </Container>
    </>
  );
};
export default Signup;
