import React from "react"
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const { interviewers, setInterviewer } = props

  const parsedInterviewerList = interviewers.map(interviewer => 
     <InterviewerListItem
     key={interviewer.id}
     name={interviewer.name}
     avatar={interviewer.avatar}
     selected={interviewer.id === props.interviewer}
     setInterviewer={event => setInterviewer(interviewer.id)} 
     />);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ parsedInterviewerList }</ul>
    </section>
  );
}