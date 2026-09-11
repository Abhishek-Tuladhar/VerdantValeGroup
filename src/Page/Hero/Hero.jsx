import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroBg from "../../assets/Images/Hero.jpg";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            id="home"
            className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-ink"
        >
            <div className="absolute inset-0">
                <img
                    src={heroBg}
                    alt="Aerial view of Verdant Vale Group's rooftop farm and solar installations against a city skyline"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
            </div>

            <motion.div
                variants={prefersReducedMotion ? undefined : container}
                initial={prefersReducedMotion ? undefined : "hidden"}
                animate={prefersReducedMotion ? undefined : "show"}
                className="relative z-10 flex flex-col items-start justify-end gap-10 px-6 pb-16 pt-32 sm:px-10 sm:pb-20 lg:flex-row lg:items-end lg:justify-between lg:px-16"
            >
                <motion.h1
                    variants={fadeUp}
                    className="max-w-2xl font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-mist sm:text-6xl lg:text-7xl"
                >
                    Cultivating Growth Across Industries
                </motion.h1>

                <motion.div
                    variants={fadeUp}
                    className="flex max-w-3xl flex-col items-center gap-6 text-center"
                >
                    <p className="font-sans text-[20px] leading-relaxed text-mist/85">
                        Verdant Vale Group is a diversified conglomerate driving innovation and
                        sustainability across multiple sectors.
                    </p>

                    <motion.a
                        href="#about"
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        className="flex items-center overflow-hidden rounded-full border border-mist/40 bg-ink/30 px-4 py-3 text-mist backdrop-blur-sm transition-colors hover:border-mist hover:bg-[#0B1F33] hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                    >
                        <motion.span
                            variants={{ rest: { y: 0 }, hover: { y: 3 } }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex shrink-0"
                        >
                            <ArrowDown className="h-4 w-4 text-mist" strokeWidth={1.75} />
                        </motion.span>

                        <motion.span
                            variants={{
                                rest: { width: 0, opacity: 0, marginLeft: 0 },
                                hover: { width: "auto", opacity: 1, marginLeft: 10 },
                            }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden whitespace-nowrap font-sans text-sm text-mist"
                        >
                            Scroll Down to Find More
                        </motion.span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}