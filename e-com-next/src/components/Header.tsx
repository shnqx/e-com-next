'use client'
import { Tabs, Tab, Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header style={{ padding: "16px", borderBottom: "1px solid #eee" }}>
      <Box display="flex" alignItems="center">
        <Tabs value={false} style={{ minHeight: 0 }}>
          <Tab label="Главная" onClick={() => router.push("/")} />
          <Tab label="Товары" onClick={() => router.push("/catalog")} />
          <Tab label="Профиль" onClick={() => router.push("/profile")} />
        </Tabs>
        <Box flexGrow={1} />
        <Tabs value={false} style={{ minHeight: 0 }}>
          <Tab
            icon={<ShoppingCartIcon color="info" />}
            aria-label="cart"
            onClick={() => router.push("/cart")}
          />
        </Tabs>
      </Box>
    </header>
  );
}