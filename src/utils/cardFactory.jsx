export const createCards = (count) => {
  const colors = ["#ee4035", "#f37736", "#fdf498", "#7bc043", "#0392cf"];

  return Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className="w-full h-full flex items-center justify-center rounded-3xl text-white text-2xl"
      style={{ backgroundColor: colors[i % colors.length] }}
    >
      {`Card ${i + 1}`}
    </div>
  ));
};

export const createImageCards = (images) => {
  return images.map((image, index) => (
    <div
      key={index}
      className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden"
    >
      <img
        src={image.src}
        alt={image.alt || `Image ${index + 1}`}
        className="object-cover w-full h-full"
      />
    </div>
  ));
};
