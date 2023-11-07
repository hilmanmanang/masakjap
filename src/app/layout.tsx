import { GlobalContextProvider } from '@/providers/context/globalContext';
import NextAuthProviders from '@/providers/next-auth/sessionProvider';
import { poppins } from '@/utils/fonts';
import type { Metadata } from 'next';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { EdgeStoreProvider } from '@/providers/edgestore';

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
            <GlobalContextProvider>
                <NextAuthProviders>
                    <PrimeReactProvider>
                        <EdgeStoreProvider>
                            <body className={poppins.className}>
                                <ToastContainer
                                    position="top-center"
                                    autoClose={2000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover={false}
                                    theme="colored"
                                />
                                {children}
                            </body>
                        </EdgeStoreProvider>
                    </PrimeReactProvider>
                </NextAuthProviders>
            </GlobalContextProvider>
        </html>
    )
}
