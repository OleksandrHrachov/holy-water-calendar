import './App.scss';
import { CalendarBody } from './components/CalendarBody';
import { CalendarHeader } from './components/CalendarHeader';

function App() {
  return (
    <div className="calendar">
      <div className='calendar__header-wrapper'><CalendarHeader /></div>
      <div className='calendar__body-wrapper'><CalendarBody /></div>
    </div>
  );
}

export default App;
