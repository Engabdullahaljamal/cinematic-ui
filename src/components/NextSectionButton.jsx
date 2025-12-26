import { useMemo } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


export default function NextSectionButton({

  order,
  currentId,
  offset = 0,
  label = "Next",
}) {
  const nextId = useMemo(() => {
    if (!Array.isArray(order) || !currentId) return null;
    const index = order.indexOf(currentId);
    return index !== -1 ? order[index + 1] : null;
  }, [order, currentId]);
  const handleClick = () => {
    if (!nextId) return;

    const target = document.getElementById(nextId);
    if (!target) return;

    const y =
      target.getBoundingClientRect().top +
      window.scrollY -
      Number(offset || 0);
    window.__autoScrolling = true;

    // مهم: اقتل أي tween سابق على السكرول
    gsap.killTweensOf(window);

    gsap.to(window, {
      scrollTo: y,
      duration: 3,
      ease: "power2.out",
      overwrite: "auto", // مهم: امنع التزاحم
    });

  };

  if (!nextId) return null;

  return (
    <button
      className="next-section-btn"
      onClick={handleClick}
      aria-label={`Go to ${nextId}`}
    >
      <span className="next-section-label">{label}</span>
      <span className="next-section-arrow">↓</span>
    </button>
  );
}

