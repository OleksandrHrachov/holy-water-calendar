import { useState, useEffect } from "react";
import "./App.scss";
import { CalendarBody } from "./components/CalendarBody";
import { CalendarHeader } from "./components/CalendarHeader";
import { CreateTodoModal } from "./components/CreateTodoModal";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "./hooks";
import { ListTodosModal } from "./components/ListTodosModal";
import { EditTodoModal } from "./components/EditTodoModal";
import { getCalendarState } from "./store/helpers";
import { initState } from "./store/todoSlice";
import { BackgroundOverlay } from "./components/BackgroundOverlay";

function App() {
  const { modal, todos, date } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  moment.updateLocale("en", { week: { dow: 1 } });

  const [showCreateModal, setShowCreateModal] = useState(
    modal.isCreateModalOpen
  );
  const [showListTodosModal, setShowListTodosModal] = useState(
    modal.isListTodosModalOpen
  );
  const [showEditTodoModal, setShowEditTodoModal] = useState(
    modal.isEditTodoModalOpen
  );

  const [showBackgroundOverlayModal, setShowBackgroundOverlayModal] = useState(
    modal.isCalendarModalOpen
  );

  const [currentDate, setCurrentDate] = useState(moment(date.currentDate));
  const [startListDay, setStartListDay] = useState(
    moment().startOf("month").startOf("week")
  );
  const [endListDay, setEndListDay] = useState(
    moment().endOf("month").endOf("week")
  );

  useEffect(() => {
    if (date.selectedDate) {
      setCurrentDate(moment(date.selectedDate));
    }
  }, [date.selectedDate]);

  useEffect(() => {
    if (todos.todos.length === 0) {
      const state = getCalendarState();
      dispatch(initState(state));
    }
  }, []);

  useEffect(() => {
    setShowCreateModal(modal.isCreateModalOpen);
  }, [modal.isCreateModalOpen]);

  useEffect(() => {
    setShowListTodosModal(modal.isListTodosModalOpen);
  }, [modal.isListTodosModalOpen]);

  useEffect(() => {
    setShowEditTodoModal(modal.isEditTodoModalOpen);
  }, [modal.isEditTodoModalOpen]);

  useEffect(() => {
    setShowBackgroundOverlayModal(modal.isCalendarModalOpen);
  }, [modal.isCalendarModalOpen]);

  const prevMonth = () => {
    if (currentDate) {
      if (currentDate.month() === 0) {
        const nextMonth = currentDate.clone().month(11);
        setCurrentDate(nextMonth);
      } else {
        const nextMonth = currentDate.clone().subtract(1, "month");
        setCurrentDate(nextMonth);
      }
    }
  };

  const nextMonth = () => {
    if (currentDate) {
      if (currentDate.month() === 11) {
        const nextMonth = currentDate.clone().month(0);
        setCurrentDate(nextMonth);
      } else {
        const nextMonth = currentDate.clone().add(1, "month");
        setCurrentDate(nextMonth);
      }
    }
  };

  useEffect(() => {
    if (currentDate) {
      setStartListDay(currentDate.clone().startOf("month").startOf("week"));
      setEndListDay(currentDate.clone().endOf("month").endOf("week"));
    }
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header-wrapper">
          <CalendarHeader
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            month={currentDate.format("MMMM")}
            year={currentDate.format("YYYY")}
          />
        </div>
        <div className="calendar__body-wrapper">
          <CalendarBody firstDay={startListDay} lastDay={endListDay} />
        </div>
      </div>
      {showCreateModal && <CreateTodoModal />}
      {showListTodosModal && <ListTodosModal />}
      {showEditTodoModal && <EditTodoModal />}
      {showBackgroundOverlayModal && <BackgroundOverlay />}
    </div>
  );
}

export default App;
