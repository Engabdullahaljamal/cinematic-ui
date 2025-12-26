import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [p, setP] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const v = h <= 0 ? 0 : window.scrollY / h;
            setP(Math.max(0, Math.min(1, v)));
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="progress" aria-hidden="true">
            <div className="progress__bar" style={{ transform: `scaleY(${p})` }} />
        </div>
    );
}
