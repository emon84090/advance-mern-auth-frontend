import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contextprovider from "./components/auth/Contextprovider";
import { Route, Routes } from "react-router-dom";

import Login from "./components/auth/Login";

import Privateroute from "./components/auth/Privateroute";
import Navbar from "./components/Navbar/Navbar";
import Forgetpassword from "./components/auth/Forgetpassword";
import Changepassword from "./components/auth/Changepassword";
import Footer from "./components/Footer/Footer";
import Signup from "./components/auth/Signup";
import Activeacount from "./components/auth/Activeacount";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Contextprovider>
          <Navbar></Navbar>
          <CssBaseline />
          <Box sx={{ minHeight: "100vh" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Privateroute>
                    <h1>home</h1>
                  </Privateroute>
                }
              ></Route>

              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route
                path="/forgetpassword"
                element={<Forgetpassword></Forgetpassword>}
              ></Route>
              <Route
                path="/confirmacount/:token"
                element={<Activeacount></Activeacount>}
              ></Route>
              <Route
                path="/changepassword"
                element={
                  <Privateroute>
                    <Changepassword></Changepassword>
                  </Privateroute>
                }
              ></Route>
            </Routes>
          </Box>

          <Footer />
        </Contextprovider>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default App;
