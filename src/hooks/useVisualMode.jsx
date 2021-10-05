import { useState } from "react";

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  console.log("yyyyyy", history);

  const transition = (newMode, replace = false) => {
    if (replace === true) {
      // make a copy to avoid mutate state
      const tempHistory = [...history.slice(0, -1)];

      setHistory(tempHistory);
    }

    // Updates the current mode state to a NEW MODE value
    setMode(newMode);

    // keep track of the history of the modes
    setHistory((history) => {
      return [...history, newMode];
    });

    // returns an array with a list of all the modes
    // but avoid mutating state
    const updatedHistoryArray = [...history];

    // pushes the new mode into copy array
    updatedHistoryArray.push(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      // so we avoid mutating state, make a copy
      const prevArray = [...history];

      prevArray.pop();

      setHistory(prevArray);

      setMode(prevArray[prevArray.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
