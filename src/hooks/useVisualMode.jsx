import { useState } from "react";

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode) => {
    // Updates the current mode state to a NEW MODE value
    setMode(newMode);

    // keep track of the history of the modes but do NOT mutate state,
    setHistory([...history, newMode]);

    // returns an array with a list of all the modes
    const updatedHistoryArray = [...history];

    // pushes the new mode into the history array
    updatedHistoryArray.push(newMode);

    // console.log(mode)
    // console.log("xxxxxxxxxx", parsedHistoryArray)
  };

  const back = () => {
    if (history.length > 1) {
      // so we avoid mutating state, make a copy
      const prevArray = [...history];

      prevArray.pop();

      // console.log(history)
      // console.log(prevArray)

      setHistory(prevArray);

      setMode(prevArray[prevArray.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
