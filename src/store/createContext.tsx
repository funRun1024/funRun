import React, { createContext, Dispatch } from "react";
import { StateProps, ActionProps } from "../store/reducer";


export interface ContextProps {
  value: {
    state: StateProps;
    dispatch: Dispatch<ActionProps>;
  };
}

export const MyContext = createContext({} as ContextProps);

const MyProvide = (props: React.PropsWithChildren<ContextProps>) => {
  return (
    <MyContext.Provider value={props}>
      {props.children}
    </MyContext.Provider>
  );
};
export default MyProvide;
