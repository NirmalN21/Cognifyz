import React from 'react'
import itsEmpty from "../assets/itsEmpty.gif";
import "../styles/dummy.css"

const Dummy = () => {
    return (
        <>
            <div className='gif-container'>
                <img src={itsEmpty} alt="" />
            </div>
        </>
    )
}

export default Dummy
