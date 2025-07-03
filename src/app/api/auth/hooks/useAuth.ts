'use client'
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function syncUser() {
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("userEmail");
      if (userId && email) {
        setUser({ id: Number(userId), email });
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return { user, loading };
}