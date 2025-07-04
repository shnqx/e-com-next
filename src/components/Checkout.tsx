
"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";

export default function Checkout() { 
  const router = useRouter();
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalParam = searchParams.get('total');
    if (totalParam) {
      setTotal(parseFloat(totalParam));
    }
  }, [searchParams]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Оформление заказа</Typography>
      {total > 0 ? (
        <Typography variant="h6">Ваша общая сумма к оплате: {total} рублей</Typography>
      ) : (
        <Typography variant="body1">Сумма не найдена. Пожалуйста, вернитесь в корзину.</Typography>
      )}
      {/* интеграция с платежной системой */}
      <Button variant="contained" onClick={() => router.push('/cart')} style={{ marginTop: '20px' }}>
        Вернуться в корзину
      </Button>
    </div>
  );
}
