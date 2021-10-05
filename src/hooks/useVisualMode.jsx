import { useState  } from "react";

const useVisualMode = (initialMode) => {
const [mode, setMode] = useState(initialMode);
const [history, setHistory] = useState(initialMode);

const transition = (newMode) => {
  setMode(newMode);
}

const back = () => {
  
}

return {  mode, transition, back };
}

export default useVisualMode;