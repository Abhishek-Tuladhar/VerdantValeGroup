import { useState } from "react";
import { Heart, X } from "lucide-react";

const POLICY_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    date: "Last Updated: September 2026",
    sections: [
      {
        title: "1. Information We Collect",
        content:
          "VerdantValeGroup collects information that you provide directly to us, including when you use our website, contact our team, or engage with our services. This may include personal information such as your name, email address, phone number, and professional details.",
      },
      {
        title: "2. How We Use Your Information",
        content: "We use collected information to:",
        list: [
          "Provide and improve our services",
          "Respond to inquiries and communicate with you",
          "Send relevant business updates and marketing communications",
          "Comply with legal obligations",
        ],
      },
      {
        title: "3. Data Sharing and Disclosure",
        content:
          "We do not sell your personal information. We may share information with:",
        list: [
          "Service providers who assist our operations",
          "Legal authorities when required by law",
          "Affiliated companies within VerdantValeGroup",
        ],
      },
      {
        title: "4. Data Security",
        content:
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.",
      },
      {
        title: "5. Your Rights",
        content: (
          <>
            You may request access to, correction of, or deletion of your
            personal data by contacting our Privacy Officer at{" "}
            <a
              href="mailto:privacy@verdantvalegroup.com"
              className="font-medium text-[#0b7189] hover:underline"
            >
              privacy@verdantvalegroup.com
            </a>
            .
          </>
        ),
      },
      {
        title: "6. Changes to This Policy",
        content:
          'We may update this policy periodically. The updated version will be posted on our website with a revised "Last Updated" date.',
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    date: "Effective: September 2026",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content:
          "By accessing or using any VerdantValeGroup website or service, you agree to be bound by these Terms of Service and our Privacy Policy.",
      },
      {
        title: "2. Services Description",
        content:
          "VerdantValeGroup provides information about our business divisions including agriculture, pharmaceuticals, fintech, real estate, hospitality, entertainment, and mining services through our digital platforms.",
      },
      {
        title: "3. Intellectual Property",
        content:
          "All content on our websites, including text, graphics, logos, and images, is the property of VerdantValeGroup or its licensors and is protected by copyright and trademark laws.",
      },
      {
        title: "4. User Conduct",
        content: "You agree not to:",
        list: [
          "Use our services for any unlawful purpose",
          "Attempt to gain unauthorized access to our systems",
          "Misrepresent your identity or affiliation",
          "Disrupt the operation of our services",
        ],
      },
      {
        title: "5. Disclaimer of Warranties",
        content:
          'Our services are provided "as is" without warranty of any kind. VerdantValeGroup does not guarantee the accuracy, completeness, or usefulness of any information on the site.',
      },
      {
        title: "6. Limitation of Liability",
        content:
          "VerdantValeGroup shall not be liable for any indirect, incidental, special, or consequential damages resulting from use of or inability to use our services.",
      },
      {
        title: "7. Governing Law",
        content:
          "These Terms shall be governed by the laws of the State of Delaware without regard to its conflict of law provisions.",
      },
      {
        title: "8. Changes to Terms",
        content:
          "We reserve the right to modify these terms at any time. Your continued use of our services constitutes acceptance of the modified terms.",
      },
      {
        title: "9. Contact Information",
        content: (
          <>
            For questions about these Terms, please contact us at{" "}
            <a
              href="mailto:legal@verdantvalegroup.com"
              className="font-medium text-[#0b7189] hover:underline"
            >
              legal@verdantvalegroup.com
            </a>
            .
          </>
        ),
      },
    ],
  },
};

function LegalModal({ type, onClose }) {
  const content = POLICY_CONTENT[type];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          relative
          flex
          max-h-[90vh]
          w-full
          max-w-[800px]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#062a3c] sm:text-3xl">
              {content.title}
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">{content.date}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              ml-4
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-[#062a3c]
            "
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div className="space-y-7">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h3 className="text-base font-semibold text-[#062a3c] sm:text-lg">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {section.content}
                </p>

                {section.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600 sm:text-[15px]">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-200 px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              bg-[#062a3c]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#0b4056]
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <footer className="w-full bg-[#062a3c] text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-8 md:py-14 lg:px-12 lg:py-16">
          {/* Brand Section */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center">
              <a
                href="https://verdantvalegrp.com/"
                className="group inline-flex items-center gap-3"
              >
                <img
                  src="https://verdantvalegrp.com/logo.png"
                  alt="Verdant Vale Group"
                  className="
                    h-12
                    w-auto
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-[1.02]
                  "
                />

                <span className="text-xl font-semibold tracking-[-0.02em] text-white">
                  VerdantValeGroup
                </span>
              </a>

              <p className="mt-5 max-w-[500px] text-sm leading-6 text-white/65 sm:text-[15px] sm:leading-7">
                Driving innovation and sustainability across multiple industries
                to create a better future for all.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px w-full bg-white/10 md:my-12" />

          {/* Bottom Section */}
          <div className="flex flex-col gap-5 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <p className="leading-6">
              © 2026 Verdant Vale Group. All rights reserved.
            </p>

            {/* Designed By */}
            <p className="flex flex-wrap items-center justify-center gap-1 leading-6">
              Designed with
              <Heart
                className="mx-0.5 h-3.5 w-3.5 fill-current text-red-400"
                strokeWidth={1.5}
              />
              by{" "}
              <a
                href="https://marchstreetmedia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  font-medium
                  text-white/80
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                March Street Media
              </a>
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Privacy Policy
              </button>

              <span className="text-white/20">|</span>

              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {activeModal && (
        <LegalModal type={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
