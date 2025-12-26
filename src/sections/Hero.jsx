
export default function Hero() {
    return (
        <section className="hero" id="top">
            <div className="hero__frame">
                <div className="hero__top">
                    <div className="hero__logos">
                        <span className="badge">SPRITE</span>
                        <span className="dot" />
                        <span className="badge">WAKANDA</span>
                    </div>
                </div>

                <div className="hero__center">
                    <div className="hero__kicker">THE</div>
                    <h1 className="hero__title">
                        HALL <span className="thin">OF</span>
                        <br />
                        ZERO LIMITS
                    </h1>

                    <p className="hero__sub">
                        EXPLORE NEW PATHS. <span className="muted">FIND YOUR GIFT.</span>
                    </p>

                    <button
                        className="btn btn--primary"
                        onClick={() => {
                            const targetY = window.innerHeight * 1.05;

                            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

                            const animateScrollTo = (to, duration = 2000) => {
                                const start = window.scrollY || window.pageYOffset;
                                const change = to - start;
                                const startTime = performance.now();

                                const tick = (now) => {
                                    const elapsed = now - startTime;
                                    const t = Math.min(1, elapsed / duration);
                                    const eased = easeOutCubic(t);
                                    window.scrollTo(0, start + change * eased);
                                    if (t < 1) requestAnimationFrame(tick);
                                };

                                requestAnimationFrame(tick);
                            };

                            animateScrollTo(targetY, 3000); // ← هون تحكم بالبطء (1800ms)
                        }}
                    >
                        ENTER
                    </button>


                </div>

                <div className="hero__bottom">
                    <div className="scrollHint">
                        <span className="scrollHint__line" />
                        <span className="scrollHint__text">SCROLL</span>
                    </div>
                </div>
            </div>


        </section>
    );
}
