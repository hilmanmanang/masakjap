"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const NextAuthProviders = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProviders;