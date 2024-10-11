'use client'
import { url ,getCookie } from '@/store/url';
import axios from 'axios';
import Link from 'next/link';
import {useState , useEffect} from 'react'
import Chart from "chart.js/auto";
  import { CategoryScale } from "chart.js";
import { Pie ,Bar} from 'react-chartjs-2';
import styles from './page.module.css'


Chart.register(CategoryScale);
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

    const chartData = {
      labels: ['Booked','Vaccent'],
  datasets: [
    {
      data: [seatData.booked, seatData.vaccent],
      label: "Number of seats",
      backgroundColor: [
        'green',
        'gray',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
       
      ],
      borderWidth: 1,
    },
  ],
  };
  const BarChatData={
    labels: ['15 - 20 age','20-25 age' ,'25-30 age' , '30+ age'],
    datasets: [
      {
        // data: [seatData.above15, seatData.above20,seatData.above25 , seatData.above30],
        data:[10 , 23 , 40 , 15],
        label: "Number of students",
        backgroundColor: [
          'orange',
          
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          
         
        ],
        borderWidth: 1,
      },
    ],
  }
   
  return (
    <>
    <div className={styles.seatContainer}>
      
      
      <div className={styles.chartContainer}>

<Pie className={styles.chart} data={chartData} />
<Bar className={styles.chart} data={BarChatData} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
        {data?.data?.map((item) => (
          
         <Link  key={item.id} className={!item.booked ? styles.chair : styles.chairBooked} href={`/user/view-seat/${id}/${item.id}/`}> 
            {/* You can add an icon here if needed */}
            <p className={styles.chairNumber}>{item.seat_num}</p>
         
          </Link>
          
        ))}
      </div>
    </div>
    </>
  )
}

  
export default page
