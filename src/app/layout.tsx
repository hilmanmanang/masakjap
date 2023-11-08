import { GlobalContextProvider } from '@/providers/context/globalContext';
import { EdgeStoreProvider } from '@/providers/edgestore';
import NextAuthProviders from '@/providers/next-auth/sessionProvider';
import { poppins } from '@/utils/fonts';
import type { Metadata } from 'next';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <NextAuthProviders>
                <GlobalContextProvider>
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
                </GlobalContextProvider>
            </NextAuthProviders>
        </html>
    )
}
