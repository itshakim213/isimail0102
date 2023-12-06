import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import '../styles/Agneda.css';
import noEvents from '../assets/noEvents.png';
import moment from 'moment';
import EventForm from '../components/EventForm';
import Empty from '../components/Empty';

function Agenda() {
  const [date, setDate] = useState(moment());
  return (
    <div
      className="page"
      style={{
        marginTop: 68,
        marginLeft: 85,
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        style={{
          borderRight: '2px solid #AEEFEB',
        }}
      >
        <div className="calendar-box">
          <Calendar value={date} onChange={setDate} />
        </div>
        <Empty
          image={noEvents}
          message="you have no events"
          height={65}
          width={65}
        />
      </div>
      <EventForm />
    </div>
  );
}

export default Agenda;
