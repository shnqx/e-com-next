'use client'
import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Snackbar } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "@/app/api/auth/hooks/useAuth";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
      router.push("/login")
    }
  };

  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => window.location.href = `/product/${item.id}`}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxWidth: 345,
          margin: 'auto',
        }}
      >
        {item.photo && (
          <CardMedia
            component="img"
            height="140"
            image={item.photo}
            alt={item.name}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              mb: 1,
              minHeight: '2.5em',
            }}
          >
            {item.description}
          </Typography>
          <Typography sx={{ mt: 1, mb: 1 }}>
            Цена: {item.price} руб.
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<AddShoppingCartIcon color="primary" />}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item.id);
              }}

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
    </div>
  );
}