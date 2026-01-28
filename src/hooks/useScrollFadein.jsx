import { useEffect, useRef, useState } from "react";

const useScrollFadeIn = (
  direction = "up",
  duration = 0.9,
  delay = 0,
  once = false
) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        if (ratio >= 0.20) {
          setVisible(true);
          if (once) setLocked(true);
        }

        if (ratio <= 0.1 && !once) {
          setVisible(false);
        }
      },
      {
        root: null,
        threshold: [0, 0.1, 0.15, 0.25, 0.5, 1],
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const getTransform = (show) => {
    if (show) return "translate3d(0,0,0)";
    switch (direction) {
      case "up":
        return "translate3d(0,60px,0)";
      case "down":
        return "translate3d(0,-60px,0)";
      case "left":
        return "translate3d(-60px,0,0)";
      case "right":
        return "translate3d(60px,0,0)";
      default:
        return "translate3d(0,60px,0)";
    }
  };

  return {
    ref,
    style: {
      opacity: locked || visible ? 1 : 0,
      transform: getTransform(locked || visible),
      transition: `
        opacity ${duration}s ease-out ${delay}s,
        transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s
      `,
      willChange: "opacity, transform",
    },
  };
};

export default useScrollFadeIn;