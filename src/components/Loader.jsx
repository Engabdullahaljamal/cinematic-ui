import { useEffect, useState } from "react";

export default function Loader({ videoSrc = "/cinematic-loop.mp4", minMs = 700, maxMs = 3500 }) {
    const [done, setDone] = useState(false);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        let alive = true;
        let minTimer = null;
        let maxTimer = null;

        const start = performance.now();

        const finish = () => {
            if (!alive) return;
            setDone(true);
            // fade out after small delay for nicer feel
            setTimeout(() => {
                if (!alive) return;
                setHide(true);
            }, 300);
        };

        // Ensure loader shows at least minMs (prevents flash)
        minTimer = setTimeout(() => {
            // if video already ready, finish now
            // otherwise we'll finish when canplaythrough fires or max timeout happens
        }, minMs);

        // Safety: never block longer than maxMs
        maxTimer = setTimeout(() => {
            finish();
        }, maxMs);

        // Preload video
        const v = document.createElement("video");
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.src = videoSrc;

        const onReady = () => {
            const elapsed = performance.now() - start;
            const remaining = Math.max(0, minMs - elapsed);
            setTimeout(() => {
                finish();
            }, remaining);
        };

        v.addEventListener("canplaythrough", onReady, { once: true });
        v.addEventListener("loadeddata", onReady, { once: true });

        // iOS/Safari sometimes needs load()
        try {
            v.load();
        } catch { }

        return () => {
            alive = false;
            clearTimeout(minTimer);
            clearTimeout(maxTimer);
            v.removeEventListener("canplaythrough", onReady);
            v.removeEventListener("loadeddata", onReady);
        };
    }, [videoSrc, minMs, maxMs]);

    if (hide) return null;

    return (
        <div className={`loader ${done ? "loader--done" : ""}`} aria-label="Loading">
            <div className="loader__inner">
                <div className="loader__brand">
                    <span className="loader__dot" />
                    <span className="loader__title">ZERO LIMITS</span>
                </div>

                <div className="loader__bar">
                    <div className={`loader__barFill ${done ? "loader__barFill--done" : ""}`} />
                </div>

                <div className="loader__hint">Loading experience…</div>
            </div>
        </div>
    );
}
