'use client'
import { Tabs, Tab, Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from "next/navigation";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled, useTheme } from '@mui/material/styles';
import { useThemeMode } from "@/context/ThemeContext";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const { toggleTheme, mode } = useThemeMode();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2, cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          E-COM NEXT
        </Typography>
        <Tabs value={false} textColor="inherit" indicatorColor="primary">
          <Tab label="Главная" onClick={() => router.push("/")} />
          <Tab label="Товары" onClick={() => router.push("/catalog")} />
          <Tab label="Профиль" onClick={() => router.push("/profile")} />
        </Tabs>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={mode === "dark"}
              onChange={toggleTheme}
            />
          }
          label=""
          sx={{ ml: 2 }}
        />
        <IconButton
          color="primary"
          onClick={() => router.push("/cart")}
          sx={{ ml: 1 }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}