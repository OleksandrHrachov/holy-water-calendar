import React from "react";
import moment, { Moment } from "moment";
import "./CalendarDay.scss";

interface Day {
  day: Moment;
}

export default function CalendarDay({ day }: Day) {
  const date = day.format("D");
  const dayName = day.format("ddd");
  const month = day.format("MMM");
  const isCurrentDay = moment().isSame(day, "day");

  return (
    <div
      className={`calendar__day ${
        isCurrentDay ? "calendar__day--current" : ""
      }`}
    >
      <div className="calendar__day-header">
        <div
          className={`calendar__day-header-number ${
            date === "1" ? "calendar__day-header-number--first" : ""
          }`}
        >
          {date} {date === "1" ? month : ""}
        </div>
        <div className="calendar__day-header-day">{dayName}</div>
      </div>
      some todo
    </div>
  );
}
