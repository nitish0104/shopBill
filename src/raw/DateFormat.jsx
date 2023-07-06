import React from "react";

function formatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options);
}

const Card = ({ date }) => {
  const formattedDate = formatDate(date);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <p className="text-lg font-bold mb-2">{formattedDate}</p>
    </div>
  );
};

const DateFormat = () => {
  const cards = [
    { date: "2023-01-15" },
    { date: "2023-02-20" },
    { date: "2023-03-10" },
    { date: "2023-04-05" },
    { date: "2023-05-28" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} date={card.date} />
        ))}
      </div>
    </div>
  );
};

export default DateFormat;
