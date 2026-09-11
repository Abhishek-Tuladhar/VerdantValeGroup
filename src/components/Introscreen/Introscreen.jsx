import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "../../assets/Images/logo.png";

/**
 * Full-screen intro / preloader.
 *
 * Usage:
 *   <IntroScreen>
 *     <Hero />
 *     ...rest of the page
 *   </IntroScreen>
 *
 * The page content mounts immediately underneath the overlay, so it's
 * ready and laid out the instant the overlay lifts away — no flash of
 * unstyled/empty content.
 */
export default function IntroScreen({ children, minDuration = 2600 }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Simulated load — swap the increment logic for real asset/data
  // loading progress if you have something concrete to track.
  useEffect(() => {
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / minDuration, 1);
      // Ease-out so the counter settles into 100 rather than ticking evenly.
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setIsDone(true), 350);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [minDuration]);

  useEffect(() => {
    document.body.style.overflow = showOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOverlay]);

  return (
    <>
      {/* Real page content — mounted underneath from the start */}
      {children}

      <AnimatePresence onExitComplete={() => setShowOverlay(false)}>
        {isDone ? null : (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1F33]"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Logo — settles in, then breathes gently while loading */}
            <motion.img
              src={logo}
              alt="Verdant Vale Group"
              className="h-20 w-auto select-none sm:h-24"
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{
                opacity: 1,
                scale: [0.55, 1.12, 1, 1.06, 1],
              }}
              transition={{
                opacity: { duration: 0.7, ease: "easeOut" },
                scale: {
                  duration: 2.6,
                  times: [0, 0.28, 0.5, 0.78, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }}
              draggable={false}
            />

            {/* Welcome text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-white sm:text-base"
            >
              Welcome to Verdant Vale Group
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex w-48 flex-col items-center gap-3 sm:w-56"
            >
              <div className="h-px w-full overflow-hidden bg-white/15">
                <motion.div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <span className="font-mono text-xs tracking-widest text-white/70">
                {progress}%
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}