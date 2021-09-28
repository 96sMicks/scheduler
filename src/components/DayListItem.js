import React from "react";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}