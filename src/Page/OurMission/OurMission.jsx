import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const MISSION_POINTS = [
    "To drive sustainable growth and innovation across diverse industries while creating value for our stakeholders and contributing to a better world.",
    "We are committed to sustainability and environmental stewardship in all our operations.",
    "We foster a culture of innovation and continuous improvement across all our businesses.",
    "We prioritize the well-being and development of our employees, customers, and communities.",
];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const imageAnimation = {
    hidden: {
        opacity: 0,
        scale: 0.94,
        y: 40,
    },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function OurMission() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Subtle vertical movement while scrolling
    const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

    return (
        <main
            ref={sectionRef}
            className="flex min-h-screen flex-col items-center px-8 pt-14 pb-24"
        >
            <motion.div
                className="flex w-full max-w-[950px] flex-col items-center"
                initial="hidden"
                whileInView="show"
                viewport={{
                    once: true,
                    amount: 0.25,
                }}
                variants={container}
            >
                {/* Image */}
                <motion.div
                    variants={imageAnimation}
                    style={{ y: imageY }}
                    className="w-full max-w-[430px] overflow-hidden rounded-3xl"
                >
                    <motion.img
                        src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?fm=jpg&q=80&w=1000&auto=format&fit=crop"
                        alt="People standing inside a city building, meeting near a glass window overlooking the skyline"
                        className="aspect-square w-full object-cover grayscale"
                        whileHover={{
                            scale: 1.03,
                            transition: {
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            },
                        }}
                    />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={item}
                    className="mt-10 text-center text-5xl font-light tracking-tight text-neutral-900"
                >
                    Our Mission
                </motion.h1>

                {/* Mission points */}
                <motion.ul
                    variants={container}
                    className="mt-8 w-full space-y-2"
                >
                    {MISSION_POINTS.map((point, index) => (
                        <motion.li
                            key={point}
                            variants={item}
                            className="flex gap-3 text-[15px] leading-7 text-neutral-700"
                        >
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mt-[2px] select-none text-neutral-400"
                            >
                                &bull;
                            </motion.span>

                            <span>{point}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </main>
    );
}