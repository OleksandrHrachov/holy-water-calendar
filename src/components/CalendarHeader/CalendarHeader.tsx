import React, { FC } from "react";
import "./CalendarHeader.scss";
import { DatePicker } from "../DatePicker";

interface IProps {
  openModal: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  month: string;
  year: string;
}

export const CalendarHeader: FC<IProps> = ({
  openModal,
  prevMonth,
  nextMonth,
  month,
  year,
}) => {
  return (
    <div className="calendar__header">
      <div onClick={openModal} className="calendar__header-open-modal-button">
        <div className="calendar__header-open-modal-button-item-1"></div>
        <div className="calendar__header-open-modal-button-item-2"></div>
      </div>

      <div className="calendar__header-filter">
        <DatePicker
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          month={month}
          year={year}
        />
      </div>
    </div>
  );
};
