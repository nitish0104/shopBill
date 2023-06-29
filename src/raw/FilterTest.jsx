// import React, { useState } from "react";

// const Card = ({ date, title }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//       <p className="text-gray-600">{date}</p>
//       <h2 className="text-xl font-bold">{title}</h2>
//     </div>
//   );
// };

// const FilterTest = () => {
//   const cards = [
//     { id: 1, date: "2023-06-25", title: "Card 1" },
//     { id: 2, date: "2023-06-26", title: "Card 2" },
//     { id: 3, date: "2023-06-27", title: "Card 3" },
//     { id: 4, date: "2023-06-28", title: "Card 4" },
//     { id: 5, date: "2023-06-29", title: "Card 5" },
//     // ... add more cards
//   ];
//   const [filter, setFilter] = useState("all");
//   const [selectedDate, setSelectedDate] = useState("");

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const filteredCards = cards.filter((card) => {
//     if (filter === "all") return true;

//     const cardDate = new Date(card.date);
//     const today = new Date();

//     if (filter === "today") {
//       return cardDate.toDateString() === today.toDateString();
//     }

//     if (filter === "yesterday") {
//       const yesterday = new Date(today);
//       yesterday.setDate(yesterday.getDate() - 1);
//       return cardDate.toDateString() === yesterday.toDateString();
//     }

//     if (filter === "lastweek") {
//       const lastWeek = new Date(today);
//       lastWeek.setDate(lastWeek.getDate() - 7);
//       return cardDate >= lastWeek && cardDate <= today;
//     }

//     if (filter === "lastmonth") {
//       const lastMonth = new Date(today);
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       return cardDate >= lastMonth && cardDate <= today;
//     }

//     if (filter === "lastyear") {
//       const lastYear = new Date(today);
//       lastYear.setFullYear(lastYear.getFullYear() - 1);
//       return cardDate >= lastYear && cardDate <= today;
//     }

//     return true;
//   });

//   const filteredCardsByDate = selectedDate
//     ? filteredCards.filter(
//         (card) => card.date === selectedDate.toString().split("T")[0]
//       )
//     : filteredCards;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4">
//         <select
//           value={filter}
//           onChange={handleFilterChange}
//           className="p-2 rounded-lg"
//         >
//           <option value="all">All</option>
//           <option value="today">Today</option>
//           <option value="yesterday">Yesterday</option>
//           <option value="lastweek">Last Week</option>
//           <option value="lastmonth">Last Month</option>
//           <option value="lastyear">Last Year</option>
//         </select>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           className="p-2 ml-2 rounded-lg"
//         />
//       </div>

//       {filteredCardsByDate.map((card) => (
//         <Card key={card.id} date={card.date} title={card.title} />
//       ))}
//     </div>
//   );
// };

// export default FilterTest;
import React, { useState } from "react";

const cardData = [
  { id: 1, title: "Card 1", date: "29/jun/2023" },
  { id: 2, title: "Card 2", date: "15/Feb/2023" },
  { id: 3, title: "Card 3", date: "05/Mar/2023" },
  { id: 4, title: "Card 4", date: "20/Apr/2023" },
  { id: 5, title: "Card 5", date: "10/May/2023" },
  { id: 6, title: "Card 6", date: "30/Jun/2023" },
  { id: 7, title: "Card 7", date: "15/Jul/2023" },
  { id: 8, title: "Card 8", date: "05/Aug/2023" },
  { id: 9, title: "Card 9", date: "20/Sep/2023" },
  { id: 10, title: "Card 10", date: "10/Oct/2023" },
];

const App = () => {
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredCards = cardData.filter((card) => {
    const cardDate = new Date(card.date);
    const selected = new Date(selectedDate);

    if (filter === "today") {
      const today = new Date();
      return cardDate.toDateString() === today.toDateString();
    } else if (filter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return cardDate.toDateString() === yesterday.toDateString();
    } else if (filter === "lastweek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return cardDate >= lastWeek && cardDate <= new Date();
    } else if (filter === "lastmonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return cardDate >= lastMonth && cardDate <= new Date();
    } else if (filter === "lastyear") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return cardDate >= lastYear && cardDate <= new Date();
    } else {
      return true;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="lastweek">Last Week</option>
          <option value="lastmonth">Last Month</option>
          <option value="lastyear">Last Year</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="mr-2">
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-300 rounded p-4 shadow"
          >
            <h3 className="font-bold mb-2">{card.title}</h3>
            <p>{card.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
