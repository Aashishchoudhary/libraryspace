'use client'
import { url ,getCookie} from '@/store/url'
import axios from 'axios'
import { useState ,useEffect } from 'react'
import styles from './edit.module.css'
import { redirect } from 'next/navigation'



function page({params: {id}}) {
  
  const user = getCookie('authToken')
  const [data , setData]= useState([])
 
 


    const [name, setName] = useState('');
  const [facilty, setFacilty] = useState('');
  const [locality, setlocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setimageTwo] = useState(null);
  const [imageThree, setimageThree] = useState(null);
  const [imageFour, setimageFour] = useState(null);
  const [imageFive, setimageFive] = useState(null);
  const [imageSix, setimageSix] = useState(null);
  const [imageSeven, setimageSeven] = useState(null);
  const [price, setPrice] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [whatsapp_number, setWhatsappNumber] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [total_seat, setTotalSeat] = useState('');
    
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const uploadData = new FormData();
  if (name) uploadData.append('name', name);
  if (facilty) uploadData.append('facilty', facilty);
  if (locality) uploadData.append('locality', locality);
  if (city) uploadData.append('city', city);
  if (state) uploadData.append('state', state);
  if (pincode) uploadData.append('pincode', pincode);

  // Optional image fields (null values are omitted)
  if (imageOne) uploadData.append('imageOne', imageOne);
  if (imageTwo) uploadData.append('imageTwo', imageTwo);
  if (imageThree) uploadData.append('imageThree', imageThree);
  if (imageFour) uploadData.append('imageFour', imageFour);
  if (imageFive) uploadData.append('imageFive', imageFive);
  if (imageSix) uploadData.append('imageSix', imageSix);
  if (imageSeven) uploadData.append('imageSeven', imageSeven);

  if (price) uploadData.append('price', price);
  if (mobile_number) uploadData.append('mobile_number', mobile_number);
  if (whatsapp_number) uploadData.append('whatsapp_number', whatsapp_number);
  if (longitude) uploadData.append('longitude', longitude);
  if (latitude) uploadData.append('latitude', latitude);
  if (total_seat) uploadData.append('total_seat', total_seat);



  const handleSubmit = async () => {
    try {
       await axios.patch(
        `${url}/library-view/${id}/`,
        uploadData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' +user.access,
          },
        },
      );
      alert('Updated');
    } catch (err) {
      console.log(err)
      alert(err);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/library-view/${id}/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',

          Authorization: 'Bearer ' + user.access,
        },
      });
      const res = await response.data;
      setData(res);
      console.log(res)
    } catch (err) {
      console.log();
    }
  };
  const handleSeat = text => {
    if (text < 201) {
      setTotalSeat(text);
    } else {
      alert('seat should be less than 201');
    }
  };


  useEffect(()=>{

      fetchData()
  
  },[])
    
  return (
    <div>
      {data?.data?.map((x, index) => (
        <div key={index}>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={x.name ? x.name : 'Name....'}
          />

          <input
            type="text"
            className={styles.input}
            value={mobile_number}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder={x.mobile_number ? x.mobile_number.toString() : 'Mobile number....'}
            style={{ color: mobile_number.length > 9 ? 'green' : 'red' }}
          />

          <input
            type="number"
            className={styles.input}
            value={total_seat}
            onChange={(e) => handleSeat(e.target.value)}
            placeholder={x.total_seat ? x.total_seat.toString() : 'Number of Seats...'}
          />

          <input
            type="text"
            className={styles.input}
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder={x.locality ? x.locality : 'Address..'}
          />

          <input
            type="text"
            className={styles.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={x.city ? x.city : 'City..'}
          />

          <input
            type="text"
            className={styles.input}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={x.state ? x.state : 'State....'}
          />
        </div>
      ))}

      <button className={styles.touchableOpacity} onClick={()=>handleSubmit()}>
        Update
      </button>
    </div>
  )
}

export default page
