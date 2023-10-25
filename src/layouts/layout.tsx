import { Header } from "./header"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen">
            <Header />
            <div className="pt-[7.5rem] w-full">{children}</div>
        </div>
    )
}
