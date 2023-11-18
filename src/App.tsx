import {useState} from 'react';
import "./App.scss";
import { CalendarBody } from "./components/CalendarBody";
import { CalendarHeader } from "./components/CalendarHeader";
import { TodoModal } from "./components/TodoModal";

function App() {
  const [showModal, setShowModal] = useState(true)

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }


  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header-wrapper">
          <CalendarHeader openModal={openModal}/>
        </div>
        <div className="calendar__body-wrapper">
          <CalendarBody />
        </div>
      </div>
      {showModal && <TodoModal closeModal={closeModal} />}
    </div>
  );
}

export default App;
