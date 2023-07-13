import React, { useState } from "react";
import moment from "moment";

const Card = ({ title, date }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500">{moment(date).format("MMMM Do, YYYY")}</p>
    </div>
  );
};

const CardList = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} date={card.date} />
      ))}
    </div>
  );
};

const Calendar = ({ onRangeSelect }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleRangeSelect = () => {
    if (startDate && endDate) {
      onRangeSelect(startDate, endDate);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="border rounded p-2"
        placeholder="Select start date"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="text"
        className="border rounded p-2"
        placeholder="Select end date"
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        onClick={handleRangeSelect}
      >
        Apply Filter
      </button>
    </div>
  );
};

const DateTest = () => {
  const initialCards = [
    { title: "Card 1", date: "2023-07-01" },
    { title: "Card 2", date: "2023-07-05" },
    { title: "Card 3", date: "2023-07-10" },
    { title: "Card 4", date: "2023-07-15" },
    { title: "Card 5", date: "2023-07-20" },
  ];

  const [filteredCards, setFilteredCards] = useState(initialCards);

  const handleRangeSelect = (startDate, endDate) => {
    const filtered = initialCards.filter((card) => {
      const cardDate = moment(card.date);
      return cardDate.isBetween(startDate, endDate, "day", "[]");
    });
    setFilteredCards(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Card List</h1>
      <Calendar onRangeSelect={handleRangeSelect} />
      <CardList cards={filteredCards} />
    </div>
  );
};

export default DateTest;
