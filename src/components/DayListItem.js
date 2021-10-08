import React from "react";

import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {

  function formatSpots(dynamicNumber) {

    if (dynamicNumber === 0 ){
      return "no spots remaining"
    } else if ( dynamicNumber === 1) {
      return "1 spot remaining"
    }
    return `${dynamicNumber} spots remaining`
  }
  

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  });
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{ formatSpots(props.spots) }</h3>
    </li>
  );
}