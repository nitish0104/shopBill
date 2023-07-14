import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateTest = () => {
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const cards = [
    { title: "Card 1", date: "15 Jul 2023" },
    { title: "Card 2", date: "16 Jul 2023" },
    { title: "Card 3", date: "12 Jul 2023" },
    { title: "Card 4", date: "3 Jun 2023" },
    { title: "Card 5", date: "1 Jan 2022" },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filterCards = () => {
    let filteredCards = cards;

    if (filter === "today") {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isSame(moment(), "day")
      );
    } else if (filter === "yesterday") {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isSame(
          moment().subtract(1, "day"),
          "day"
        )
      );
    } else if (filter === "last-week") {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isAfter(
          moment().subtract(1, "week"),
          "day"
        )
      );
    } else if (filter === "last-month") {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isAfter(
          moment().subtract(1, "month"),
          "day"
        )
      );
    } else if (filter === "last-year") {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isAfter(
          moment().subtract(1, "year"),
          "day"
        )
      );
    } else if (filter === "selected-date" && selectedDate) {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isSame(selectedDate, "day")
      );
    } else if (filter === "range" && startDate && endDate) {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "DD MMM YYYY").isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        )
      );
    }

    return filteredCards;
  };

  const filteredCards = filterCards();

  return (
    <div className="flex">
      <div>
        <select value={filter} onChange={handleFilterChange} className="mr-2">
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-year">Last Year</option>
          <option value="selected-date">Select Date</option>
          <option value="range">Select Range</option>
        </select>

        {filter === "selected-date" && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd MMM yyyy"
            className="mr-2"
          />
        )}

        {filter === "range" && (
          <DatePicker
            selected={startDate}
            onChange={handleRangeChange}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd MMM yyyy"
            className="mr-2"
          />
        )}
      </div>

      <div>
        {filteredCards.map((card, index) => (
          <div key={index} className="bg-gray-200 p-2 m-2">
            <h3>{card.title}</h3>
            <p>{card.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateTest;
