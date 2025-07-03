'use client'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Main() {

  const router = useRouter();

  return (
    <>
      <Button variant="outlined" onClick={() => router.push("/catalog")} >Товары</Button>
    </>
  );
}