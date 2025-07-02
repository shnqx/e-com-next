'use client'
import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!email || !password) {
      setMsg("Заполните все поля");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      setMsg("Вход выполнен!");
      setEmail("");
      setPassword("");
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userEmail", email);
      setTimeout(() => {
        window.location.href = "/catalog";
      }, 1000);
    } else {
      const data = await res.json();
      setMsg(data.error || "Ошибка входа");
    }
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #eee", borderRadius: 2 }}
    >
      <Typography variant="h5" mb={2}>Вход</Typography>
      {msg && <Alert severity={msg === "Вход выполнен!" ? "success" : "error"} sx={{ mb: 2 }}>{msg}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        Войти
      </Button>
      <Button sx={{ mt: 2 }} fullWidth variant="outlined" onClick={() => router.push('/register')}>Регистрация</Button>
    </Box>
  );
}