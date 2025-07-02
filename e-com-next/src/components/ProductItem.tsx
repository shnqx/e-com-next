import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ItemProps {
  item: {
    photo: string;
    name: string;
    description: string;
    price: number;
    id: number;
  };
}

export default function ProductItem({ item }: ItemProps) {
  return (
    <Card>
      {item.photo && (
        <CardMedia
          component="img"
          height="140"
          image={item.photo}
          alt={item.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography sx={{ mt: 1, mb: 1 }}>
          Цена: {item.price} руб.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon color="primary" />}
          >
            В корзину
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}