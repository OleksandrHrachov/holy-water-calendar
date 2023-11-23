import { useState, useEffect } from "react";
import "./App.scss";
import { CalendarBody } from "./components/CalendarBody";
import { CalendarHeader } from "./components/CalendarHeader";
import { CreateTodoModal } from "./components/CreateTodoModal";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "./hooks";
import { ListTodosModal } from "./components/ListTodosModal";
import { EditTodoModal } from "./components/EditTodoModal";
import { ApiStorageService } from './services/ApiStorageService';
import { initState } from "./store/todoSlice";
import { BackgroundOverlay } from "./components/BackgroundOverlay";
import {
  setCurrentDate as setCurrentDateState,
  setSelectedtDate,
} from "./store/dateSlice";

function App() {
  const { modal, date } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  console.log("RENDER");

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

  const startData = moment().startOf("month").startOf("week");
  const endDate = moment().endOf("month").endOf("week");

  const [currentDate, setCurrentDate] = useState<string>("");
  const [startListDay, setStartListDay] = useState(startData);
  const [endListDay, setEndListDay] = useState(endDate);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (date.selectedDate) {
      console.log('sel-date')
      setCurrentDate(moment(date.selectedDate).format());
    }
  }, [date.selectedDate]);

  const getStorageState = async () => {
    setIsLoading(true);
    try {
      const calendarFilter = await ApiStorageService.getDateFilterState();
      const state = await ApiStorageService.getCalendarState();

      dispatch(initState(state));
      dispatch(setCurrentDateState(calendarFilter));
      dispatch(setSelectedtDate(calendarFilter));
      if (calendarFilter) {
        setCurrentDate(calendarFilter);
      } else {
        setCurrentDate(moment().format());
      }
    } catch (error) {
      setError(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getStorageState();
  }, []);

  useEffect(() => {
    dispatch(setCurrentDateState(currentDate));
    dispatch(setSelectedtDate(currentDate));
  }, [currentDate]);

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
      if (moment(currentDate).month() === 0) {
        const nextMonth = moment(currentDate).clone().month(11);
        setCurrentDate(nextMonth.format());
      } else {
        const nextMonth = moment(currentDate).clone().subtract(1, "month");
        setCurrentDate(nextMonth.format());
      }
    }
  };

  const nextMonth = () => {
    if (currentDate) {
      if (moment(currentDate).month() === 11) {
        const nextMonth = moment(currentDate).clone().month(0);
        setCurrentDate(nextMonth.format());
      } else {
        const nextMonth = moment(currentDate).clone().add(1, "month");
        setCurrentDate(nextMonth.format());
      }
    }
  };

  useEffect(() => {
    if (currentDate) {
      setStartListDay(
        moment(currentDate).clone().startOf("month").startOf("week")
      );
      setEndListDay(moment(currentDate).clone().endOf("month").endOf("week"));
    }
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header-wrapper">
          <CalendarHeader
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            month={moment(currentDate).format("MMMM")}
            year={moment(currentDate).format("YYYY")}
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
      {isLoading && (
        <BackgroundOverlay
          color="#777575"
          title="Don't panic, the calendar is loading..."
        />
      )}
      {error && (
        <BackgroundOverlay
          color="rgba(204, 0, 0, 1)"
          title="Time to panic, an error has occurred!!!"
        />
      )}
    </div>
  );
}

export default App;
