import { motion, useReducedMotion } from "motion/react";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function AboutUs() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            id="about"
            className="flex min-h-screen w-full items-center justify-center bg-white px-8 py-24 md:px-16"
        >
            <motion.div
                variants={prefersReducedMotion ? undefined : container}
                initial={prefersReducedMotion ? undefined : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "show"}
                viewport={{
                    once: true,
                    amount: 0.25,
                }}
                className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
            >
                <motion.div
                    variants={fadeUp}
                    className="max-w-[560px] md:mx-auto"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="mb-8 text-center text-5xl font-light tracking-tight text-neutral-900 md:text-left"
                    >
                        About Us
                    </motion.h1>

                    <motion.div
                        variants={container}
                        className="space-y-5 text-[15px] leading-7 text-neutral-700"
                    >
                        <motion.p variants={fadeUp}>
                            Verdant Vale Group is a diversified business conglomerate
                            with a portfolio spanning seven key industries that drive
                            economic growth and human development.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            Founded in 2005, we&apos;ve grown from a small agricultural
                            trading company to a multinational group with operations
                            in over 20 countries. Our success stems from our
                            commitment to innovation, sustainability, and creating
                            shared value for all stakeholders.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            With over 15,000 employees worldwide Verdant Vale Group
                            continues to expand its footprint while maintaining the
                            core values that have guided us from the beginning.
                        </motion.p>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className="overflow-hidden rounded-3xl"
                >
                    <motion.img
                        src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?fm=jpg&q=80&w=1400&auto=format&fit=crop"
                        alt="People standing inside a city building, meeting near a glass window overlooking the skyline"
                        className="h-[560px] w-full object-cover grayscale"
                        initial={
                            prefersReducedMotion
                                ? undefined
                                : { scale: 1.08 }
                        }
                        whileInView={
                            prefersReducedMotion
                                ? undefined
                                : { scale: 1 }
                        }
                        viewport={{
                            once: true,
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}