"use client";

import { usePathname } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { motion, AnimatePresence } from "motion/react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLanding = pathname === "/";

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Header />
            <main className={`flex-grow ${isLanding ? "" : "pt-20"}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
