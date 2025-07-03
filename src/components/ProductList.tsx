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
      <Grid marginTop="10px" container spacing={2}>
        {products?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ProductItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}