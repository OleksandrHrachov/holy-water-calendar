import React from "react";
import moment, { Moment } from "moment";
import "./CalendarDay.scss";
import { useAppSelector } from "../../hooks";
import { TodoItem } from "../TodoItem";

interface Day {
  day: Moment;
}

export default function CalendarDay({ day }: Day) {
  const allTodos = useAppSelector((state) => state.todos.todos);
  const dayKey = day.format("DD-MM-YYYY");
  const todosForDayObj = allTodos.filter((dayTodo) =>
    dayTodo.hasOwnProperty(dayKey)
  );

  console.log("todosForDay => ", todosForDayObj);

  const todosForDayItems = todosForDayObj[0] && todosForDayObj[0][dayKey];
  console.log("todosForDayItems => ", todosForDayObj && todosForDayItems);

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

      {todosForDayItems && todosForDayItems.length > 0 && (
        <ul className="calendar__day-todo-list">
          {todosForDayItems.map((todo) => {
            return <li key={todo.id} className="calendar__day-todo-item"><TodoItem title={todo.title} /></li>
          })}
        </ul>
      )}
    </div>
  );
}
