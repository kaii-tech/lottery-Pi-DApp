// useGlobalState.tsx

import { useState } from "react";

const GlobalState = <T,>(initialState: T) => {
  const [state, setState] = useState(initialState);

  const setGlobalState = (newState: T) => {
    setState(newState);
  };

  return [state, setGlobalState] as const;
};

export default GlobalState;
