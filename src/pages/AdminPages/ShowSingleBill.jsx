import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from "date-fns";
const ShowSingleBill = () => {
const [singleBill, setSingleBill] = useState()

	const [loading, setLoading] = useState(false);
const {id} =useParams()

useEffect(() => {
    setLoading(true);
    try {
      
      axios(`https://khatabook-one.vercel.app/getcustomerbill/${id}`, {
        method: "GET",
        

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setSingleBill(res?.data?.response);
          setLoading(false);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
	<>
	
	<div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between bg-blue-500 text-white px-6 py-4 items-center">
          <h1 className="text-2xl font-bold">Bill</h1>
          {/* <p className='font-bold text-2xl'>Date: {format(new Date(singleBill?.createdAt), "dd/MMM/yyyy")}</p> */}
          <p className=''>Date: {singleBill?.createdAt}</p>
        </div>
        <div className="flex justify-between px-6 py-4">
          <div>
            <h2 className="text-xl font-bold">Acme Corporation</h2>
            <p>123 Main Street</p>
            <p>City, State, ZIP</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p>456 Elm Street</p>
            <p>City, State, ZIP</p>
            <p>Phone: (987) 654-3210</p>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Unit Price</th>
              <th className="py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Product 1</td>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">$10.00</td>
              <td className="py-2 px-4">$20.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Product 2</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">$15.00</td>
              <td className="py-2 px-4">$15.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Product 3</td>
              <td className="py-2 px-4">3</td>
              <td className="py-2 px-4">$12.00</td>
              <td className="py-2 px-4">$36.00</td>
            </tr>
          </tbody>
          <tfoot className="bg-gray-200 text-gray-800">
            <tr>
              <td colSpan="3" className="text-right py-2 px-4 font-bold">
                Subtotal:
              </td>
              <td className="py-2 px-4">$71.00</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-right py-2 px-4 font-bold">
                Tax (8%):
              </td>
              <td className="py-2 px-4">$5.68</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-right py-2 px-4 font-bold">
                Total:
              </td>
              <td className="py-2 px-4">$76.68</td>
            </tr>
          </tfoot>
        </table>
        <div className="flex justify-end mt-4 mr-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Print
          </button>
        </div>
      </div>
    </div>
	
	
	</>
  )
}

export default ShowSingleBill