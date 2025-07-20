import React from "react";

const createCards = (count) => {
  const colors = ["#ee4035", "#f37736", "#fdf498", "#7bc043", "#0392cf"];

  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(
      <div
        key={i}
        className="w-full h-full flex items-center justify-center rounded-3xl text-white text-2xl"
        style={{ backgroundColor: colors[i % colors.length] }}
      >
        {`Card ${i + 1}`}
      </div>,
    );
  }
  return cards;
};

export default createCards;
