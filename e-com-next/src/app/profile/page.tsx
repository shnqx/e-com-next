'use client'
import { useAuth } from "@/app/api/auth/hooks/useAuth";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={2}>Профиль</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>ID: {user.id}</Typography>
    </Box>
  );
}