import React, { FC, useState, useEffect } from "react";
import "./DatePicker.scss";
import moment from "moment";

interface IProps {
  prevMonth: () => void;
  nextMonth: () => void;
  month: string;
  year: string;
}

export const DatePicker: FC<IProps> = ({ prevMonth, nextMonth, month, year }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(month);
  const [selectedYear, setSelectedYear] = useState<string>(year);

  useEffect(() => {
    setSelectedMonth(month);
  }, [month]);

  useEffect(() => {
    setSelectedYear(year);
  }, [year])

  return (
    <div className="date-picker">
      <div className="date-picker__month">
        <button
          className="date-picker__month-button"
          type="button"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <div className="date-picker__month-selected">{selectedMonth} {selectedYear}</div>
        <button
          className="date-picker__month-button"
          type="button"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>
      <div className="date-picker__date">calendar</div>
    </div>
  );
};
