import { Container, TextField, Typography } from "@mui/material";
import { StyleButton, UpdateBox } from "../../style/style";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import API from "../../utils/axios";
import { AuthContext } from "./Contextprovider";

const Changepassword = () => {
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeFun = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const { cpassword, password } = e.target;
    if (password.value !== cpassword.value) {
      setSpinner(false);
      return toast.error("password not matched");
    }
    if (password.value.length < 5) {
      setSpinner(false);
      return toast.error("Password must be 5 letters");
    }
    const information = {
      email: user?.email,
      password: password.value,
    };
    try {
      await API.patch(`/auth/changepassword`, information);

      setSpinner(false);
      toast.success("password updated success");
      navigate("/");
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
      <Container sx={{ mt: 5 }}>
        <UpdateBox boxShadow="5">
          <form onSubmit={changeFun}>
            <Typography
              textAlign="center"
              sx={{ my: 2 }}
              variant="h5"
              fontWeight="bold"
            >
              Change Password
            </Typography>

            <TextField
              type="password"
              label="Enter New Password"
              sx={{ width: "100%", mt: 2 }}
              id="outlined-basic"
              name="password"
              variant="outlined"
              required
            />

            <TextField
              type="password"
              label="Confirm Password"
              sx={{ width: "100%", mt: 2 }}
              id="outlined-basic"
              name="cpassword"
              variant="outlined"
              required
            />

            <StyleButton
              disabled={spinner}
              type="submit"
              fullWidth
              sx={{ mt: 3 }}
            >
              {!spinner ? "Update Password" : "Loading..."}
            </StyleButton>
          </form>
        </UpdateBox>
      </Container>
    </>
  );
};

export default Changepassword;
