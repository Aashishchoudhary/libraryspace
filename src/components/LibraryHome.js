import { url } from '@/store/url'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './css/library-home.module.css'

function LibraryHome() {
    const user = useSelector(state=>state.auth.authTokens)
    const [data , setData]= useState([])

    const fetchData=async()=>{
        const response =await axios.get(`${url}/library-view/`,{
            headers:{
                Authorization:"Bearer "+user.access
            }
        })
        const res = await response.data
        setData(res)
        console.log(res)
    }
    useEffect(()=>{fetchData()} , [])
  return (
    <div>
     {data.length > 0 ? (
        <div className={styles.container}>
          {data.map(item => (
            <div key={item.id}>
              <div onClick={() => navigation.navigate('ViewSeat', { LibId: item.id })} className={styles.libraryItem}>
                <h3 className={styles.libraryName}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
                <p className={styles.seatNumber}>Total Seats: {item.total_seat}</p>
              </div>
              
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => navigation.navigate('ViwAlRe', { LibId: item.id })}>
                  View All Entries
                </button>
                <button className={styles.button} onClick={() => navigation.navigate('collection', { id: item.id })}>
                  Total Collection
                </button>
              </div>

              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => navigation.navigate('extra', { id: item.id })}>
                  Extra Student
                </button>
                <button className={styles.button} onClick={() => navigation.navigate('half', { id: item.id })}>
                  Half Day
                </button>
              </div>

              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => navigation.navigate('previous', { id: item.id })}>
                  Deleted Data
                </button>
                <button className={styles.button} onClick={() => navigation.navigate('EditLibrary', { id: item.id })}>
                  Edit Library
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <button className={styles.addLibraryButton} onClick={() => navigation.navigate('AddLibrary')}>
          Add
        </button>
      )}  
    </div>
  )
}

export default LibraryHome
