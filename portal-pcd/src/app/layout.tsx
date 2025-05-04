import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "Portal PCD",
  description: "Portal PCD - Acessibilidade e Inclusão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
