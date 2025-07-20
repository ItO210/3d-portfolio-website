import Carousel from "../ui/Carousel.jsx";
import createCards from "../../utils/cardFactory.jsx";
export default function GamesPage() {
  const cards = createCards(5);
  return (
    <div className="w-full h-full text-2xl bg-neutral-100">
      <Carousel items={cards} />;
    </div>
  );
}
