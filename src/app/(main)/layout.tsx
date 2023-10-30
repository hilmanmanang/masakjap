import { Footer } from './footer';
import { Header } from './header';

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
