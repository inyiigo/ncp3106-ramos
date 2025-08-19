import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from "react-icons/fi";

import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText className="carousel-icon" />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle className="carousel-icon" />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers className="carousel-icon" />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout className="carousel-icon" />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode className="carousel-icon" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function Slide({
  x,
  index,
  trackItemOffset,
  itemWidth,
  round,
  effectiveTransition,
  variant,
  item,
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`carousel-item ${round ? "round" : ""}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={effectiveTransition}
    >
      {variant === "image" && item?.imageSrc ? (
        <div className="carousel-image-wrapper">
          <img src={item.imageSrc} alt={item.title || `Slide ${index + 1}`} className="carousel-image" />
          <div className="carousel-caption">
            {item.title && <div className="carousel-item-title">{item.title}</div>}
            {item.description && (
              <p className="carousel-item-description">{item.description}</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={`carousel-item-header ${round ? "round" : ""}`}>
            <span className="carousel-icon-container">
              {item?.icon}
            </span>
          </div>
          <div className="carousel-item-content">
            <div className="carousel-item-title">{item?.title}</div>
            <p className="carousel-item-description">{item?.description}</p>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  variant = "default", // "default" | "image"
}) {
  const hasItems = Array.isArray(items) && items.length > 0;
  const safeItems = hasItems ? items : [];

  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop && hasItems ? [...safeItems, safeItems[0]] : safeItems;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const normalizedIndex = hasItems ? currentIndex % safeItems.length : 0;

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay) return;
    if (pauseOnHover && isHovered) return;
    if (!hasItems) return;
    const timer = setInterval(() => {
      next();
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, hasItems]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop) return;
    if (!hasItems) return;
    if (currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    if (!hasItems) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      next();
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      prev();
    }
  };

  const next = () => {
    if (!hasItems) return;
    if (loop && currentIndex === safeItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
    }
  };

  const prev = () => {
    if (!hasItems) return;
    if (loop && currentIndex === 0) {
      setCurrentIndex(safeItems.length - 1);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
      }}
    >
      {/* Arrows */}
      <button className="carousel-arrow left" onClick={prev} aria-label="Previous slide">
        <FiChevronLeft />
      </button>
      <button className="carousel-arrow right" onClick={next} aria-label="Next slide">
        <FiChevronRight />
      </button>

      {/* Counter */}
      <div className="carousel-counter">
        {hasItems ? normalizedIndex + 1 : 0}/{safeItems.length}
      </div>

      <motion.div
        className="carousel-track"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <Slide
            key={item?.id ?? index}
            x={x}
            index={index}
            trackItemOffset={trackItemOffset}
            itemWidth={itemWidth}
            round={round}
            effectiveTransition={effectiveTransition}
            variant={variant}
            item={item}
          />
        ))}
      </motion.div>

      {/* Thumbnails / indicators */}
      <div className="carousel-thumbs">
        {safeItems.map((thumb, i) => (
          <button
            key={thumb?.id ?? i}
            className={`carousel-thumb ${i === normalizedIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {thumb?.imageSrc ? (
              <img src={thumb.imageSrc} alt={thumb.title || `Thumb ${i + 1}`} />
            ) : (
              <span className="carousel-thumb-dot" />
            )}
          </button>
        ))}
      </div>

      {/* Dot indicators remain for non-image variant */}
      {variant !== "image" && (
        <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
          <div className="carousel-indicators">
            {safeItems.map((_, index) => (
              <motion.div
                key={index}
                className={`carousel-indicator ${normalizedIndex === index ? "active" : "inactive"}`}
                animate={{
                  scale: normalizedIndex === index ? 1.2 : 1,
                }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


