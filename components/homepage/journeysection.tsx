"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

const carouselItems = [
  { id: 1, url: "/sections/l1.webp", title: "Misty Mountain Majesty" },
  { id: 2, url: "/sections/l2.webp", title: "Winter Wonderland" },
  { id: 3, url: "/sections/l3.webp", title: "Autumn Mountain Retreat" },
  { id: 4, url: "/sections/l4.webp", title: "Tranquil Lake Reflection" },
  { id: 5, url: "/sections/l5.webp", title: "Misty Mountain Peaks" },
];

export default function journeysection() {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  // intersection observer to animate entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // slide animation for carousel
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth || 1;
    const targetX = -index * containerWidth;
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  }, [index, x]);

  // keep x in sync on resize
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth || 1;
      x.set(-index * containerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, x]);

  // collapsed height (px) shown when not expanded
  const COLLAPSED_HEIGHT = 192; // 12rem (approx)

  return (
    <section
      ref={sectionRef}
      className="why-choose-section py-16 md:py-24 overflow-hidden w-full relative bg-pattern"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT: TEXT */}
          <div>
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              Your unrivaled sensory journey within Mor Thai Marrakech!
            </h2>

            {/* separator with centered SVG and lines on both sides */}
            <div className="flex items-center gap-4 mb-6" aria-hidden="true" role="presentation">
              <span className="flex-1 h-[2px] bg-[#ead9d5]" />

              <div className="flex-shrink-0 px-3 flex items-center justify-center text-[#ead9d5]">
                {/* filled SVG (keeps the fill color) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 66 66" aria-hidden="true">
                  <g transform="translate(1 1)">
                    <g fill="#ead9d5" stroke="#ead9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                      <path d="M44.7 17.5c1.9-1.3 4-2.5 6.1-3.4 1.6 3.8 2.5 7.7 2.8 11.5M11.9 25.4c.2-3.8 1.1-7.6 2.7-11.4 2.3 1 4.5 2.3 6.5 3.7M27.1 58.4C12.8 55.7 2 43.1 2 28c3.5 0 6.8.6 9.9 1.6 2.2.8 4.4 1.8 6.3 3M38.8 58.4C53.2 55.7 64 43.1 64 28c-3.7 0-7.2.6-10.4 1.8-2.1.7-4 1.7-5.8 2.8M33 59c14.3-14.4 14.3-37.6 0-52-7.2 7.2-10.8 16.6-10.8 26S25.8 51.8 33 59z" />
                    </g>
                  </g>
                </svg>
              </div>

              <span className="flex-1 h-[2px] bg-[#ead9d5]" />
            </div>

            {/* collapsible paragraph with framer-motion height animation (no inline CSS) */}
            <div className="text-gray-600 space-y-4 text-sm md:text-base leading-relaxed text-justify transition-all duration-500 ease-out delay-100">
              <motion.div
                id="why-choose-content"
                className="relative overflow-hidden"
                // animate height between a fixed pixel (collapsed) and 'auto' (expanded)
                initial={false}
                animate={{ height: expanded ? "auto" : COLLAPSED_HEIGHT }}
                transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
                layout
                aria-expanded={expanded ? "true" : "false"} // valid ARIA string value
              >
                <div className="space-y-4 text-sm md:text-base leading-relaxed text-justify px-0 py-0">
                  <p>
                    We recommend you to arrive 10 to 20 minutes before your appointment to allow you to disconnect from the outside world, and immerse yourself smoothly in the Zen atmosphere of the Spa:
                  </p>

                  <p>
                    To facilitate your access to the SPA, we provide a private parking just in front of the building, reserved exclusively for our guests.
                  </p>

                  <p>
                    On your arrival, you will be welcomed by our hostess and therapist to a pleasant and relaxing atmosphere, with a welcome hot or cold drink depending on the season; also refreshing wet towels with the scent of green tea, Ylang Ylang or lavender.
                  </p>

                  <p>
                    Our hostess will guide you through choosing the best treatment depending on your desires and needs. She will ensure that you have no allergies to any products or oils used in your treatment.
                  </p>

                  <p>
                    Once you have chosen your treatment, your therapist will accompany you to our comfortable and private changing room. To ensure complete comfort and well-being we provide everything you need: Lockers, bathrobes, disposable underwear and slippers.
                  </p>

                  <p>
                    In your treatment room, to make your massage even more pleasant, the temperature will be adjusted according to the season and your preference. During winter and for your comfort, we have heated mattresses on the massage table.
                  </p>

                  <p>
                    After your massage, you are welcomed to take a shower, you will be provided with everything you need—towels and a hair dryer. However we do recommend not taking a shower immediately after the massage to allow your body to continue enjoying the benefits of the organic oils used. Especially as certain essential oils can take more than an hour to be absorbed by your skin.
                  </p>

                  <p>
                    Finally, to prolong this feeling of well-being and relaxation, you will be invited to the relaxing area to enjoy a hot herbal tea in peace.
                  </p>
                </div>

                {/* gradient overlay when collapsed using Tailwind classes (no inline style) */}
                {!expanded && (
                  <div className="absolute left-0 right-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-white/95 to-transparent" />
                )}
              </motion.div>

              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline decoration-1"
                aria-controls="why-choose-content"
                aria-expanded={expanded ? "true" : "false"} // valid ARIA string value for linters
              >
                {expanded ? "Read less" : "Read more"}
                <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l4 4 4-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT: CAROUSEL */}
          <div className={`transition-all duration-700 ease-out delay-150 ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"}`}>
            <div className="relative overflow-hidden rounded-lg" ref={containerRef}>
              <motion.div className="flex" style={{ x }}>
                {carouselItems.map((item) => (
                  <div key={item.id} className="shrink-0 w-full h-[450px]">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Prev */}
              <button
                type="button"
                aria-label="Previous"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform ${index === 0 ? "opacity-40 cursor-not-allowed bg-white/80" : "bg-white hover:scale-110 opacity-90"}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next */}
              <button
                type="button"
                aria-label="Next"
                disabled={index === carouselItems.length - 1}
                onClick={() => setIndex((i) => Math.min(carouselItems.length - 1, i + 1))}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform ${index === carouselItems.length - 1 ? "opacity-40 cursor-not-allowed bg-white/80" : "bg-white hover:scale-110 opacity-90"}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/20 rounded-xl border border-white/30">
                {carouselItems.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
