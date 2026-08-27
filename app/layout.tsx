import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Socios N&N - Vehículos usados en Medellín',
  description: 'Los mejores vehículos usados de Medellín.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
