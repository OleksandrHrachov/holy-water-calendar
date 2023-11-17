import React from "react";
import moment, { Moment } from "moment";
import "./CalendarDay.scss";

interface Day {
  day: Moment;
}

export default function CalendarDay({ day }: Day) {
  const date = day.format("D");
  const dayName = day.format("ddd");

  return (
    <div className="calendar__day">
      <div className="calendar__day-header">
        <div className="calendar__day-header-number">{date}</div>
        <div className="calendar__day-header-day">{dayName}</div>
        
      </div>
      dfsdsd
    </div>
  );
}
