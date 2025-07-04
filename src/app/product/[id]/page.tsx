'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // для Next.js 13+ app directory
import { Container, Snackbar, Button, Typography, CircularProgress } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useAuth } from "@/app/api/auth/hooks/useAuth";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string; // получаем id из маршрута
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  const ECOMNEXT_CART_KEY = "ecomnext_cart";

  const productsFetch = async () => {
    // Загружаем данные о продукте по id
    const res = await fetch(`/api/products/${productId}`, { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки товара');
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    productsFetch();
  }, [productId]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Продукт не найден</Typography>
      </Container>
    );
  }

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      {product.photo && (
        <img src={product.photo} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Цена: {product.price} руб.</Typography>
      <Button
        variant="outlined"
        startIcon={<AddShoppingCartIcon color="primary" />}
        onClick={(e) => {
          e.stopPropagation(); // чтобы клик по кнопке не вызвал переход
          addToCart(product.id);
        }}
      >
        В корзину
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Container>
  );
}