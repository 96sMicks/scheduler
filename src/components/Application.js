import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
    // interview: {
    //   student: "Mickey",
    //   interviewer: {
    //     id: 2,
    //     name: "Damian Lillard",
    //     avatar: "https://i.imgur.com/twYrpay.jpg",
    //   },
    // },
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Jayson Tatum",
      interviewer: {
        id: 2,
        name: "Scott Smith",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([])

  const parsedAppointmentList = appointments.map(app =>
    <Appointment
      key={app.id}
      {...app}
      />)

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days"
    axios.get(daysURL)
      .then((response) => {setDays([...response.data])})},[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
            // setDay={day => console.log(day)} was used to see the click day on console
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        ß
      </section>
      <section className="schedule">
       { parsedAppointmentList }
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
