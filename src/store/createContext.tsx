import Taro from "@tarojs/taro";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useState
} from "react";
import { User } from "src/pages/top";

const UserContext = React.createContext<
  | undefined
  | {
      user: User | undefined;
      setUser: Dispatch<User | undefined>;
    }
>(undefined);
UserContext.displayName = "UserContext";
const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    Taro.request({
      url: "http://localhost:3001/me", //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res: { data: User }) {
        setUser(res.data);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser必须在UserContext环境下使用!");
  }
  return context;
};
export default UserProvider;
