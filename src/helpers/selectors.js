export function getAppointmentsForDay(state, day) {
  const dayArray = state.days
  const daysFilter = dayArray.filter(selectedDay => selectedDay.name === day)

  // An ARRAY
  // console.log(daysFilter) 

  for (const day of daysFilter) {
    return day.appointments
  }
}