import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NextSectionButton from "../components/NextSectionButton";
import { SECTION_ORDER } from "../constants/sectionOrder";

gsap.registerPlugin(ScrollTrigger);

export default function StatsStage() {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const left = root.querySelector(".stats__left");
        const right = root.querySelector(".stats__right");
        const line = root.querySelector(".stats__line");
        const big = root.querySelector(".stats__big");

        // HMR safety
        ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === root) st.kill();
        });

        gsap.set([left, right], { opacity: 0, y: 24 });
        gsap.set(line, { scaleX: 0 });
        gsap.set(big, { opacity: 0, y: 18 });
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "+=1400",
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });


        tl.to(line, { scaleX: 1, duration: 0.55 }, 0.05);
        tl.to(left, { opacity: 1, y: 0, duration: 0.6 }, 0.12);
        tl.to(right, { opacity: 1, y: 0, duration: 0.6 }, 0.22);
        tl.to(big, { opacity: 1, y: 0, duration: 0.55 }, 0.32);

        // drift motion
        tl.to(left, { y: -18, duration: 0.9 }, 0.7);
        tl.to(right, { y: 18, duration: 0.9 }, 0.7);
        tl.to(big, { y: -10, duration: 0.9 }, 0.7);

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };

    }, []);

    return (
        <section id="stats" ref={ref} className="stats">
            <div className="stats__bg">
                <video className="stats__video" autoPlay muted loop playsInline preload="auto">
                    <source src={`${import.meta.env.BASE_URL}cinematic-loop-2.mp4`} type="video/mp4" />

                </video>
                <div className="stats__tint" />
                <div className="stats__grain" />
                <div className="stats__vignette" />
            </div>
            <div className="stats__inner">
                <div className="stats__top">
                    <div className="stats__tag">CHAPTER IV</div>
                    <div className="stats__title">SIGNALS / METRICS / MOMENTUM</div>
                </div>

                <div className="stats__line" />

                <div className="stats__grid">
                    <div className="stats__left">
                        <div className="stat">
                            <div className="stat__k">SCROLL TIMELINE</div>
                            <div className="stat__v">1 CORE SEQUENCE</div>
                            <div className="stat__p">Pinned + scrubbed. Consistent pacing across scenes.</div>
                        </div>

                        <div className="stat">
                            <div className="stat__k">RENDER STRATEGY</div>
                            <div className="stat__v">TRANSFORM-FIRST</div>
                            <div className="stat__p">Translate/scale/opacity to keep frames smooth.</div>
                        </div>
                    </div>

                    <div className="stats__right">
                        <div className="stat">
                            <div className="stat__k">IMMERSION</div>
                            <div className="stat__v">VIDEO + LIGHT</div>
                            <div className="stat__p">3D replaced with cinematic grading & overlays.</div>
                        </div>

                        <div className="stat">
                            <div className="stat__k">FEEL</div>
                            <div className="stat__v">SMOOTH SCROLL</div>
                            <div className="stat__p">Lenis keeps motion continuous and premium.</div>
                        </div>
                    </div>
                </div>

                <div className="stats__big">
                    LIMITS ARE UI. <span className="accent">MOTION IS STORY.</span>
                </div>
            </div>
            <div className="next-section-wrapper">
                <NextSectionButton
                    order={SECTION_ORDER}
                    currentId="stats"
                    offset={0}
                />
            </div>

        </section>
    );
}
