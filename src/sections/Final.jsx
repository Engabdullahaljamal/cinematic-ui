export default function Final() {
    return (
        <section id="final" className="final">

            <div className="final__inner">
                <h3 className="final__title">ZERO LIMITS. INFINITE POTENTIAL.</h3>
                <p className="final__p">
                    If I had more time: add preloading, richer micro-interactions, and reduced-motion support.
                </p>

                <a
                    className="btn btn--ghost"
                    href="#top"
                    onClick={(e) => {
                        e.preventDefault();

                        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

                        const animateScrollToTop = (duration = 2000) => {
                            const start = window.scrollY || window.pageYOffset;
                            const startTime = performance.now();

                            const tick = (now) => {
                                const elapsed = now - startTime;
                                const t = Math.min(1, elapsed / duration);
                                const eased = easeOutCubic(t);
                                window.scrollTo(0, start * (1 - eased));
                                if (t < 1) requestAnimationFrame(tick);
                            };

                            requestAnimationFrame(tick);
                        };

                        animateScrollToTop(2200); // ← زِد/خفّف الرقم حسب الذوق
                    }}
                >
                    BACK TO TOP <span className="next-section-arrow">↑</span>
                </a>

            </div>
        </section>
    );
}
