import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Alejandrums | Salas de Ensayo',
    description: 'Salas de ensayo profesionales con equipamiento de primera.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={outfit.className}>
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    )
}
