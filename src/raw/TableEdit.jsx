
import React, { useState } from "react";

const Table = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAddItem = () => {
    const newItem = { name, quantity, price };
    setItems((prevItems) => [...prevItems, newItem]);
    setName("");
    setQuantity("");
    setPrice("");
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setName(items[index].name);
    setQuantity(items[index].quantity);
    setPrice(items[index].price);
  };

  const handleSaveClick = (index) => {
    const updatedItem = { name, quantity, price };
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    setEditIndex(null);
    setName("");
    setQuantity("");
    setPrice("");
  };

  const handleDeleteClick = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className="border border-gray-400 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={handlePriceChange}
          className="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
        >
          Add
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {index === editIndex ? (
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border px-4 py-2">
                {index === editIndex ? (
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td className="border px-4 py-2">
                {index === editIndex ? (
                  <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  item.price
                )}
              </td>
              <td className="border px-4 py-2">
                {index === editIndex ? (
                  <button
                    onClick={() => handleSaveClick(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
