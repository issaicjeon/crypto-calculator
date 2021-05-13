import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var Dates = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  function changeStart(date) {
    setStartDate(date);
    console.log(date);
    props.getStartDate(date.getTime(), date.toLocaleString());
  }
  function changeEnd(date) {
    setEndDate(date);
    console.log(date);
    props.getEndDate(date.getTime(), date.toLocaleString());
  }
  return (
    <div>
      <div>
        Enter buying date:{" "}
        <DatePicker
          selected={startDate}
          onChange={(date) => changeStart(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
      </div>
      <div>
        Enter selling date:{" "}
        <DatePicker
          selected={endDate}
          onChange={(date) => changeEnd(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
      </div>
    </div>
  );

  // () => {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //       timeInputLabel="Time:"
  //       dateFormat="MM/dd/yyyy h:mm aa"
  //       showTimeInput
  //     />
  //   );
  // };
};

export default Dates;
