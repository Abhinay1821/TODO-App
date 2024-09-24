import React from 'react'

export default function Button({value,buttonClick}){
    return(
        <button onClick={buttonClick}>{value}</button>
    )
}