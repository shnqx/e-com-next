'use client'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeModeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ThemeModeProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </ThemeModeProvider>
      </body>
    </html>
  );
}