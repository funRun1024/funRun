import { Component } from "react";
// import {Provider} from 'react-redux'
// import { Provider } from "@tarojs/redux";
// import configStore from './store/index'
// import UserProvider from "./store/createContext";
// const store = configStore()
import "./app.scss";

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  //找到npm脚本开启本地json-server本地环境来拿到用户数据
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}
export default App;
