import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";

interface Props {
  onSidebarOpen: () => void;
}

export const DashboardNavbar = (props: Props) => {
  const { onSidebarOpen, ...other } = props;
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        left: {
          lg: 280,
        },
        width: {
          lg: "calc(100% - 280px)",
        },
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        <Avatar
          sx={{
            height: 40,
            width: 40,
            ml: 1,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};
