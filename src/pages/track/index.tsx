
import React, {Fragment,FC} from "react";
import {Map, Button} from "@tarojs/components";
import Taro,{getCurrentInstance} from "@tarojs/taro";
import { UserProvider} from '../../store/createContext';
import './index.scss'

const Run:FC=()=>{
// @ts-ignore
  // let {distance,time,speed,formatSeconds,PolylineInitState}=useContext<ContextType|null>(UserContext);
  const {time,distance}=getCurrentInstance()!.router!.params
  const goResult=()=>{
    Taro.navigateTo({
      url:'../../pages/result/index'
    })
  }
  interface polyLineType{
    points: {longitude:number,latitude:number}[],
    color:string,
    width: number,
    arrowLine: boolean,
  }
//   const points=[
//     {
//       'longitude': 106.60417691,
//     'latitude': 29.53560275
//     },
//     {
//       'longitude':106.60420457 ,
//       'latitude': 29.53563480
//     },
//    {
//     'longitude': 106.60423088,
//     'latitude':29.53567352
//    },
//   {
//   'longitude': 106.60423382,
//   'latitude':29.53574061
//    },
//    {
//     'longitude': 106.60423458,
//     'latitude':29.53577548
//    },{
//     'longitude': 106.60422472,
//     'latitude':29.53582040
//    },
//    {
//     'longitude': 106.60423460,
//     'latitude':29.53587841
//    },
//    { 'longitude': 106.60422989,
//    'latitude':29.53595518
//   },{
//     'longitude': 106.60423459,
//     'latitude':29.53600357
//   },
//   {
//     'longitude': 106.60421739,
//     'latitude':29.53605506
//   },
//   {
//     'longitude': 106.60421483,
//     'latitude':29.53612137
//   },
//   {
//     'longitude': 106.60419905,
//     'latitude':29.53618165
//   },
//   {
//     'longitude': 106.60416917,
//   'latitude':29.53624214
// },
// {
//   'longitude': 106.60414200,
//   'latitude':29.53630246
// },
// {
//   'longitude': 106.60410146,
//   'latitude':29.53633330
// },
// {
//   'longitude': 106.60403691,
//   'latitude':29.53636050
// },{
//   'longitude': 106.60398564,
//   'latitude':29.53637099
// }
// ]
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
    }
  ]
  const formatTime=(value) =>{
    let result:number = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    // @ts-ignore
    result = `${h}:${m}:${s}`
    return result
  }
  return (
    <Fragment>
      <Button className='PaceRelated'>{distance}KM</Button>
      <Button className='time'>{formatTime(time)}</Button>
        <Button className='speed'>{7.2}km/h</Button>
      <Map  longitude={116.297611} latitude={40.047363} className='map' polyline={PolylineInitState}></Map>
      <Button className='returnButton' onClick={()=>goResult()}>返回</Button>
    </Fragment>
  );
};
const RunPage:FC=()=>{
  return (
    <UserProvider>
      <Run></Run>
    </UserProvider>
  )
}
export  default RunPage

// 106.60417691,
//     'latitude': 29.53560275
