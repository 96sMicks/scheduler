export function getAppointmentsForDay(state, day) {
  const dayArray = state.days
  const dayCheck = dayArray.filter(x => x.name === day )
  
  console.log(dayCheck)
  return dayCheck
}