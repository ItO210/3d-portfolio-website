import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Loading({ loaded, setShowLoading }) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeString, setTimeString] = useState("");
  const noiseRef = useRef(null);
  const linesRef = useRef(null);
  const vhsRef = useRef(null);
  const timeRef = useRef(null);
  const counterRef = useRef(null);
  const centerRef = useRef(null);
  const dotsRef = useRef(null);
  const enterRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const engRef = useRef(null);
  const spaRef = useRef(null);
  const jpRef = useRef(null);

  const pad = (val) => (val < 10 ? "0" + val : val);

  // Update counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update live clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours();
      const m = pad(now.getMinutes());
      const s = pad(now.getSeconds());
      setTimeString(`${h}:${m}:${s}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const textShadows = [
    `0 0 6px rgba(255,150,150,0.5),
   0 0 8px rgba(255,80,80,0.7),
   0 0 10px rgba(255,0,0,0.6)`,

    `2px 0 4px rgba(255,80,80,0.6),
   0 2px 4px rgba(255,40,40,0.6),
   0 0 8px rgba(200,0,0,0.5)`,

    `-2px 0 4px rgba(255,80,80,0.6),
   0 -2px 4px rgba(255,40,40,0.6),
   0 0 8px rgba(200,0,0,0.5)`,
  ];

  // GSAP animations for noise, scanlines, and text shadows
  useEffect(() => {
    gsap.to(linesRef.current, {
      backgroundPosition: "0px 6px",
      duration: 0.2,
      repeat: -1,
      ease: "none",
    });

    gsap.to(linesRef.current, {
      keyframes: [
        { opacity: 0.6, duration: 0.6 },
        { opacity: 0.3, duration: 0.6 },
        { opacity: 0.5, duration: 0.45 },
        { opacity: 0.8, duration: 0.45 },
        { opacity: 0.4, duration: 0.6 },
        { opacity: 0.7, duration: 0.6 },
        { opacity: 0.6, duration: 0.6 },
      ],
      repeat: -1,
      ease: "linear",
    });

    gsap.to(vhsRef.current, {
      keyframes: textShadows.map((shadow) => ({
        textShadow: shadow,
        duration: 0.25,
      })),
      repeat: -1,
      yoyo: true,
      ease: "steps(9)",
    });

    gsap.to([timeRef.current, counterRef.current], {
      keyframes: textShadows.map((shadow) => ({
        textShadow: shadow,
        duration: 0.15,
      })),
      repeat: -1,
      yoyo: true,
      ease: "steps(9)",
    });

    gsap.to(centerRef.current, {
      keyframes: textShadows.map((shadow) => ({
        textShadow: shadow,
        duration: 0.25,
      })),
      repeat: -1,
      yoyo: true,
      ease: "steps(9)",
    });
  }, []);

  useEffect(() => {
    let tween;
    if (!loaded && dotsRef.current) {
      tween = gsap.to(dotsRef.current, {
        keyframes: [
          { innerHTML: "", duration: 0.375 },
          { innerHTML: ".", duration: 0.375 },
          { innerHTML: "..", duration: 0.375 },
          { innerHTML: "...", duration: 0.375 },
        ],
        repeat: -1,
        ease: "steps(4)",
      });
    }
    return () => {
      if (tween) tween.kill();
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !enterRef.current) return;
    gsap.to(enterRef.current, {
      keyframes: textShadows.map((shadow) => ({
        textShadow: shadow,
        duration: 0.2,
      })),
      repeat: -1,
      yoyo: true,
      ease: "steps(9)",
    });
  }, [loaded]);

  useEffect(() => {
    if (!enterRef.current) return;

    if (hovered) {
      // Show Japanese (move up)
      gsap.to(jpRef.current, {
        y: -80,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Keep English in place
      gsap.to(engRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Show Spanish (move down)
      gsap.to(spaRef.current, {
        y: 80,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Reset: Japanese and Spanish go back to center and fade out
      gsap.to([jpRef.current, spaRef.current], {
        y: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Ensure English is centered and visible
      gsap.to(engRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [hovered]);
  return (
    <div className="w-full h-full bg-neutral-800 text-white pointer-events-auto select-none font-mono ">
      {/* Scanlines */}
      <div
        ref={linesRef}
        className="fixed inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
          backgroundSize: "100% 6px",
        }}
      />

      {/* Main content */}
      <div className="h-full w-full p-8 flex flex-col justify-between ">
        {/* Top bar */}
        <div className="flex justify-between text-4xl">
          <div ref={vhsRef}>VHS</div>
          <div ref={timeRef}>{timeString}</div>
        </div>
        <div
          ref={centerRef}
          className="flex w-full items-center justify-center h-full text-center text-5xl"
        >
          {loaded ? (
            <button
              ref={enterRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative bg-transparent w-70 h-60 cursor-pointer text-white text-5xl "
              onClick={() => setShowLoading(false)}
            >
              <span
                ref={jpRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
              >
                スタート
              </span>
              <span
                ref={engRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                Start
              </span>
              <span
                ref={spaRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
              >
                Iniciar
              </span>
            </button>
          ) : (
            <>
              Loading<span ref={dotsRef}></span>
            </>
          )}
        </div>

        {/* Bottom left counter */}
        <div ref={counterRef} className="text-4xl">
          REC {pad(Math.floor(totalSeconds / 60))}:{pad(totalSeconds % 60)}
        </div>
      </div>
    </div>
  );
}
