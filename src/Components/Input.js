import React from 'react'

export default function Input({value,onInputChange}){
    return(
        <input onChange={onInputChange} value={value}/>
    )
}