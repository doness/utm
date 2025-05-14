import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'UTM Creator',
  description: 'Easily generate and track UTM links',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}