import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef } from "react";

import "./ScrambledText.css";

gsap.registerPlugin(ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
  textTag = "p",
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const originalTextRef = useRef("");

  useEffect(() => {
    if (!rootRef.current) return;

    const p = rootRef.current.querySelector(textTag);
    if (!p) return;

    // Save original text and split into span.char elements
    originalTextRef.current = p.textContent || "";
    const text = originalTextRef.current;
    p.textContent = "";
    const fragment = document.createDocumentFragment();
    const spans = [];

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const span = document.createElement("span");
      span.className = "char";
      const isSpace = ch === " ";
      // Render non-breaking space to preserve width, but keep original content in data-content
      span.textContent = isSpace ? "\u00A0" : ch;
      if (isSpace) span.setAttribute("data-space", "true");
      fragment.appendChild(span);
      spans.push(span);
    }
    p.appendChild(fragment);
    charsRef.current = spans;

    // Initialize data-content attribute (store original non-scrambled character)
    charsRef.current.forEach((c) => {
      const originalChar = c.getAttribute("data-space") === "true" ? " " : c.textContent;
      gsap.set(c, {
        display: "inline-block",
        attr: { "data-content": originalChar },
      });
    });

    const handleMove = (e) => {
      charsRef.current.forEach((c) => {
        // Skip scrambling spaces to preserve them
        if (c.getAttribute("data-space") === "true") return;

        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      // Restore original content
      p.textContent = originalTextRef.current;
    };
  }, [radius, duration, speed, scrambleChars, textTag]);

  const TagName = textTag;

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <TagName>{children}</TagName>
    </div>
  );
};

export default ScrambledText;


