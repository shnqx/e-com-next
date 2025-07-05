'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Snackbar, Button, Typography, CircularProgress } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useAuth } from "@/app/api/auth/hooks/useAuth";
import { useRouter } from 'next/navigation';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const router = useRouter();

  const ECOMNEXT_CART_KEY = "ecomnext_cart";

  const productsFetch = async () => {
    try {

      const res = await fetch(`/api/products/${productId}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Ошибка загрузки товара');
      }

      const data: Product = await res.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      productsFetch();
    }
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
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, userId }),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: "Товар добавлен в корзину!" });
      } else {
        const errorData = await res.json();
        setSnackbar({ open: true, message: errorData.message || "Ошибка при добавлении в корзину" });
      }
    } else {
      router.push("/login")
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <img src={product.photo} alt={product.name} style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
      <Typography variant="h6">{product.price} руб</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Button
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        onClick={() => addToCart(product.id)}
      >
        Добавить в корзину
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
