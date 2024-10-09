'use client'
import { url ,getCookie } from '@/store/url';
import axios from 'axios';
import Link from 'next/link';
import {useState , useEffect} from 'react'

function page({params: {id}}) {

    const [data, setData] = useState([]);
    const [seatData , setSeatData] = useState({})
   
  const fetchSeatData=async()=>{
    const response = await axios.get(`${url}/booked-seat/${id}` ,{
      headers :{
        Authorization :"Bearer "+getCookie('authToken').access
      }
    })
    const res = await response.data
    console.log('res',res)
    setSeatData(res)
  }
   
 
    const fetchData = async () => {
        try {
          const response = await axios.get(`${url}/view-seat/${id}/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getCookie('authToken').access,
            },
          });
          const res = await response.data;
          
          console.log('data',res ,res.booked);
          setData(res);
        } catch (e) {
          console.log(e);
        }
      };
    useEffect(()=>{
        fetchData()
        fetchSeatData()
    },[])
  return (
    <div style={styles.seatContainer}>
      
      <div style={styles.seatItem}>
        <p style={styles.seatLabelBooked}>Booked:</p>
        <p style={styles.seatValueBooked}>{seatData.booked}</p>
      </div>
      <div style={styles.seatItem}>
        <p style={styles.seatLabelVaccent}>Vacant:</p>
        <p style={styles.seatValueVaccent}>{seatData.vaccent}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
        {data?.data?.map((item) => (
          
         <Link  key={item.id} style={!item.booked ? styles.chair : styles.chairBooked} href={`/user/view-seat/${id}/${item.id}/`}> 
            {/* You can add an icon here if needed */}
            <p style={styles.chairNumber}>{item.seat_num}</p>
         
          </Link>
          
        ))}
      </div>
    </div>
  )
}
const styles = {
    seatContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    seatItem: {
      marginBottom: '10px',
    },
    seatLabelBooked: {
      fontWeight: 'bold',
    },
    seatValueBooked: {
      color: 'black',
      fontSize:'20px'
    },
    seatLabelVaccent: {
      fontWeight: 'bold',
      fontSize:'20px'
    },
    seatValueVaccent: {
      color: 'green',
    },
    chair: {
      width: '50px',
      height: '50px',
      backgroundColor: 'lightgreen',
      margin: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius:'10px'
    },
    chairBooked: {
      width: '50px',
      height: '50px',
      backgroundColor: 'gray',
      margin: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor:'pointer',
      borderRadius:'10px'
    
    },
    chairNumber: {
      fontSize: '16px',
    },
  };
  
export default page
