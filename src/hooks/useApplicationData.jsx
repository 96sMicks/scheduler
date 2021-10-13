import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  // Used to set the current day
  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (id, appointments) => {
    // Avoid mutating state
    const dayArray = [...state.days];

    // Gets the day according to name in dayArray (use findIndex over filter due to whacky day order for some reason)
    const dayIndex = dayArray.findIndex(
      (selectedDay) => selectedDay.name === state.day
    );

    /*
     Once we have the index we can access it's spots number through dayArray[dayIndex].spots

    filter brings in an array of interview spots that are null and we take the .length of that array
     to update the spots number
    */

    dayArray[dayIndex].spots = dayArray[dayIndex].appointments.filter(
      (appointmentID) => appointments[appointmentID].interview === null
    ).length;

    return dayArray;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    
    const days = updateSpots(id, appointments);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };

  const cancelInterview = (id) => {
    // copy the appointment state, overwrite interview value to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id, appointments);

    return axios
      .delete(`/api/appointments/${id}`, { appointment })
      .then(() => {
        setState({
          ...state,
          appointment,
          appointments,
          days,
        });
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
