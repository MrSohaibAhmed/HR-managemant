import React, { useEffect, useState } from "react";

const AttendenceModal = ({ closeModal }) => {
  const [todayDate, setTodayDate] = useState("");
  useEffect(() => {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedToday = yyyy + "-" + mm + "-" + dd;
    setTodayDate(formattedToday);
  }, []);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 right-0 left-0 bottom-0 z-50 overflow-y-auto bg-gray-200 bg-opacity-60 flex justify-center items-center`}
    >
      <div className="bg-white w-full max-w-2xl p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Attendence Info</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.293 2.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-700">
          <span className=" font-bold"> Timesheet :</span>{" "}
          <input type="date" value={todayDate} />
          <div className=" w-48 flex justify-center my-2">
          <div className=" border-2  py-6 w-24 rounded-full">
            <h4 className=" text-center font-bold pb-2">Total hours</h4>
            <span>
              <p className=" text-center font-bold">9 hrs</p>
            </span>
          </div>
          </div>
          <div className=" flex">
            <div className=" m-2 bg-gray-300 p-3">
              <h4>Checkin</h4>
              <p>8:30</p>
            </div>
            <div className=" m-2 bg-gray-300 p-3">
              <h4>Checkout</h4>
              <p>5:30</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t">
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2"
            onClick={closeModal}
          >
            Close
          </button>
          {/* <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Accept</button> */}
        </div>
      </div>
    </div>
  );
};

export default AttendenceModal;
