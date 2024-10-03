import React from 'react'
import Image from 'next/image'
import styles from './header.module.css'
import img from '../app/favicon.png'
function HeaderPage() {
  return (
    <header  >
      <nav className={styles.header}>
        <div className={styles.imgDiv}><Image className={styles.imageData} src={img}/></div>
        <ul className={styles.mainContainer}>
            <li className={styles.listItem}><a href="">Home</a></li>
            <li className={styles.listItem}><a href="">About Us</a></li>
            <li className={styles.listItem}><a href="">Conatct</a></li>
            <li className={styles.listItem}><a href="">Add Library</a></li>
            <li className={styles.listItem}><a href="">Subscription</a></li>
            <li className={styles.listItem}><a href="">Logout</a></li>
       
        </ul>
      </nav>
    </header>
  )
}

export default HeaderPage
