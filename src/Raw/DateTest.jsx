import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTest = () => {
  const [filterOption, setFilterOption] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const cardData = [
    { id: 1, date: "15 Jul 2023", title: "Card 1" },
    { id: 2, date: "20 Jul 2023", title: "Card 2" },
    { id: 3, date: "5 Jul 2023", title: "Card 3" },
    { id: 4, date: "10 Jul 2023", title: "Card 4" },
    { id: 5, date: "25 Jul 2023", title: "Card 5" },
  ];

  const applyFilter = () => {
    let filteredCards = [];

    switch (filterOption) {
      case "all":
        filteredCards = cardData;
        break;
      case "today":
        filteredCards = cardData.filter((card) =>
          moment(card.date, "D MMM YYYY").isSame(moment(), "day")
        );
        break;
      case "yesterday":
        filteredCards = cardData.filter((card) =>
          moment(card.date, "D MMM YYYY").isSame(
            moment().subtract(1, "day"),
            "day"
          )
        );
        break;
      case "lastWeek":
        filteredCards = cardData.filter((card) =>
          moment(card.date, "D MMM YYYY").isBetween(
            moment().subtract(1, "week"),
            moment(),
            null,
            "[]"
          )
        );
        break;
      case "lastMonth":
        filteredCards = cardData.filter((card) =>
          moment(card.date, "D MMM YYYY").isBetween(
            moment().subtract(1, "month"),
            moment(),
            null,
            "[]"
          )
        );
        break;
      case "lastYear":
        filteredCards = cardData.filter((card) =>
          moment(card.date, "D MMM YYYY").isBetween(
            moment().subtract(1, "year"),
            moment(),
            null,
            "[]"
          )
        );
        break;
      default:
        filteredCards = cardData;
    }

    if (selectedDate) {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "D MMM YYYY").isSame(selectedDate, "day")
      );
    }

    if (startDate && endDate) {
      filteredCards = filteredCards.filter((card) =>
        moment(card.date, "D MMM YYYY").isBetween(
          startDate,
          endDate,
          null,
          "[]"
        )
      );
    }

    return filteredCards.map((card) => (
      <div key={card.id} className="bg-gray-100 p-4 m-2">
        <h3>{card.title}</h3>
        <p>{card.date}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className="flex mb-4">
        <div className="mr-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filterOption === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterOption("all")}
          >
            All
          </button>
        </div>
        <div className="mr-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filterOption === "today"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterOption("today")}
          >
            Today
          </button>
        </div>
        <div className="mr-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filterOption === "yesterday"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterOption("yesterday")}
          >
            Yesterday
          </button>
        </div>
        <div className="mr-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filterOption === "lastWeek"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterOption("lastWeek")}
          >
            Last Week
          </button>
        </div>
        <div className="mr-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filterOption === "lastMonth"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterOption("lastMonth")}
          >
            Last Month
          </button>
        </div>
        <div className="mr-2">
          <button
            className={`px-4 py-2 rounded-md ${
              filterOption === "lastYear"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterOption("lastYear")}
          >
            Last Year
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="mr-2">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="d MMM yyyy"
          className="px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">Select Date Range:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="d MMM yyyy"
          className="px-2 py-1 border border-gray-300 rounded-md"
        />
        <span className="mx-2">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="d MMM yyyy"
          className="px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-wrap">{applyFilter()}</div>
    </div>
  );
};

export default DateTest;
