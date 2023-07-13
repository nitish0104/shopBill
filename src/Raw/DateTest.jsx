import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Card = ({ date }) => {
  return (
    <div className="p-4 border rounded shadow">
      <p>{moment(date).format("MMMM Do, YYYY")}</p>
      {/* Card content */}
    </div>
  );
};

const CardList = ({ dates }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {dates.map((date, index) => (
        <Card key={index} date={date} />
      ))}
    </div>
  );
};

const DateTest = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredDates, setFilteredDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = () => {
    setIsOpen(true);
  };
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setIsOpen(false);

    // Filter the dates based on the selected range
    const filtered = dateArray.filter((date) =>
      moment(date).isBetween(start, end, null, "[]")
    );
    setFilteredDates(filtered);
  };

  // Array of 5 dates
  const dateArray = [
    moment().subtract(2, "days").toDate(),
    moment().subtract(1, "days").toDate(),
    moment().toDate(),
    moment().add(1, "days").toDate(),
    moment().add(2, "days").toDate(),
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Card List</h1>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Select Date Range"
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onClick={handleInputChange}
            value={
              startDate && endDate
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : ""
            }
            readOnly
          />
          {isOpen && (
            <div className="absolute z-10 top-12 left-0">
              <DatePicker
                selected={startDate}
                onChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </div>
          )}
        </div>
      </div>
      <CardList dates={filteredDates.length > 0 ? filteredDates : dateArray} />
    </div>
  );
};

export default DateTest;

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const DateTest = () => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleInputChange = () => {
//     setIsOpen(true);
//   };

//   const handleDateRangeChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Date Range Picker</h1>
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Select Date Range"
//           className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//           onClick={handleInputChange}
//           value={
//             startDate && endDate
//               ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
//               : ""
//           }
//           readOnly
//         />
//         {isOpen && (
//           <div className="absolute z-10 top-12 left-0">
//             <DatePicker
//               selected={startDate}
//               onChange={handleDateRangeChange}
//               startDate={startDate}
//               endDate={endDate}
//               selectsRange
//               inline
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DateTest;
