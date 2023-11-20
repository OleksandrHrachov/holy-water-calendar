import React from "react";
import moment, { Moment } from "moment";
import "./CalendarDay.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { openModal } from "../../store/modalSlice";
import { setSelectedDay } from "../../store/selectedDaySlice";
import { LIST_TODOS_MODAL } from "../../store/types";

interface Day {
  day: Moment;
}

export default function CalendarDay({ day }: Day) {
  const allTodos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const dayKey = day.format("DD-MM-YYYY");
  const todosForDayObj = allTodos.filter((dayTodo) =>
    dayTodo.hasOwnProperty(dayKey)
  );
  const todosForDayItems = todosForDayObj[0] && todosForDayObj[0][dayKey];

  const date = day.format("D");
  const dayName = day.format("ddd");
  const month = day.format("MMM");
  const isCurrentDay = moment().isSame(day, "day");

  const handleClickOnDay = () => {
    dispatch(openModal(LIST_TODOS_MODAL));
    dispatch(
      setSelectedDay({
        selectedDay: dayKey,
        selectedDayTodos: todosForDayItems || [],
      })
    );
  };

  return (
    <div
      onClick={handleClickOnDay}
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

      {todosForDayItems && todosForDayItems.length > 0 && (
        <ul className="calendar__day-todo-list">
          {todosForDayItems.map((todo) => {
            return (
              <li key={todo.id} className="calendar__day-todo-item">
                {todo.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
