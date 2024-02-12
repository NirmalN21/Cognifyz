import React, { useEffect, useState } from 'react'
import "../styles/about.css"
import aboutPic from "../assets/about.jpeg"

const About = () => {

  return (
    <>
      <div className="container-main">
        <div className="emp-profile">
          <h2>Student Profile</h2>

          <form method="GET">
            <div className="row ">

              <div className="profile-photo">
                <img src={aboutPic} className="pphoto" alt="profile photo" />

              </div>
            </div>
            <div className='about-details'>
              <div>Student Name</div>
              <div>Nirmal Nehra</div>
              <div>Student Email</div>
              <div>nirmalnehra.nn@gmail.com</div>
              <div>Registration No.</div>
              <div>21168</div>
              <div>Room No.</div>
              <div>001D</div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default About
