import { useState } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState(null);

  const totalItems = items.length;
  const numCards = 5;

  // Calculate visible items around currentIndex
  const getItem = (index) => items[(index + totalItems) % totalItems];

  // When not transitioning, offset is 0. When transitioning, offset is -1 or +1
  const offset = transitioning ? (direction === "Next" ? -1 : 1) : 0;

  const visibleItems = [
    getItem(currentIndex - 2),
    getItem(currentIndex - 1),
    getItem(currentIndex),
    getItem(currentIndex + 1),
    getItem(currentIndex + 2),
  ];

  // Fill to 5 if needed
  while (visibleItems.length < numCards) {
    visibleItems.push(...items);
  }
  visibleItems.splice(numCards);

  const handleTransition = (dir) => {
    if (transitioning) return;

    setDirection(dir);
    setTransitioning(true);

    setTimeout(() => {
      setTransitioning(false);
      setCurrentIndex((prev) =>
        dir === "Next"
          ? (prev + 1) % totalItems
          : (prev - 1 + totalItems) % totalItems,
      );
    }, 500);
  };

  return (
    <div className="relative w-full h-full overflow-hidden p-2 flex items-center justify-center">
      <div className="relative w-[90%] h-full">
        {visibleItems.map((item, index) => {
          const baseOffset = (index - 2 + offset) * 100;

          // Scale logic: center card bigger, adjacent cards medium, others smaller
          let scale = 0.9;
          if (!transitioning) {
            scale = index === 2 ? 1 : 0.9;
          } else {
            if (direction === "Next") {
              scale = index === 3 ? 1 : 0.9;
            } else if (direction === "Prev") {
              scale = index === 1 ? 1 : 0.9;
            }
          }

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-3xl"
              style={{
                transform: `translateX(${baseOffset}%) scale(${scale})`,
                transition: transitioning ? "transform 0.5s ease" : "none",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleTransition("Prev")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
      >
        Prev
      </button>
      <button
        onClick={() => handleTransition("Next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
