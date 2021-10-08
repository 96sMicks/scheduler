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
    console.log(dayArray)

    // Gets the day according to name in dayArray (use findIndex over filter due to whacky day order for some reason)
    const dayIndex = dayArray.findIndex(
      (selectedDay) => selectedDay.name === state.day
    );
    console.log("day index in Array", dayIndex)

    //  Once we have the index we can access it's spots number
    //  through dayArray[dayIndex].spots

    // filter brings in an array of interview spots that are null and we take the .length of that array
    //  to update the spots number

    // Before update
    console.log(dayArray[dayIndex].spots)
    // console.log(dayArray[dayIndex].appointments) returns an array
    console.log(dayArray[dayIndex].appointments)

    dayArray[dayIndex].spots = dayArray[dayIndex].appointments.filter(
      (open) => appointments[open].interview === null
      ).length;

    console.log(dayArray);

    return dayArray
    
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

    // Makes our data persistent

    const days = updateSpots(id, appointments)
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  };

  const cancelInterview = (id) => {
    // copy the appointment state, overwrite interview value to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, { appointment })
      .then(() => {
        setState({
          ...state,
          appointment,
        });
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
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