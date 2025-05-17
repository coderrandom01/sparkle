import React from 'react'
import { TextInput } from '../../assets/style/index'

export default function TextInputComponent(props : any) {
  return (
    // <TextInput>
        <TextInput wid100 = {props.wid100} error = {props.error} type = "text" name = {props.name} onChange={props.change} value = {props.value} placeholder={props.placeholder} onKeyPress = {props.onKeyPress} />
    // </TextInput>
  )
}
