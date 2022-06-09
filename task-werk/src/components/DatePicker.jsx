import React from "react";
import "../style/style.scss";

export default function DatePicker() {
  const newDate = new Date();
  const newArray = new Array();
  newArray[0] = "JAN";
  newArray[1] = "FEB";
  newArray[2] = "MARCH";
  newArray[3] = "APR";
  newArray[4] = "MAY";
  newArray[5] = "JUNE";
  newArray[6] = "JULY";
  newArray[7] = "AUG";
  newArray[8] = "SEP";
  newArray[9] = "OCT";
  newArray[10] = "NOV";
  newArray[11] = "DEC";
  const day = newDate.getDate();
  const month = newArray[newDate.getMonth()];
  const year = newDate.getFullYear();
  const newDayString = new Array();
  newDayString[0] = "SUNDAY";
  newDayString[1] = "MONDAY";
  newDayString[2] = "TUESDAY";
  newDayString[3] = "WEDNESDAY";
  newDayString[4] = "THURSDAY";
  newDayString[5] = "FRIDAY";
  newDayString[6] = "SATURDAY";
  const dayString = newDayString[newDate.getDay()];
  console.log(dayString);

  return (
    <div className="block">
      <div className="date">
        <div className="day">{day}</div>
        <div className="monthYear">
          {month} {year}
        </div>
        <div className="stringDay">{dayString}</div>
      </div>
    </div>
  );
}
