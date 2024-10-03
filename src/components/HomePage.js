import React from 'react'
import style from "./page.module.css";
import Link from 'next/link';

function HomePage() {
  return ( 
    <div className={style.bgcolor}>
      <div className={style.btnContainer}>
       <Link className={style.linkstyle} href={'/auth/login/'}><button className={style.btn}>Login</button></Link> 
        <Link className={style.linkstyle} href={'/auth/get-signup-otp/'}><button className={style.btn}>Signup</button></Link>
      </div>
      <div className={style.textContainer}>
        <div className={style.textdiv}>
          <h2 className={style.heading}>Our Mission</h2>
          <p className={style.para}>
            TO help you through ,our Management software build for Library
            owenrs to make the right use seat occupency ,live seat occupency
            data , manage the student data , get live time insight and Make your
            library visible to the students
          </p>
        </div>
        <div className={style.imgdiv}>
          <p className={style.para2}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci
            animi quidem autem veniam quos, ut a qui fugit, voluptatem et
            voluptas sit sunt commodi libero optio placeat praesentium ad
            tempore.
          </p>
        </div>
      </div>
    </div>
   
  )
}

export default HomePage
