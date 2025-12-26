import NextSectionButton from "../components/NextSectionButton";
import { SECTION_ORDER } from "../constants/sectionOrder";

export default function Details() {
    return (
        <section id="details" className="details">
        

            <div className="container">
                <h3 className="h3">DETAILS</h3>
    <div className="stats__bg">
                <video className="stats__video" autoPlay muted loop playsInline preload="auto">
                    <source src="/cinematic-loop-2.mp4" type="video/mp4" />
                </video>
                <div className="stats__tint" />
                <div className="stats__grain" />
                <div className="stats__vignette" />
            </div>
                <div className="grid">
                    <div className="panel">
                        <div className="panel__k">SCROLL-DRIVEN</div>
                        <div className="panel__v">GSAP + ScrollTrigger</div>
                        <p className="panel__p">
                            One pinned timeline controls the primary transitions for consistent pacing.
                        </p>
                    </div>

                    <div className="panel">
                        <div className="panel__k">PERFORMANCE</div>
                        <div className="panel__v">Transform-first</div>
                        <p className="panel__p">
                            Avoid layout thrash: translate/scale/opacity, and keep effects lightweight.
                        </p>
                    </div>

                    <div className="panel">
                        <div className="panel__k">ATMOSPHERE</div>
                        <div className="panel__v">Grain + Vignette</div>
                        <p className="panel__p">
                            Subtle overlays create the cinematic feel without heavy 3D rendering.
                        </p>
                    </div>
                </div>
            </div>
            <div className="next-section-wrapper">
                <NextSectionButton
                    order={SECTION_ORDER}
                    currentId="details"
                    offset={0}
                />
            </div>

        </section>
    );
}
