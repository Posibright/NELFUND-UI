import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tracks", href: "/#tracks" },
    { name: "Eligibility", href: "/#eligibility" },
    { name: "How to Apply", href: "/#how-it-works" },
    { name: "FAQ", href: "/#faq" },
  ];

  const isLanding = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isLanding
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-emerald-700 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200/50">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <div>
            <div className={`text-base font-bold tracking-tight leading-none ${isScrolled || !isLanding ? "text-neutral-900" : "text-white"}`}>
              NELFUND
            </div>
            <div className="text-[9px] text-emerald-500 font-bold tracking-widest uppercase mt-0.5">
              SKILL UP Pilot
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${isScrolled || !isLanding ? "text-neutral-600" : "text-white/80 hover:text-white"
                }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className={`text-sm font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${isScrolled || !isLanding ? "text-neutral-600 hover:bg-neutral-50" : "text-white/80 hover:text-white"
              }`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </Link>
          <Link href="/apply">
            <Button className="h-9 px-5 text-sm bg-emerald-700 hover:bg-emerald-600 text-white shadow-md shadow-emerald-900/20">
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled || !isLanding ? "text-neutral-700 hover:bg-neutral-100" : "text-white hover:bg-white/10"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-neutral-100 overflow-hidden shadow-xl"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 hover:text-emerald-700 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-neutral-100">
                <Link href="/apply" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-600">Apply Now</Button>
                </Link>
                <Link href="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
