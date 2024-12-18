import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import {
  FitnessCenter,
  AccountCircle,
  Notifications,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";

const navData = [
  { path: "/", title: "Dashboard", icon: <FitnessCenter /> },
  { path: "/workouts", title: "Workouts", icon: <FitnessCenter /> },
  { path: "/nutrition", title: "Nutrition", icon: <FitnessCenter /> },
  { path: "/profile", title: "Profile", icon: <AccountCircle /> },
];

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Fitness Dashboard
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        open={navOpen}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {navData.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton href={item.path}>
                <Box sx={{ marginRight: 2 }}>{item.icon}</Box>
                {item.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
