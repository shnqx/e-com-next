import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  return (
    <footer
      style={{
        padding: "16px",
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: "auto",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: "60px",
      }}
    >
      © {new Date().getFullYear()} e-com-next
    </footer>
  );
}