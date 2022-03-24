import { View } from "@tarojs/components"
import React, {FC, useState} from "react"
import './index.scss'

const PersonRun:FC=()=>{
    const [classNames,setClassNames]=useState<string | undefined>('run')
    const controlRun=()=>{
        setClassNames('manRun runStart ')
    }
    return (
      <View className={classNames} onClick={()=>controlRun()}>

      </View>
    )
}

export default PersonRun
