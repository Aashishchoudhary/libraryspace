'use client'
import { url  } from '@/store/url'
import axios from 'axios'
import {useState , useEffect} from 'react'
import styles from './previous.module.css'
import { useCookies } from 'react-cookie'

function Page({params:{id}}) {
  const [token] = useCookies()
  const [ data , setData] = useState([])
  const fetchData=async()=>{
    const response = await axios.get(`${url}/previous-student/${id}/` ,{
      headers:{
        Authorization: "Bearer " + token.access,
      }
    })
    const res = await response.data
    setData(res)
    console.log(res)
  }
  useEffect(()=>{
   fetchData()
  },[])
  return (
    <div className={styles.mainDiv}>{data.map((item)=><div className={styles.container} key={item.id}>
      <p className={styles.para}>{item.name}</p>
      <p className={styles.para}>joined-{item.created_on}</p>
      <p className={styles.para}>left-{item.deleted_at}</p>
      <p className={styles.para}>{item.mobile_number}</p>
      <p className={styles.para}>seat-{item.reserved_seat}</p>
    </div>)}</div>
  )
}

export default Page
