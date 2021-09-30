import React, { useState } from "react";

import "components/InterviewerListItem.scss"
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const [interviewer, setInterviewer] = useState("")

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  });

  let imgClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected" : props.selected
  });

  console.log(props)
  console.log(interviewerClass)
  console.log(imgClass)

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
  <img
    className={imgClass}
    src={props.avatar}
    alt={props.name}
  />
  {props.name}
</li>
  )
}