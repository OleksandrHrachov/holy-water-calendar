import React, {FC} from 'react'
import './CalendarHeader.scss';

interface IProps {
  openModal: () => void;
}

export const CalendarHeader: FC<IProps> = ({openModal}) => {
  return (
    <div className='calendar__header'>
      <div onClick={openModal} className='calendar__header-open-modal-button'>
        <div className='calendar__header-open-modal-button-item-1'></div>
        <div className='calendar__header-open-modal-button-item-2'></div>
      </div>

      <div className='calendar__header-filter'>filter</div>
    </div>
  )
}
