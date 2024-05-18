import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme.js";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon  from "@mui/icons-material/NotificationsOutlined";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SearchIcon from "@mui/icons-material/Search";
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>

      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <Link to="/faq" style={{ textDecoration: 'none' }}>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
        <IconButton>
          <ManageAccountsOutlinedIcon />
        </IconButton>
        </Link>
        <Link to="/settings" style={{ textDecoration: 'none' }}>
        <IconButton>
          <RoomPreferencesOutlinedIcon />
        </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Topbar;
