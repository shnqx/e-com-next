'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/app/api/auth/hooks/useAuth";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: number;
  photo?: string;
  quantity?: number; // для авторизованных
}

const CART_KEY = "ecomnext_cart";

export default function Cart() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    async function fetchCart() {
      if (user) {
        // Получаем корзину из базы для авторизованного пользователя
        const res = await fetch(`/api/cart?userId=${user.id}`);
        const data = await res.json();
        // Ожидается, что API вернет массив с полем quantity
        setProducts(data.products || []);
        // Собираем объект количеств
        const qty: { [id: number]: number } = {};
        (data.products || []).forEach((p: any) => {
          qty[p.id] = p.quantity || 1;
        });
        setQuantities(qty);
      } else {
        // Для гостя — из localStorage с безопасным парсингом
        const raw = localStorage.getItem(CART_KEY);
        let cart: number[] = [];
        try {
          cart = raw && raw !== "" ? JSON.parse(raw) : [];
        } catch {
          cart = [];
        }
        if (cart.length === 0) {
          setProducts([]);
          setQuantities({});
          return;
        }
        const res = await fetch(`/api/products`);
        const allProducts: Product[] = await res.json();
        // Считаем количество каждого товара
        const qty: { [id: number]: number } = {};
        cart.forEach((id) => {
          qty[id] = (qty[id] || 0) + 1;
        });
        setQuantities(qty);
        // Оставляем только уникальные товары, которые есть в корзине
        setProducts(allProducts.filter(p => cart.includes(p.id)));
      }
    }
    fetchCart();
  }, [user]);

  if (products.length === 0) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Корзина пуста</Typography>;
  }

  const total = products.reduce((sum, p) => sum + Number(p.price) * (quantities[p.id] || 1), 0);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={2}>Корзина</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Кол-во</TableCell>
              <TableCell>Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, idx) => (
              <TableRow key={`${item.id}-${idx}`}>
                <TableCell>
                  {item.photo && (
                    <img src={item.photo} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
                  )}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price} руб.</TableCell>
                <TableCell>{quantities[item.id] || 1}</TableCell>
                <TableCell>{Number(item.price) * (quantities[item.id] || 1)} руб.</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align="right"><b>Итого:</b></TableCell>
              <TableCell><b>{total} руб.</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}