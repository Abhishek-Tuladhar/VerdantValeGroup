import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Wheat,
  Pill,
  Landmark,
  Building2,
  Cpu,
  Palmtree,
  Gem,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useActiveSector } from "../../context/ActiveSectorContext";
import bannerImage from "../../assets/Images/MarchStreetMediaLogo.png";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const SECTORS = [
  {
    title: "Agriculture & Trade",
    description:
      "Sustainable farming practices and global commodity trading that connects producers with international markets.",
    icon: Wheat,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    paragraphs: [
      "VerdantValeGroup's Agriculture Division is revolutionizing sustainable farming practices across the globe. We manage over 500,000 acres of farmland using precision agriculture techniques that increase yields while reducing environmental impact. Our integrated approach combines cutting-edge technology with time-tested farming methods to deliver high-quality produce to markets worldwide.",
      "Our global trade network connects farmers directly with international markets, ensuring fair prices and stable supply chains. We specialize in grains, fruits, and specialty crops, with operations in 12 countries. Through our farmer education programs and sustainable practices, we're helping to build a more resilient global food system that benefits both producers and consumers.",
    ],
  },
  {
    title: "Pharmaceuticals",
    description:
      "Innovative healthcare solutions and affordable medicines that improve quality of life worldwide.",
    icon: Pill,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    paragraphs: [
      "VerdantValeGroup's Pharmaceutical Division is committed to developing affordable, life-saving medications for global markets. Our state-of-the-art research facilities focus on treatments for tropical diseases, chronic conditions, and innovative generic medications. We maintain the highest standards of quality while keeping costs accessible.",
      "With manufacturing plants in three continents, we're able to serve both developed and emerging markets efficiently. Our recent breakthroughs in vaccine technology and our partnerships with global health organizations demonstrate our commitment to improving healthcare outcomes worldwide. We invest heavily in R&D while ensuring our products remain within reach of those who need them most.",
    ],
  },
  {
    title: "Fintech",
    description:
      "Cutting-edge financial technology solutions that democratize access to banking and investment services.",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    paragraphs: [
      "VerdantVale Fintech Solutions is revolutionizing financial services through innovative technology. Our digital banking platforms, payment solutions, and blockchain-based services are making financial inclusion a reality for millions previously underserved by traditional banks. We specialize in secure, user-friendly interfaces that work across all devices.",
      "Our proprietary algorithms for micro-lending and risk assessment have helped small businesses access capital like never before. With operations in 15 countries and partnerships with local financial institutions, we're bridging the gap between traditional banking and the digital economy. Our mobile wallet solution has already brought banking services to over 5 million first-time users.",
    ],
  },
  {
    title: "Real Estate",
    description:
      "Sustainable urban development projects that create thriving communities and commercial hubs.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    paragraphs: [
      "VerdantVale Properties develops sustainable, community-focused real estate projects across urban and suburban landscapes. Our portfolio includes residential complexes, commercial hubs, and mixed-use developments that prioritize green spaces, energy efficiency, and smart city technologies. We're known for our innovative designs that blend functionality with aesthetic appeal.",
      "With projects in 8 countries, we're redefining urban living through our commitment to sustainable construction practices and community development. Our signature \"green towers\" incorporate vertical gardens, solar panel arrays, and rainwater harvesting systems. We don't just build structures - we create thriving ecosystems where people can live, work, and connect with nature.",
    ],
  },
  {
    title: "Media & Technology",
    description:
      "Innovative technology services and media content creation that help solve modern world problems.",
    icon: Cpu,
    image: bannerImage,
    paragraphs: [
      "VerdantVale Entertainment is a premier Media and Technology powerhouse. We deliver comprehensive technical solutions, including reliable web hosting, search engine optimization (SEO), custom software engineering, and mobile app development. Deeply embedded in the future of technology, we also offer cutting-edge AI services that optimize digital experiences and push the boundaries of modern innovation.",
      "On the media and entertainment front, we produce cinematic blockbuster movies, high-quality TV productions, and engaging entertainment content designed for global audiences. From immersive virtual reality to large-scale live music festivals and cultural events, our sustainable entertainment services celebrate artistic expression and inspire viewers worldwide while supporting both established and emerging talent.",
    ],
  },
  {
    title: "Hospitality",
    description:
      "Luxury resorts and eco-friendly hotels that offer unforgettable experiences with minimal environmental impact.",
    icon: Palmtree,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    paragraphs: [
      "VerdantVale Hospitality operates a collection of eco-luxury resorts and boutique hotels that redefine sustainable tourism. Our properties blend five-star amenities with environmental stewardship, offering guests unparalleled experiences with minimal ecological impact. From beachfront villas to mountain retreats, each location showcases local culture and natural beauty.",
      'Our award-winning "Green Stay" program ensures that every aspect of our operations - from energy use to food sourcing - meets rigorous sustainability standards. We partner with local communities to create authentic experiences while supporting regional economies. With properties in 12 exotic locations worldwide, we\'re proving that luxury and sustainability can go hand in hand.',
    ],
  },
  {
    title: "Gold Mining",
    description:
      "Responsible mineral extraction that meets the highest environmental and ethical standards.",
    icon: Gem,
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    paragraphs: [
      "VerdantVale Minerals operates responsible gold mining operations that set new standards for environmental stewardship in the industry. Our mines in South America and Africa utilize cutting-edge extraction technologies that minimize ecological disruption while maximizing recovery rates. We're committed to transparent supply chains and ethical labor practices.",
      "Through our \"Green Gold\" initiative, we've implemented comprehensive land rehabilitation programs and community development projects at each of our sites. Our innovative mercury-free processing methods and renewable energy-powered operations demonstrate that precious metal extraction can be both profitable and environmentally responsible. We're proving that the mining industry can be a force for positive change.",
    ],
  },
];

const LEN = SECTORS.length;
const COPIES = 5;
const MID_COPY = Math.floor(COPIES / 2);
const TOTAL = LEN * COPIES;

const DEFAULT_SECTOR_INDEX = 0;

/* -------------------------------------------------------------------------- */
/* Network Graphic                                                            */
/* -------------------------------------------------------------------------- */

function NetworkGlow({ Icon }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#04202e] via-[#0a3448] to-[#0f4a63]">
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#5fd4f4" strokeWidth="0.6" opacity="0.5">
          <line x1="40" y1="60" x2="140" y2="130" />
          <line x1="140" y1="130" x2="120" y2="240" />
          <line x1="140" y1="130" x2="260" y2="110" />
          <line x1="260" y1="110" x2="340" y2="70" />
          <line x1="260" y1="110" x2="300" y2="220" />
          <line x1="120" y1="240" x2="220" y2="300" />
          <line x1="220" y1="300" x2="300" y2="220" />
          <line x1="220" y1="300" x2="180" y2="380" />
        </g>

        <g fill="#7fe3ff">
          {[
            [40, 60],
            [140, 130],
            [260, 110],
            [340, 70],
            [120, 240],
            [300, 220],
            [220, 300],
            [180, 380],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="2.5"
            />
          ))}
        </g>
      </svg>

      <div className="absolute h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl sm:h-40 sm:w-40" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10"
      >
        <Icon
          className="h-14 w-14 text-cyan-200 sm:h-16 sm:w-16 md:h-20 md:w-20"
          strokeWidth={1.25}
        />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sector Card                                                                */
/* -------------------------------------------------------------------------- */

function SectorCard({
  sector,
  isActive,
  onActivate,
  onOpen,
}) {
  const {
    title,
    description,
    icon: Icon,
    image,
  } = sector;

  const isMediaTechnology =
    title === "Media & Technology";

  return (
    <motion.div
      layout
      transition={{
        layout: {
          type: "spring",
          stiffness: 220,
          damping: 30,
        },
      }}
      onClick={onActivate}
      className={`
        group relative flex flex-shrink-0 cursor-pointer
        overflow-hidden rounded-[24px]
        bg-[#0a3448]

        h-[420px]
        w-[calc(100vw-48px)]
        max-w-[360px]

        sm:h-[460px]
        sm:w-[380px]

        lg:h-[500px]
        lg:w-[380px]

        ${
          isActive
            ? `
              max-[767px]:h-[560px]
              max-[767px]:w-[calc(100vw-32px)]
              max-[767px]:max-w-none

              sm:w-[760px]
              sm:h-[460px]

              md:w-[860px]
              md:h-[480px]

              lg:w-[960px]
              lg:h-[500px]
              lg:max-w-[78vw]
            `
            : ""
        }
      `}
    >
      {isActive ? (
        /*
         * IMPORTANT:
         * This remains a ROW at every breakpoint.
         * Left = NetworkGlow + text
         * Right = sector image
         */
        <div className="relative flex h-full w-full flex-row">
          {/* ====================================================== */}
          {/* LEFT BACKGROUND / NETWORK GRAPHIC                      */}
          {/* ====================================================== */}

          <motion.div
            layout
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-0
              top-0
              bottom-0
              z-0
              w-[48%]
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                -inset-[30px]
                scale-110
                blur-[0px]
              "
            >
              <NetworkGlow Icon={Icon} />
            </div>

            <div className="absolute inset-0 bg-[#062a3c]/60" />

            <div
              className="
                absolute
                inset-y-0
                right-0
                w-[45%]
                bg-gradient-to-r
                from-transparent
                to-[#062a3c]
              "
            />
          </motion.div>

          {/* ====================================================== */}
          {/* CONTENT LAYER                                           */}
          {/* ====================================================== */}

          <div className="relative z-10 flex h-full w-full flex-row">
            {/* -------------------------------------------------- */}
            {/* LEFT CONTENT                                         */}
            {/* -------------------------------------------------- */}

            <div
              className="
                relative
                flex
                h-full
                w-[48%]
                flex-shrink-0
                flex-col
                justify-between

                px-5
                py-7

                sm:px-7
                sm:py-8

                md:px-8
                md:py-9

                lg:px-9
                lg:py-10
              "
            >
              <div>
                <motion.h3
                  layout="position"
                  className="
                    max-w-[390px]
                    text-xl
                    font-semibold
                    leading-[1.15]
                    tracking-tight
                    text-white

                    sm:text-2xl

                    md:text-[28px]

                    lg:text-[32px]
                  "
                >
                  {title}
                </motion.h3>

                <motion.p
                  layout="position"
                  className="
                    mt-4
                    max-w-[410px]
                    text-xs
                    leading-5
                    text-white/75

                    sm:mt-5
                    sm:text-sm
                    sm:leading-6

                    md:text-[15px]
                    md:leading-7
                  "
                >
                  {description}
                </motion.p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="
                  w-fit
                  rounded-full
                  bg-white

                  px-5
                  py-2.5

                  text-xs
                  font-medium
                  text-[#0a3448]

                  transition-all
                  duration-300

                  hover:scale-[1.02]
                  hover:opacity-90
                  active:scale-95

                  sm:px-6
                  sm:py-3
                  sm:text-sm
                "
              >
                Read More
              </button>
            </div>

            {/* -------------------------------------------------- */}
            {/* RIGHT IMAGE                                          */}
            {/* -------------------------------------------------- */}

            <motion.div
              layout
              initial={{
                opacity: 0,
                x: 25,
                scale: 1.02,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                h-full
                w-[52%]
                flex-shrink-0
                overflow-hidden
              "
            >
              <img
                src={image}
                alt={title}
                className={
                  isMediaTechnology
                    ? `
                      h-full
                      w-full
                      object-contain
                      p-5

                      sm:p-7
                      md:p-8
                      lg:p-10
                    `
                    : `
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.025]
                    `
                }
              />

              <div
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-[18%]
                  bg-gradient-to-r
                  from-[#062a3c]/35
                  to-transparent
                "
              />

              <div className="absolute inset-0 bg-black/[0.03]" />
            </motion.div>
          </div>
        </div>
      ) : (
        /* ========================================================== */
        /* INACTIVE CARD                                              */
        /* ========================================================== */

        <div className="flex h-full w-full flex-col justify-between p-7 sm:p-8">
          <div>
            <motion.h3
              layout="position"
              className="
                text-xl
                font-semibold
                leading-tight
                text-white

                sm:text-2xl
              "
            >
              {title}
            </motion.h3>

            <motion.p
              layout="position"
              className="
                mt-3
                max-w-[300px]
                text-sm
                leading-6
                text-white/70

                sm:text-[15px]
              "
            >
              {description}
            </motion.p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="
              w-fit
              rounded-full
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-[#0a3448]
              transition-all
              duration-300

              hover:scale-[1.02]
              hover:opacity-90
              active:scale-95

              sm:px-6
            "
          >
            Read More
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sector Modal                                                               */
/* -------------------------------------------------------------------------- */

function SectorModal({ sector, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const original =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        original;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      onKey,
    );

    const timeout = setTimeout(
      () =>
        closeButtonRef.current?.focus(),
      50,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        onKey,
      );

      clearTimeout(timeout);
    };
  }, [onClose]);

  if (!sector) return null;

  const {
    title,
    description,
    icon: Icon,
    image,
    paragraphs,
  } = sector;

  const isMediaTechnology =
    title === "Media & Technology";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sector-modal-title"
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#0a1a24]/70
        p-3
        backdrop-blur-md

        sm:p-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          relative
          flex
          h-full
          max-h-[92vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.35)]

          md:h-auto
          md:max-h-[88vh]
          md:flex-row
        "
      >
        {/* Close */}

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/85
            text-[#0a3448]
            shadow-md
            backdrop-blur
            transition-all
            duration-300

            hover:scale-105
            hover:bg-white
            active:scale-95
          "
        >
          <X
            size={20}
            strokeWidth={1.8}
          />
        </button>

        {/* ====================================================== */}
        {/* MODAL IMAGE                                             */}
        {/* ====================================================== */}

        <div
          className="
            relative
            h-48
            w-full
            flex-shrink-0
            overflow-hidden

            sm:h-64

            md:h-auto
            md:w-[42%]
          "
        >
          <img
            src={image}
            alt={title}
            className={
              isMediaTechnology
                ? `
                  h-full
                  w-full
                  object-contain
                  p-6

                  sm:p-8
                  md:p-10
                `
                : `
                  h-full
                  w-full
                  object-cover
                `
            }
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#04202e]/70
              via-transparent
              to-transparent

              md:bg-gradient-to-r
              md:from-transparent
              md:via-transparent
              md:to-[#04202e]/20
            "
          />

          <div
            className="
              absolute
              bottom-4
              left-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-white/30
              bg-white/15
              text-cyan-100
              backdrop-blur-md

              sm:h-14
              sm:w-14
            "
          >
            <Icon
              className="
                h-6
                w-6

                sm:h-7
                sm:w-7
              "
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* ====================================================== */}
        {/* MODAL CONTENT                                           */}
        {/* ====================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            overflow-y-auto
            px-6
            py-7

            sm:px-8
            sm:py-9

            md:px-10
            md:py-12
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#7C9473]
            "
          >
            Verdant Vale Group
          </p>

          <h2
            id="sector-modal-title"
            className="
              mt-2
              text-2xl
              font-light
              leading-tight
              tracking-tight
              text-[#0B1F33]

              sm:text-3xl
              md:text-4xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-neutral-500

              sm:text-[15px]
              sm:leading-7
            "
          >
            {description}
          </p>

          <div
            className="
              mt-6
              space-y-5
              text-[15px]
              leading-7
              text-neutral-700

              sm:mt-8
            "
          >
            {paragraphs.map(
              (text, i) => (
                <p key={i}>
                  {text}
                </p>
              ),
            )}
          </div>

          <div
            className="
              mt-8
              border-t
              border-neutral-200
              pt-6
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                w-fit
                rounded-full
                bg-[#0a3448]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-300

                hover:scale-[1.02]
                hover:opacity-90
                active:scale-95
              "
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function Sectors() {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(
    DEFAULT_SECTOR_INDEX,
  );

  const [
    openSector,
    setOpenSector,
  ] = useState(null);

  const {
    setActiveSector,
  } = useActiveSector();

  const trackRef =
    useRef(null);

  const sectionRef =
    useRef(null);

  const isJumpingRef =
    useRef(false);

  const isSmoothRef =
    useRef(false);

  const centersRef =
    useRef([]);

  const snapTimerRef =
    useRef(0);

  /* ------------------------------------------------------------------------ */
  /* Measure card centers                                                     */
  /* ------------------------------------------------------------------------ */

  const measureCenters =
    useCallback(() => {
      const track =
        trackRef.current;

      if (!track) return;

      const centers = [];

      for (
        let i = 0;
        i < track.children.length;
        i++
      ) {
        const c =
          track.children[i];

        centers.push(
          c.offsetLeft +
            c.offsetWidth / 2,
        );
      }

      centersRef.current =
        centers;
    }, []);

  /* ------------------------------------------------------------------------ */
  /* Nearest card to viewport center                                          */
  /* ------------------------------------------------------------------------ */

  const nearestCardIndex =
    useCallback(() => {
      const track =
        trackRef.current;

      if (!track) return 0;

      const center =
        track.scrollLeft +
        track.clientWidth / 2;

      const centers =
        centersRef.current;

      let best = 0;
      let bestDist = Infinity;

      for (
        let i = 0;
        i < centers.length;
        i++
      ) {
        const d =
          Math.abs(
            centers[i] - center,
          );

        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      return best;
    }, []);

  /* ------------------------------------------------------------------------ */
  /* Instant jump                                                             */
  /* ------------------------------------------------------------------------ */

  const jumpToCard =
    useCallback(
      (trackIdx) => {
        const track =
          trackRef.current;

        const centers =
          centersRef.current;

        if (
          !track ||
          centers[trackIdx] == null
        ) {
          return;
        }

        const target =
          centers[trackIdx] -
          track.clientWidth / 2;

        isJumpingRef.current =
          true;

        track.scrollLeft =
          Math.max(0, target);

        requestAnimationFrame(
          () => {
            requestAnimationFrame(
              () => {
                isJumpingRef.current =
                  false;
              },
            );
          },
        );
      },
      [],
    );

  /* ------------------------------------------------------------------------ */
  /* Smooth scroll to card                                                    */
  /* ------------------------------------------------------------------------ */

  const smoothScrollToCard =
    useCallback(
      (trackIdx) => {
        const track =
          trackRef.current;

        const centers =
          centersRef.current;

        if (
          !track ||
          centers[trackIdx] == null
        ) {
          return;
        }

        const target =
          Math.max(
            0,
            centers[trackIdx] -
              track.clientWidth / 2,
          );

        isSmoothRef.current =
          true;

        track.scrollTo({
          left: target,
          behavior: "smooth",
        });

        window.clearTimeout(
          smoothScrollToCard._t,
        );

        smoothScrollToCard._t =
          window.setTimeout(() => {
            isSmoothRef.current =
              false;
          }, 600);
      },
      [],
    );

  /* ------------------------------------------------------------------------ */
  /* Initial centering                                                        */
  /* ------------------------------------------------------------------------ */

  useLayoutEffect(() => {
    const raf =
      requestAnimationFrame(() => {
        measureCenters();

        const initial =
          MID_COPY * LEN +
          DEFAULT_SECTOR_INDEX;

        jumpToCard(initial);
      });

    const onResize = () => {
      measureCenters();

      const current =
        nearestCardIndex();

      jumpToCard(current);
    };

    window.addEventListener(
      "resize",
      onResize,
    );

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "resize",
        onResize,
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Infinite scroll + mobile snap                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const track =
      trackRef.current;

    if (!track) return;

    let raf = 0;

    const handleScroll = () => {
      if (
        isJumpingRef.current ||
        isSmoothRef.current
      ) {
        return;
      }

      cancelAnimationFrame(
        raf,
      );

      raf =
        requestAnimationFrame(
          () => {
            const idx =
              nearestCardIndex();

            const real =
              ((idx % LEN) + LEN) %
              LEN;

            setActiveIndex(
              (prev) => {
                if (
                  prev !== real
                ) {
                  setActiveSector(
                    SECTORS[real]
                      .title,
                  );
                }

                return real;
              },
            );

            const middleFirst =
              MID_COPY * LEN;

            const middleLast =
              middleFirst +
              LEN -
              1;

            if (
              idx <
              middleFirst
            ) {
              jumpToCard(
                idx + LEN,
              );
            } else if (
              idx >
              middleLast
            ) {
              jumpToCard(
                idx - LEN,
              );
            }
          },
        );

      window.clearTimeout(
        snapTimerRef.current,
      );

      snapTimerRef.current =
        window.setTimeout(
          () => {
            if (
              isJumpingRef.current ||
              isSmoothRef.current
            ) {
              return;
            }

            measureCenters();

            const idx =
              nearestCardIndex();

            const centers =
              centersRef.current;

            if (
              centers[idx] == null
            ) {
              return;
            }

            const target =
              Math.max(
                0,
                centers[idx] -
                  track.clientWidth /
                    2,
              );

            if (
              Math.abs(
                track.scrollLeft -
                  target,
              ) > 4
            ) {
              smoothScrollToCard(
                idx,
              );
            }
          },
          140,
        );
    };

    track.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll,
      );

      cancelAnimationFrame(
        raf,
      );

      window.clearTimeout(
        snapTimerRef.current,
      );
    };
  }, [
    jumpToCard,
    nearestCardIndex,
    smoothScrollToCard,
    measureCenters,
  ]);

  useEffect(() => {
    setActiveSector(
      SECTORS[
        DEFAULT_SECTOR_INDEX
      ].title,
    );
  }, [setActiveSector]);

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                               */
  /* ------------------------------------------------------------------------ */

  const goTo = (
    realIndex,
  ) => {
    const next =
      ((realIndex % LEN) +
        LEN) %
      LEN;

    const targetTrackIdx =
      MID_COPY * LEN +
      next;

    setActiveIndex(next);

    setActiveSector(
      SECTORS[next].title,
    );

    smoothScrollToCard(
      targetTrackIdx,
    );
  };

  /* ------------------------------------------------------------------------ */
  /* Activate a sector                                                        */
  /* ------------------------------------------------------------------------ */

  const handleActivateSector = (
    realIndex,
    trackIdx,
  ) => {
    if (
      realIndex ===
      activeIndex
    ) {
      return;
    }

    setActiveIndex(
      realIndex,
    );

    setActiveSector(
      SECTORS[realIndex].title,
    );

    smoothScrollToCard(
      trackIdx,
    );

    const normalizedTrackIdx =
      MID_COPY * LEN +
      realIndex;

    if (
      trackIdx !==
      normalizedTrackIdx
    ) {
      window.clearTimeout(
        handleActivateSector._normT,
      );

      handleActivateSector._normT =
        window.setTimeout(
          () => {
            jumpToCard(
              normalizedTrackIdx,
            );
          },
          400,
        );
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Open sector modal                                                        */
  /* ------------------------------------------------------------------------ */

  const handleOpenSector = (
    sector,
    realIndex,
    trackIdx,
  ) => {
    setActiveIndex(
      realIndex,
    );

    setActiveSector(
      sector.title,
    );

    const normalizedTrackIdx =
      MID_COPY * LEN +
      realIndex;

    if (
      trackIdx ===
      normalizedTrackIdx
    ) {
      smoothScrollToCard(
        trackIdx,
      );
    } else {
      jumpToCard(
        normalizedTrackIdx,
      );
    }

    window.clearTimeout(
      handleOpenSector._t,
    );

    handleOpenSector._t =
      window.setTimeout(
        () => {
          setOpenSector(
            sector,
          );
        },
        260,
      );
  };

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  const renderedCards =
    Array.from(
      {
        length: TOTAL,
      },
      (_, i) => {
        const realIndex =
          i % LEN;

        return {
          key: `${SECTORS[realIndex].title}-${i}`,
          realIndex,
          trackIdx: i,
          sector:
            SECTORS[realIndex],
          isActive:
            realIndex ===
            activeIndex,
        };
      },
    );

  return (
    <main
      ref={sectionRef}
      id="sectors"
      className="
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        overflow-hidden
        scroll-mt-16
        px-6
        pt-12
        pb-20

        sm:scroll-mt-[72px]
        sm:px-8
        sm:pt-14
        sm:pb-24

        lg:scroll-mt-20
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Heading                                                            */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.7,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          w-full
          max-w-[760px]
          text-center
        "
      >
        <h1
          className="
            text-3xl
            font-light
            leading-[1.15]
            tracking-tight
            text-neutral-900

            sm:text-4xl
            md:text-5xl
          "
        >
          Our Industries
          <br />

          <span className="text-neutral-700">
            Diverse industries. One
            shared vision.
          </span>
        </h1>

        <p
          className="
            mx-auto
            mt-5
            max-w-[620px]
            text-sm
            leading-6
            text-neutral-600

            sm:mt-6
            sm:text-[16px]
            sm:leading-7
          "
        >
          We bring together diverse
          businesses across agriculture,
          healthcare, finance, real estate,
          hospitality, entertainment, and
          natural resources—driving
          innovation and creating
          sustainable value across markets.
        </p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Carousel                                                           */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          relative
          mt-12
          w-full

          sm:mt-16
        "
      >
        <div
          ref={trackRef}
          className="
            flex
            w-full
            gap-4
            overflow-x-auto
            px-6
            pb-4

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            overscroll-x-contain

            sm:gap-6
            sm:px-8
          "
        >
          {renderedCards.map(
            ({
              key,
              sector,
              isActive,
              trackIdx,
              realIndex,
            }) => (
              <div
                key={key}
                className="flex-shrink-0"
              >
                <SectorCard
                  sector={sector}
                  isActive={isActive}
                  onActivate={() =>
                    handleActivateSector(
                      realIndex,
                      trackIdx,
                    )
                  }
                  onOpen={() =>
                    handleOpenSector(
                      sector,
                      realIndex,
                      trackIdx,
                    )
                  }
                />
              </div>
            ),
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Controls                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-4

            sm:mt-8
            sm:gap-6
          "
        >
          <button
            type="button"
            onClick={() =>
              goTo(
                activeIndex - 1,
              )
            }
            aria-label="Previous sector"
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-neutral-300
              text-neutral-700
              transition-all
              duration-300

              hover:scale-105
              hover:bg-neutral-100
              active:scale-95

              sm:h-10
              sm:w-10
            "
          >
            <ChevronLeft
              className="h-5 w-5"
              strokeWidth={1.75}
            />
          </button>

          <div
            className="
              flex
              items-center
              gap-1.5

              sm:gap-2
            "
          >
            {SECTORS.map(
              (
                sector,
                index,
              ) => (
                <button
                  key={
                    sector.title
                  }
                  type="button"
                  onClick={() =>
                    goTo(index)
                  }
                  aria-label={`Go to ${sector.title}`}
                  className={`
                    h-1.5
                    flex-shrink-0
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      index ===
                      activeIndex
                        ? "w-6 bg-[#0a3448]"
                        : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                    }
                  `}
                />
              ),
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              goTo(
                activeIndex + 1,
              )
            }
            aria-label="Next sector"
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-neutral-300
              text-neutral-700
              transition-all
              duration-300

              hover:scale-105
              hover:bg-neutral-100
              active:scale-95

              sm:h-10
              sm:w-10
            "
          >
            <ChevronRight
              className="h-5 w-5"
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Modal                                                              */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {openSector && (
          <SectorModal
            sector={openSector}
            onClose={() =>
              setOpenSector(null)
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}