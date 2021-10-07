import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
 
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    // Upon clicking save the transition is set to save 
    transition(SAVING);

    // Only when there's a succuessdul put request will the app
    // show the appointment
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function remove (name, interviewer){
    const interview ={
      student: name,
      interviewer
    };
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING)
            save(name, interviewer)
          }}
        />  
      )}
      {mode === SAVING && <Status message={"Saving"} /> }
    </article>
  );
}
