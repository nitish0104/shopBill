import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../components/Input/Input";
import { GrAdd, GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./ModalAnimation.css";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const AddCustomerModal = ({ data, setModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModal({ show: false });
    }, 100); // Wait for the closing animation to complete (300ms)
  };
  useEffect(() => {
    setShowModal(true);
  }, [data]);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <CSSTransition
        in={showModal}
        classNames="modal"
        timeout={300}
        unmountOnExit
      >
        <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[100] ">
          <div
            className={
              "relative h-[50vh] w-[90vw] md:w-[50vw]  bg-white rounded-lg "
            }
          >
            {currentPage === 1 && (
              <div>
                <form
                  action=""
                  className=" pt-8 px-5 flex flex-col gap-y-6 justify-center h-full "
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 font-bold text-2xl text-red-600"
                  >
                    <AiOutlineClose />
                  </button>

                  <Input
                    type={"input"}
                    id={"name"}
                    Label={"Customer Name"}
                    placeholder={"Enter the Customer Name"}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className={"w-[95%]"}
                  />

                  <Input
                    type={"number"}
                    id={"number"}
                    Label={"Customer Number"}
                    placeholder={"Enter the Customer Number"}
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    className={"w-[95%]"}
                  />
                  <div className="pt-5 flex justify-center items-center">
                    <Link
                      to={"/add-items"}
                      className="px-3 py-1 bg-blue-500 w-fit rounded-lg text-xl  mx-auto flex items-center gap-x-2"
                    >
                      Next <GrLinkNext />
                    </Link>
                  </div>
                </form>
              </div>
            )}

            {/* {currentPage === 2 && (
            <div className="modal-page flex flex-col justify-center -[90vw] ">
            <button
                className=" py-1 relative top-1 right-36 w-fit rounded-lg text-xl  mx-auto flex items-center "
                onClick={handlePreviousPage}
                >
                <GrLinkPrevious />
                </button>
                
                <div className="p-3 flex items-center w-[90vw] justify-center ">
                <Input
                  type={"text"}
                  id={"item"}
                  Label={"Add Item"}
                  placeholder={"Add Item"}
                  value={items}
                  onChange={(e) => {
                    setItems(e.target.value);
                  }}
                  />
                <GrAdd className="text-3xl " />
              </div>

              <button className="font-semibold mx-auto bg-accent px-2 py-1 text-white rounded-md relative top-36">
                Generate Bill
              </button>
            </div>
          )} */}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AddCustomerModal;
