import { Footer } from '@/app/(main)/footer';
import { Header } from '@/app/(main)/header';

export default function MailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        <Header />
        <div className="layout-screen">{children}</div>
        <Footer />
    </>)
}
