'use client'
import { Grid, Box } from "@mui/material";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";

type Product = {
  photo: string;
  name: string;
  description: string;
  price: number;
  id: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <Box>
      <Grid container spacing={2} margin="10px">
        {products?.map((item) => (
          // <Grid item key={item.id}>
            <ProductItem key={item.id} item={item} />
          // </Grid>
        ))}
      </Grid>
    </Box>
  );
}