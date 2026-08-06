
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Seazone Dashboard - Gerenciamento de Imóveis',
  description: 'Dashboard para proprietários gerenciarem suas propriedades de temporada',
  keywords: ['imóveis', 'aluguel', 'temporada', 'dashboard', 'seazone'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}