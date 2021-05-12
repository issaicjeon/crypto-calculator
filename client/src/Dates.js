import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var Dates = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  function change(date) {
    setStartDate(date);
    console.log(date);
    props.getDate(date.getTime(), date.toLocaleString());
  }
  return (
    <div>
      Enter buying date:{" "}
      <DatePicker selected={startDate} onChange={(date) => change(date)} />
    </div>
  );
};

export default Dates;
