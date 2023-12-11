import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Person2 } from "@mui/icons-material";
import { LoginButton } from "../../style/style";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Contextprovider";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { Colors } from "../../theme/theme";

const settings = ["Dashboard"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { setUser, user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Are You Sure Want to Logout?")) {
      setUser(null);
      localStorage.removeItem("auth_token");
      navigate("/");
      toast.success("Logout Success");
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/"> LOGO</Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {user && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/changepassword">
                      {" "}
                      <Typography textAlign="center">
                        Change Password
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/"> LOGO</Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <>
                {user && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Link to={"/changepassword"}>Change Password</Link>
                    </Button>
                  </>
                )}
              </>
            </Box>
            {user ? (
              <>
                <Box sx={{ flexGrow: 0, display: "flex" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        sx={{ bgcolor: "white", color: Colors.textcolor }}
                        alt="Remy Sharp"
                        src=""
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link to={"/admin"}>
                          <Typography textAlign="center">{setting}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                  <Box>
                    <LoginButton
                      onClick={logOut}
                      sx={{ ml: 4 }}
                      startIcon={<LogoutIcon />}
                    >
                      LogOut
                    </LoginButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <LoginButton
                  onClick={() => navigate("/login")}
                  startIcon={<Person2 />}
                >
                  Login
                </LoginButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
