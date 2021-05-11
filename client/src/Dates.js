import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function buttonClicks(date) {
  axios.post("/date", {
    date: date,
  });
}

export default function Dates() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      {" "}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <button onClick={buttonClicks(startDate)}>Click me!</button>
    </div>
  );
}
