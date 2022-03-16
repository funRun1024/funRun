
import React, {Fragment, useEffect, useState} from "react";
import {Map, Button, MapProps} from "@tarojs/components";
import Taro from "@tarojs/taro";
// import { MyContext } from "../../store/createContext";
import './index.scss'

const point= [
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
const  PolylineInitState=[
  {
    points: point,
    color:"#FA6400",
    width: 5,
    arrowLine: true,
    // borderWidth:0.5
  }
]
export default function Run(){
  // const { value: { dispatch, state } } = useContext(MyContext);
  const [polyline,setPolyline]=useState<MapProps.polyline[]>([])
  const [latitude,setLatitude]=useState<number>(0)
  const [longitude,setLongitude]=useState<number>(0)
  console.log(latitude,longitude)
  // console.log(' run state',state)
  // const addTodoHandle = () => {
  //   dispatch({
  //     type: "ADD",
  //     todo: {
  //       id: new Date().getTime(),
  //       text: '达八十',
  //       isFinished: false,
  //     },
  //   });
  // };
  useEffect(()=>{
    Taro.getLocation({
      type: 'gcj02',
      isHighAccuracy:true,
      success: function (res) {
        console.log('latitude',res.latitude,'longitude',res.longitude)
        setLatitude(res.latitude)
        setLongitude(res.longitude)
        const speed = res.speed
        const accuracy = res.accuracy
        console.log('speed',speed,'accuracy',accuracy)
      }
    })
    setPolyline(PolylineInitState)
  },[])
  return (
    <Fragment>
      <Button className='PaceRelated'>1.01KM</Button>
      <Button className='time'>05:20</Button>
        <Button className='speed'>0.1km/h</Button>
      <Map  longitude={116.297611} latitude={40.047363} className='map' polyline={polyline}></Map>
      <Button className='returnButton'>返回</Button>
    </Fragment>
  );
};

