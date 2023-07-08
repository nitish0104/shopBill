import React, { useState } from "react";
import { format, subDays, subMonths, subYears } from "date-fns";

const CardFilter = ({ cards }) => {
  const [filterOption, setFilterOption] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const today = format(new Date(), "dd MMM yyyy");
  const yesterday = format(subDays(new Date(), 1), "dd MMM yyyy");
  const lastMonth = format(subMonths(new Date(), 1), "dd MMM yyyy");
  const lastYear = format(subYears(new Date(), 1), "dd MMM yyyy");

  const filteredCards = cards.filter((card) => {
    if (filterOption === "all") return true;
    if (filterOption === "today") return card.date === today;
    if (filterOption === "yesterday") return card.date === yesterday;
    if (filterOption === "lastMonth")
      return card.date >= lastMonth && card.date <= today;
    if (filterOption === "lastYear")
      return card.date >= lastYear && card.date <= today;
    if (filterOption === "selectDate") return card.date === selectedDate;
    return false;
  });

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
    setSelectedDate("");
  };

  const handleSelectedDateChange = (e) => {
    setSelectedDate(e.target.value);
    setFilterOption("selectDate");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <label htmlFor="filterOption" className="mr-2">
          Filter:
        </label>
        <select
          id="filterOption"
          className="p-2 border border-gray-300 rounded"
          value={filterOption}
          onChange={handleFilterOptionChange}
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
          <option value="selectDate">Select Date</option>
        </select>
      </div>

      {filterOption === "selectDate" && (
        <div className="mb-4">
          <label htmlFor="selectedDate" className="mr-2">
            Selected Date:
          </label>
          <input
            id="selectedDate"
            type="date"
            className="p-2 border border-gray-300 rounded"
            value={selectedDate}
            onChange={handleSelectedDateChange}
          />
        </div>
      )}

      <div>
        {filteredCards.map((card) => (
          <div
            className="p-4 my-2 border border-gray-300 rounded"
            key={card.id}
          >
            {/* Render your card component here */}
            <p>Date: {card.date}</p>
            <p>Title: {card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFilter;
