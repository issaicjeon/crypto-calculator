import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var Dates = (props) => {
  //set initial buying and selling date as appropriate
  var buydate = new Date();
  buydate.setHours(0);
  buydate.setMinutes(0);
  buydate.setSeconds(0);
  var selldate = new Date();
  selldate.setMinutes(selldate.getMinutes() - 1);

  const [startDate, setStartDate] = useState(buydate);
  const [endDate, setEndDate] = useState(selldate);

  //send back to profit.js to update dates
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
};

export default Dates;
