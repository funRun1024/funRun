import Taro from "@tarojs/taro";
import React, {
  Dispatch,
  useEffect,
  useState
} from "react";
import { User } from "src/pages/top";

export interface ContextType{
  user: User | undefined;
  setUser: Dispatch<User | undefined>;
  time:number;
  setTime:Dispatch<number>;
  speed:number;
  setSpeed:Dispatch<number>;
  distance:number;
  setDistance:Dispatch<number>;
  formatSeconds:(value:number)=>number;
  polyLine:polyLineType[]|null;
  PolylineInitState:polyLineType[]|null;
  setPolyLine:Dispatch<polyLineType[]|null>;
  // changeTime:()=>void
}
interface polyLineType{
  points: {longitude:number,latitude:number}[],
  color:string,
  width: number,
  arrowLine: boolean,
}
export const UserContext = React.createContext<ContextType|null>(null);
UserContext.displayName = "UserContext";
export const UserProvider = ({ children }: { children: any }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data= [
  {
  'longitude': 116.297611,
  'latitude': 40.047363
}, {
  'longitude': 116.302839,
  'latitude': 40.048219
}, {
  'longitude': 116.308301,
  'latitude': 40.050566
}, {
  'longitude': 116.305732,
  'latitude': 40.054957
}, {
  'longitude': 116.304754,
  'latitude': 40.057953
}, {
  'longitude': 116.306487,
  'latitude': 40.058312
}, {
  'longitude': 116.307223,
  'latitude': 40.056379
}]

// const data:{longitude:number,latitude:number}[]=[]
const  PolylineInitState:polyLineType[]=[
  {
    points: data,
    color:"#FA6400",
    width: 5,
    arrowLine: true,

    // borderWidth:0.5
  }
]
  const [user, setUser] = useState<User>();
  const [time,setTime]=useState<number>(0)
  const [speed ,setSpeed]=useState<number>(0)
  const [distance,setDistance]=useState<number>(0)
  const [polyLine,setPolyLine]=useState<polyLineType[]|null>(null)
  // console.log('UserContext',time)
  const formatSeconds=(value) =>{
    let result:number = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    // @ts-ignore
    result = `${h}:${m}:${s}`
    return result
  }
  //获取速度信息
  useEffect(()=>{
    const _locationChangeFn = function (res) {
      const latitude = res.latitude
      const longitude = res.longitude
      data.push({latitude,longitude})
      setSpeed(res.speed)
      setDistance((res.speed*time)/1000)
    }
    Taro.onLocationChange(_locationChangeFn)
    //
    Taro.getLocation({
      type: 'wgs84',
      success: function (res) {
        setSpeed(res.speed)
      }
    })

  },[data, speed, time])
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
    <UserContext.Provider value={{ user, setUser,time,speed,distance,setTime,setSpeed,setDistance,formatSeconds,polyLine,setPolyLine,PolylineInitState}}>
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
