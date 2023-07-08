import React, { useState } from "react";
import { format } from "date-fns";

const CardComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const formattedDate = format(selected, "dd MMM yyyy");
    setSelectedDate(formattedDate);
    console.log(formattedDate);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-8">
        <input
          type="date"
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-8">
        {selectedDate && (
          <p className="text-center">Selected Date: {selectedDate}</p>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
