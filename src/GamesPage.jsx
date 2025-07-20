import Carousel from "./Carousel.jsx";
export default function GamesPage() {
  const cards = [
    <div
      key="1"
      className="w-full h-full bg-red-500 rounded-3xl flex items-center justify-center text-white text-2xl"
    >
      Card 1
    </div>,
    <div
      key="2"
      className="w-full h-full bg-blue-500 rounded-3xl flex items-center justify-center text-white text-2xl"
    >
      Card 2
    </div>,
    <div
      key="3"
      className="w-full h-full bg-green-500 rounded-3xl flex items-center justify-center text-white text-2xl"
    >
      Card 3
    </div>,
    // more cards...
  ];
  return (
    <div className="w-full h-full text-2xl bg-neutral-100">
      <Carousel items={cards} />;
    </div>
  );
}
