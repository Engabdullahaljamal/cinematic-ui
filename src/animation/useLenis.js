import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,          // نعومة (كلما أقل = أبطأ/أنعم)
            smoothWheel: true,
            smoothTouch: false
        });

        const raf = (time) => {
            lenis.raf(time);
            ScrollTrigger.update(); // مهم حتى GSAP يظل متزامن
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
}
