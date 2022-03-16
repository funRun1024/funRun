export interface Person{
  id: number;
  text: string;
  isFinished: boolean;
}
export interface StateProps {
  Persons?:Person[]
}

export interface ActionProps {
  type: string;
  [key: string]: any;
}

const reducer = (state: StateProps, action: ActionProps):StateProps => {
  switch (action.type) {
    case "ADD":
      //自己做一些相关的处理
      return {...state};
    default:
      return state;
  }
};

export default reducer;
