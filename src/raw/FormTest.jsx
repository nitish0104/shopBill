import React, { useState } from "react";

const TestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    completed: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      completed: true,
    }));
  };

  const handleEditClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      completed: false,
    }));
  };

  const handleSaveClick = () => {
    // Save the form data here
    setFormData((prevData) => ({
      ...prevData,
      completed: true,
    }));
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={formData.completed}
            required
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={formData.completed}
            required
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={formData.completed}
            required
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {!formData.completed ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Complete Form
          </button>
        ) : (
          <div>
            <button
              type="button"
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Save{" "}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TestForm;
