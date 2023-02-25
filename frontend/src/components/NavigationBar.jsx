import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useAuth } from "../context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";

const pages = [
  { displayName: "Dashboard", routeName: "/dashboard" },
  { displayName: "Event Resolver", routeName: "/event-resolver" },
];
const authPages = ["Register", "Login"];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { loggedUser, login, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      //await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsSoccerIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Betting App
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
              {pages.map((page) => (
                <MenuItem key={page.routeName} onClick={handleCloseNavMenu}>
                  <Link to={page.routeName}>
                    <Typography textAlign="center" color={"black"}>
                      {page.displayName}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/login"}>
                  <Typography textAlign="center" color={"black"}>
                    Login
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/register"}>
                  <Typography textAlign="center" color={"black"}>
                    Register
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <SportsSoccerIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            Betting App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.routeName} key={page.routeName}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.displayName}
                </Button>
              </Link>
            ))}
            {loggedUser && (
              <>
                <Link to={"/login"}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Box>

          {loggedUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PersonIcon />
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={`/profile/${loggedUser.userUid}`}>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "#000000",
                      }}
                    >
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={`/ticket-overview/${loggedUser.userUid}`}>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "#000000",
                      }}
                    >
                      My Tickets
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
