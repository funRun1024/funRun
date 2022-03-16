
// // import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import React, {
  FC,
  useReducer,
  Dispatch,
} from "react";
// import  Run from "../run/index"
import MyProvide from "../../store/createContext";
import reducer, { StateProps, ActionProps } from "../../store/reducer";

interface ContextProps {
  state: StateProps;
  dispatch: Dispatch<ActionProps>;
}

const Index: FC = () => {
  //所有初始化的状态
  const initState: StateProps = {
    Persons:[{
      id:123,
      text:'tom',
      isFinished:false
    }]
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const transferParameter: ContextProps = { state, dispatch }

  return (
    <>
      <MyProvide value={transferParameter}>
        {/*子组件都写在这里*/}
        asd
        {/* <Run /> */}
      </MyProvide>
    </>
  );
};
export default Index;
