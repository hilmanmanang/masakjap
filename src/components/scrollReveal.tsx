"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";
import "../app/globals.css"

export const ScrollReveal = ({ children, delay }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="scroll-animate-container"
            style={{
                transform: isInView ? "none" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.5s ${delay ? delay : '0s'}`,
            }}
        >
            {children}
        </div>
    )
}