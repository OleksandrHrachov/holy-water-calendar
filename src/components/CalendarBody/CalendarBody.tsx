import React, { useEffect, useState } from "react";
import "./CalendarBody.scss";
import moment, { Moment } from "moment";
import { CalendarDay } from "../CalendarDay";

const createCurrentMonth = () => {
  moment.updateLocale("en", { week: { dow: 1 } });
  const startListDay = moment().startOf("month").startOf("week");
  const endListDay = moment().endOf("month").endOf("week");

  const carrentMonth = [];
  const day = startListDay.clone();

  while (!day.isAfter(endListDay)) {
    carrentMonth.push(day.clone());
    day.add(1, "day");
  }

  return carrentMonth;
};

export default function CalendarBody() {
  const [monthForView, setMonthForView] = useState<Moment[]>([]);

  console.log("monthForView =>", monthForView);

  useEffect(() => {
    const currentMonth = createCurrentMonth();
    setMonthForView(currentMonth);
  }, []);

  return (
    <div className="calendar__body">
      {monthForView.map((day) => {
        return <CalendarDay key={day.format('DD-MMM-YYYY')} day={day}/>
      })}
      </div>
  );
}
