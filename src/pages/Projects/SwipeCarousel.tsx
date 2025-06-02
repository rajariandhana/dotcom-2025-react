import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { motion, useMotionValue } from "framer-motion";

const AUTO_DELAY = 5000;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

type SwipeCarouselProps = {
  imgs: string[];
};

export const SwipeCarousel = ({ imgs }: SwipeCarouselProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (imgs.length === 0) return;

    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((pv) => (pv === imgs.length - 1 ? 0 : pv + 1));
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [imgs, dragX]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  if (imgs.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-white w-full !p-0">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing !p-0"
      >
        <Images imgs={imgs} imgIndex={imgIndex} />
      </motion.div>

      <Dots imgs={imgs} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
};

const Images = ({
  imgs,
  imgIndex,
}: {
  imgs: string[];
  imgIndex: number;
}) => (
  <>
    {imgs.map((imgSrc, idx) => (
      <motion.div
        key={idx}
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{
          scale: imgIndex === idx ? 0.95 : 0.85,
        }}
        transition={SPRING_OPTIONS}
        className="aspect-video !w-full shrink-0 rounded-xl bg-neutral-800 object-cover !p-0"
      />
    ))}
  </>
);

const Dots = ({
  imgs,
  imgIndex,
  setImgIndex,
}: {
  imgs: string[];
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => (
  <div className="mt-2 flex w-full justify-center gap-2">
    {imgs.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setImgIndex(idx)}
        className={`h-3 w-3 rounded-full transition-colors ${
          idx === imgIndex ? "bg-indigo-500" : "bg-indigo-200"
        }`}
      />
    ))}
  </div>
);