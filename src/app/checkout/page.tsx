
import { Suspense } from 'react';
import Checkout from '../../components/Checkout'

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Загрузка информации о заказе...</div>}>
      <Checkout />
    </Suspense>
  );
}
