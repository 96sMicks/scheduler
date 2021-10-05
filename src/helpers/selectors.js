export function getAppointmentsForDay(state, day) {
  const dayArray = state.days;
  const daysFilter = dayArray.filter((selectedDay) => selectedDay.name === day);

  const filteredDayAppointments = [];

  if (dayArray.length === 0) {
    return [];
  }

  if (daysFilter.length === 0) {
    return [];
  }

  for (const day of daysFilter) {
    const appointmentSlots = day.appointments;

    for (const id of appointmentSlots) {
      if (state.appointments[id]) {
        filteredDayAppointments.push(state.appointments[id]);
      }
    }
    return filteredDayAppointments;
  }
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewerIDNumber = interview.interviewer;
  const interviewersObject = state.interviewers;

  if (interviewersObject[interviewerIDNumber]) {
    const formattedInterviewer = interviewersObject[interviewerIDNumber];
    interview.interviewer = formattedInterviewer;
  }
  return interview;
}
