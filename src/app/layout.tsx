import { poppins } from '@/utils/fonts';
import type { Metadata } from 'next';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'Masakjap',
    description: 'System for generate cooking ideas',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <PrimeReactProvider>
                <body className={poppins.className}>{children}</body>
            </PrimeReactProvider>
        </html>
    )
}
