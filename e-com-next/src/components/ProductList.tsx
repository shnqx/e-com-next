import Grid from "@mui/material/Grid";
import ProductItem from "./ProductItem";

// Временные данные для теста
const data = [
  { id: 1, name: "Товар 1", photo: "", description: "Описание 1", price: 1000 },
  { id: 2, name: "Товар 2", photo: "", description: "Описание 2", price: 2000 },
];

export default function ProductList() {
  return (
    <Grid marginTop="10px" container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ProductItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
}