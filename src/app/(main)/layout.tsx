import Layout from '@/layouts/layout';

export default function MailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Layout>{children}</Layout>
    )
}
