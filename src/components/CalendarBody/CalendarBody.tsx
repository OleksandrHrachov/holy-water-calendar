import React, { useEffect, useState } from "react";
import "./CalendarBody.scss";
import moment, { Moment } from "moment";
import { CalendarDay } from "../CalendarDay";

interface IProps {
  firstDay: Moment;
  lastDay: Moment;
}

const createCurrentMonth = (firstDay: Moment, lastDay: Moment) => {
  const currentMonth = [];
  const day = firstDay.clone();

  while (!day.isAfter(lastDay)) {
    currentMonth.push(day.clone());
    day.add(1, "day");
  }

  return currentMonth;
};

export default function CalendarBody({ firstDay, lastDay }: IProps) {
  const [monthForView, setMonthForView] = useState<Moment[]>([]);

  useEffect(() => {
    const currentMonth = createCurrentMonth(firstDay, lastDay);
    setMonthForView(currentMonth);
  }, [firstDay, lastDay]);

  return (
    <div className="calendar__body">
      {monthForView.map((day) => {
        return <CalendarDay key={day.format("DD-MMM-YYYY")} day={day} />;
      })}
    </div>
  );
}
