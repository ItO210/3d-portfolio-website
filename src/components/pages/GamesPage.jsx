export default function GamesPage() {
  const cards = createImageCards(images);
  //const cards = createCards(5);
  return (
    <div className="w-full h-full text-2xl bg-neutral-100 font-mono">
      <Carousel items={cards} />;
    </div>
  );
}
