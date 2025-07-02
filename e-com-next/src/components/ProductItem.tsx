'use client'
import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Snackbar } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "@/app/api/auth/hooks/useAuth";

interface ItemProps {
  item: {
    photo: string;
    name: string;
    description: string;
    price: number;
    id: number;
  };
}

const ECOMNEXT_CART_KEY = "ecomnext_cart";

export default function ProductItem({ item }: ItemProps) {
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const addToCart = async (id: number) => {
    const userId = user?.id;

    if (userId) {
      // Пользователь авторизован — пишем в базу через API
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, userId }),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: "Товар добавлен в корзину!" });
      } else {
        setSnackbar({ open: true, message: "Ошибка при добавлении в корзину" });
      }
    } else {
      // Гость — сохраняем в localStorage
      const cart = JSON.parse(localStorage.getItem(ECOMNEXT_CART_KEY) || "[]");
      if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem(ECOMNEXT_CART_KEY, JSON.stringify(cart));
        setSnackbar({ open: true, message: "Товар добавлен в корзину!" });
      } else {
        setSnackbar({ open: true, message: "Товар уже в корзине!" });
      }
    }
  };

  return (
    <Card>
      {item.photo && (
        <CardMedia
          component="img"
          height="140"
          image={item.photo}
          alt={item.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography sx={{ mt: 1, mb: 1 }}>
          Цена: {item.price} руб.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon color="primary" />}
            onClick={() => addToCart(item.id)}
          >
            В корзину
          </Button>
        </Box>
      </CardContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Card>
  );
}