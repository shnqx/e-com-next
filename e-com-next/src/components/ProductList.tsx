'use client'
import { Grid, Box } from "@mui/material";
import ProductItem from "./ProductItem";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// Временные данные для теста
const data = [
  { id: 1, name: "Товар 1", photo: "", description: "Описание 1", price: 1000 },
  { id: 2, name: "Товар 2", photo: "", description: "Описание 2", price: 2000 },
  { id: 3, name: "Товар 3", photo: "", description: "Описание 3", price: 1000 },
  { id: 4, name: "Товар 4", photo: "", description: "Описание 4", price: 2000 },
  { id: 5, name: "Товар 5", photo: "", description: "Описание 5", price: 1000 },
  { id: 6, name: "Товар 6", photo: "", description: "Описание 6", price: 2000 },
  { id: 7, name: "Товар 5", photo: "", description: "Описание 7", price: 1000 },
  { id: 8, name: "Товар 6", photo: "", description: "Описание 8", price: 2000 },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ProductList() {
  return (
    <Box>
      <Grid marginTop="10px" container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ProductItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}