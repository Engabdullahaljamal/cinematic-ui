import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NextSectionButton from "../components/NextSectionButton";
import { SECTION_ORDER } from "../constants/sectionOrder";

gsap.registerPlugin(ScrollTrigger);

export default function ImmersiveStage() {
    const rootRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const door = root.querySelector(".stage__door");
        const headline = root.querySelector(".stage__headline");
        const kicker = root.querySelector(".kicker");
        const hud = root.querySelector(".stage__hud");
        const vignette = root.querySelector(".stage__vignette");
        const video = root.querySelector(".stage__video");
        const tint = root.querySelector(".stage__tint");

        const card1 = root.querySelector(".card--1");
        const card2 = root.querySelector(".card--2");
        const card3 = root.querySelector(".card--3");

        // HMR safety
        ScrollTrigger.getAll()
            .filter(st => st.trigger === root)
            .forEach(st => st.kill());


        // Set initial states (important for Safari)
        gsap.set(hud, { opacity: 0, y: 18 });
        gsap.set([card1, card2, card3], { opacity: 0, y: 40, scale: 0.985 });
        gsap.set(door, { opacity: 0.35, scale: 1 });
        gsap.set(vignette, { opacity: 0.65 });
        gsap.set(video, { scale: 1.02 });
        gsap.set(tint, { opacity: 0.12 });

        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "+=1000",
                scrub: true,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true
            }
        });

        // Phase 1: "Enter the hall"
        tl.to(door, { opacity: 0.55, scale: 1.06, duration: 0.9 }, 0);
        tl.to(video, { scale: 1.05, duration: 0.9 }, 0);

        // Parallax headline
        tl.to(headline, { yPercent: -18, duration: 0.6 }, 0.05);
        tl.to(kicker, { letterSpacing: "0.55em", opacity: 0.9, duration: 0.35 }, 0.05);

        // Phase 2: fade headline out, bring HUD in
        tl.to(headline, { opacity: 0, yPercent: -38, duration: 0.75 }, 0.55);
        tl.to(hud, { opacity: 1, y: 0, duration: 0.55 }, 0.65);

        // Phase 3: cinematic video grading (filter via CSS variable)
        // We'll animate a CSS variable on root for filter control.
        tl.to(root, { "--vBright": 0.86, "--vSat": 1.05, "--vCon": 1.10, duration: 1.1 }, 0.75);
        tl.to(vignette, { opacity: 0.85, duration: 0.9 }, 0.95);
        tl.to(tint, { opacity: 0.22, duration: 0.9 }, 0.95);

        // Cards reveal (stagger)
        tl.to(card1, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.95);
        tl.to(card2, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1.15);
        tl.to(card3, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1.35);

        // Phase 4: slight drift to keep motion alive near the end
        tl.to(door, { scale: 1.085, duration: 0.9 }, 1.55);
        tl.to(video, { scale: 1.07, duration: 0.9 }, 1.55);

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section id="stage" ref={rootRef} className="stage" style={{ "--vBright": 0.72, "--vSat": 0.95, "--vCon": 1.05 }}>

            <div className="stage__bg">
                <video className="stage__video" autoPlay muted loop playsInline preload="auto">
                    <source src="/cinematic-loop-3.mp4" type="video/mp4" />
                </video>

                <div className="stage__tint" />
                <div className="stage__grain" />
                <div className="stage__vignette" />
            </div>

            <div className="stage__content">
                <div className="stage__door" aria-hidden="true" />

                <div className="stage__headline">
                    <div className="kicker">DISCOVER YOUR LEGACY</div>
                    <h2 className="h2">
                        AN IMMERSIVE <span className="accent">SCROLL</span> EXPERIENCE
                    </h2>
                    <p className="p">
                        Cinematic motion without 3D: graded video, layered light, and scrubbed transitions.
                    </p>
                    <div className="next-section-wrapper">
                        <NextSectionButton
                            order={SECTION_ORDER}
                            currentId="stage"
                            offset={0}
                        />
                    </div>
                </div>

                <div className="stage__hud">

                    <div className="hud__row">
                        <div className="hud__pill">ORIGIN STORIES</div>
                        <div className="hud__pill">INSPIRATION</div>
                        <div className="hud__pill">QUIZ</div>



                    </div>


                    <div className="cards">
                        <article className="card card--1">
                            <div className="card__title">CHAPTER I</div>
                            <div className="card__big">LIGHT</div>
                            <div className="card__text">Parallax + fade for a guided reveal.</div>
                        </article>

                        <article className="card card--2">
                            <div className="card__title">CHAPTER II</div>
                            <div className="card__big">DEPTH</div>
                            <div className="card__text">Pinned stage + scrub makes the scroll feel like camera movement.</div>
                        </article>

                        <article className="card card--3">
                            <div className="card__title">CHAPTER III</div>
                            <div className="card__big">RHYTHM</div>
                            <div className="card__text">Staggered content, cinematic pacing, smooth performance.</div>
                        </article>
                    </div>
                </div>
            </div>


        </section>
    );
}
