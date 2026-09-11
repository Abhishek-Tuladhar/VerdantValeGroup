import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    Home,
    Info,
    Layers,
    Menu,
    X,
    ArrowUpRight,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useActiveSector } from "../../context/ActiveSectorContext";
import logo from "../../assets/Images/logo.png";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    {
        label: "Home",
        href: "#home",
        icon: Home,
        description: "Back to the beginning",
    },
    {
        label: "About",
        href: "#about",
        icon: Info,
        description: "Discover who we are",
    },
    {
        label: "Current Sectors",
        href: "#sectors",
        icon: Layers,
        description: "See where we're active",
    },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHref, setActiveHref] = useState("#home");

    const { activeSector } = useActiveSector();

    /* ---------------------------------------------------------------- */
    /* Scroll shadow                                                     */
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------------------------------------------------------------- */
    /* Scroll spy — highlight nav based on vertical page scroll          */
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        const sections = NAV_ITEMS
            .map((item) => document.querySelector(item.href))
            .filter(Boolean);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry closest to the top of the viewport
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length) {
                    setActiveHref(`#${visible[0].target.id}`);
                }
            },
            {
                // Trigger when section occupies the middle band of the viewport
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0,
            }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    /* ---------------------------------------------------------------- */
    /* Lock body scroll when mobile menu open                            */
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    /* ---------------------------------------------------------------- */
    /* Close menu on Escape                                              */
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen((open) => !open);

    /* ---------------------------------------------------------------- */
    /* Label shown under "Current Sectors" when that section is active   */
    /* ---------------------------------------------------------------- */
    const sectorsItem = NAV_ITEMS.find((i) => i.href === "#sectors");

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
                scrolled
                    ? "bg-[#F6F3EA]/90 shadow-[0_1px_0_0_rgba(27,58,43,0.08)] backdrop-blur-md"
                    : "bg-transparent"
            )}
        >
            <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:h-20 lg:px-10">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={closeMenu}
                    aria-label="Verdant Vale Group — Home"
                    className="group relative z-[70] flex items-center gap-3"
                >
                    <span
                        className="
                            relative grid h-10 w-10 shrink-0 place-items-center
                            overflow-hidden rounded-full
                            bg-[#0B1F33]
                            transition-all duration-500
                            group-hover:scale-105
                            group-hover:shadow-[0_6px_20px_rgba(11,31,51,0.18)]
                        "
                    >
                        <img
                            src={logo}
                            alt=""
                            className="
                                relative z-10 h-7 w-7
                                object-contain
                                transition-transform duration-500
                                ease-out
                                group-hover:scale-105
                            "
                        />
                    </span>

                    <span className="flex flex-col">
                        <span
                            className="
                                relative w-fit
                                font-serif text-[1.08rem]
                                font-medium leading-none
                                tracking-[-0.025em]
                                text-[#0B1F33]
                            "
                        >
                            Verdant Vale
                            <span
                                className="
                                    absolute -bottom-1 left-0
                                    h-px w-full origin-left scale-x-0
                                    bg-[#0B1F33]
                                    transition-transform duration-500
                                    ease-[cubic-bezier(0.16,1,0.3,1)]
                                    group-hover:scale-x-100
                                "
                            />
                        </span>

                        <span
                            className="
                                mt-1.5
                                text-[0.58rem]
                                font-medium uppercase
                                tracking-[0.24em]
                                text-[#7C9473]
                                transition-colors duration-300
                                group-hover:text-[#0B1F33]
                            "
                        >
                            Group
                        </span>
                    </span>
                </a>

                {/* Centered nav — desktop */}
                <nav
                    aria-label="Primary"
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-[#0B1F33]/10 bg-white/40 p-1.5 xl:flex"
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeHref === item.href;
                        const Icon = item.icon;
                        const showSectorName =
                            isActive &&
                            item.href === sectorsItem?.href &&
                            activeSector;

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveHref(item.href)}
                                className={cn(
                                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                                    isActive
                                        ? "text-[#F6F3EA]"
                                        : "text-[#0B1F33]/70 hover:text-[#0B1F33]"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full bg-[#0B1F33]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 32,
                                        }}
                                    />
                                )}

                                <Icon
                                    className="relative z-10 h-4 w-4"
                                    strokeWidth={1.75}
                                />

                                <span className="relative z-10 flex items-center gap-2">
                                    {item.label}

                                    {/* Live sector badge */}
                                    {showSectorName && (
                                        <motion.span
                                            key={activeSector}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.25 }}
                                            className="
                                                hidden rounded-full bg-white/15
                                                px-2 py-0.5 text-[10px] font-medium
                                                uppercase tracking-[0.12em] text-white/90
                                                2xl:inline-flex
                                            "
                                        >
                                            {activeSector}
                                        </motion.span>
                                    )}
                                </span>
                            </a>
                        );
                    })}
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={toggleMenu}
                    aria-label={
                        isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    className="relative z-[70] flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#0B1F33]/10 bg-white/70 text-[#0B1F33] shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white active:scale-90 xl:hidden"
                >
                    <Menu
                        size={21}
                        strokeWidth={1.8}
                        className={cn(
                            "absolute transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isMenuOpen
                                ? "rotate-90 scale-0 opacity-0"
                                : "rotate-0 scale-100 opacity-100"
                        )}
                    />
                    <X
                        size={21}
                        strokeWidth={1.8}
                        className={cn(
                            "absolute transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isMenuOpen
                                ? "rotate-0 scale-100 opacity-100"
                                : "-rotate-90 scale-0 opacity-0"
                        )}
                    />
                </button>
            </div>

            {/* Mobile backdrop */}
            <div
                onClick={closeMenu}
                aria-hidden="true"
                className={cn(
                    "fixed inset-0 z-40 bg-[#12140F]/25 backdrop-blur-[3px] transition-all duration-500 ease-out xl:hidden",
                    isMenuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                )}
            />

            {/* Mobile menu panel */}
            <div
                className={cn(
                    "absolute left-3 right-3 top-[calc(100%+6px)] z-50 max-h-[calc(100vh-90px)] overflow-y-auto rounded-[24px] border border-white/30 shadow-[0_25px_80px_rgba(27,58,43,0.28)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:left-6 sm:right-6 xl:hidden",
                    isMenuOpen
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible -translate-y-5 scale-[0.97] opacity-0"
                )}
                style={{
                    background:
                        "radial-gradient(circle at 10% 0%, #1E3D5C 0%, #14304A 35%, #0B1F33 75%)",
                }}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                            Navigation
                        </p>
                        <h2 className="mt-1 text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">
                            Explore Verdant Vale
                        </h2>
                    </div>
                </div>

                <nav className="p-3 sm:p-4">
                    {NAV_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        const isSectors = item.href === "#sectors";
                        const isActive = activeHref === item.href;

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => {
                                    setActiveHref(item.href);
                                    closeMenu();
                                }}
                                style={{
                                    transitionDelay: isMenuOpen
                                        ? `${100 + index * 60}ms`
                                        : "0ms",
                                }}
                                className={cn(
                                    "group flex items-center justify-between rounded-2xl px-3 py-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/10 active:scale-[0.98]",
                                    isMenuOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-3 opacity-0",
                                    isActive && "bg-white/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20">
                                        <Icon size={20} strokeWidth={1.7} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-semibold tracking-[-0.01em] text-white sm:text-base">
                                            {item.label}
                                        </span>
                                        <span className="mt-0.5 text-[11px] text-white/60 sm:text-xs">
                                            {isSectors && activeSector
                                                ? activeSector
                                                : item.description}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20 group-hover:text-white">
                                    <ArrowUpRight size={15} strokeWidth={1.8} />
                                </div>
                            </a>
                        );
                    })}
                </nav>

                <div className="mx-3 mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:mx-4 sm:mb-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#0B1F33] shadow-[0_0_0_4px_rgba(124,148,115,0.18)]" />
                        <span className="text-xs font-medium text-white/60">
                            Growing what matters
                        </span>
                    </div>

                    <span
                        className="
                            grid h-7 w-7 shrink-0 place-items-center
                            overflow-hidden rounded-full
                            bg-white/10 ring-1 ring-white/15
                        "
                        aria-label="Verdant Vale Group"
                    >
                        <img src={logo} alt="" className="h-5 w-5 object-contain" />
                    </span>
                </div>
            </div>
        </header>
    );
}