import Carousel from "../ui/Carousel.jsx";
import { createImageCards } from "../../utils/cardFactory.jsx";

const images = [
  { src: "/images/a.png", alt: "First image" },
  { src: "/images/profile.jpeg", alt: "Second image" },
];

export default function GamesPage() {
  const cards = createImageCards(images);
  //const cards = createCards(5);
  return (
    <div className="w-full h-full text-2xl bg-neutral-100">
      <Carousel items={cards} />;
    </div>
  );
}
