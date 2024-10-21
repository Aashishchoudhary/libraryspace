'use client'
import { url } from '@/store/url'
import axios from 'axios'
import { useState ,useEffect ,useCallback } from 'react'
import styles from './edit.module.css'
import { useCookies } from "react-cookie";



function Page({params: {id}}) {
  
const [token] = useCookies()
 
 
 


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
            Authorization: 'Bearer ' +token.access,
          },
        },
      );
      alert('Updated');
      fetchData()
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

          Authorization: 'Bearer ' + token.access,
        },
      });
      const res = await response.data;
    
   
      {res.data[0].name&&setName(res.data[0].name)}
      {res.data[0].facilty&&setFacilty(res.data[0].facilty)}
      {res.data[0].locality&&setlocality(res.data[0].locality)}
      {res.data[0].city&&setCity(res.data[0].city)}
      {res.data[0].state&&setState(res.data[0].state)}
      {res.data[0].pincode&&setPincode(res.data[0].pincode)}
      {res.data[0].total_seat&&setTotalSeat(res.data[0].total_seat)}
      {res.data[0].mobile_number&&setMobileNumber(res.data[0].mobile_number)}
      {res.data[0].whatsapp_number&&setWhatsappNumber(res.data[0].whatsapp_number)}
      {res.data[0].latitude&&setLatitude(res.data[0].latitude)}
      {res.data[0].longitude&&setLongitude(res.data[0].longitude)}
    } catch (err) {
      console.log();
    }
  };
  const getLocation = (position) => {
    // if(position.coords){
    // alert('coordinates of current location is' ,position.coords.latitude .position.coords.longitude)
    // }
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    
  };

  function getlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation);
      // console.log(navigator.geolocation.getCurrentPosition())
    }
  }
  
  useEffect(() => {
    useCallback(()=>{fetchData();
    getlocation()},[getLocation , fetchData])
  }, []);
  const handleSeat = (text) => {
    if (text.target.value < 201) {
      setTotalSeat(text.target.value);
    } else {
      alert("seat should be less than 201");
    }
  };
    
  return (
    <div className={styles.container}>
    <div className={styles.formcontainer_two}>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Library Name....'
        />
        <input
          className={styles.input}
          type="text"
          value={facilty}
          onChange={(e) => setFacilty(e.target.value)}
          placeholder='Facilities...'
        />
        <input
          className={styles.input}
          type="text"
          value={locality}
          onChange={(e) => setlocality(e.target.value)}
          placeholder='Address'
        />
        <input
          className={styles.input}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='City....'
        />
        <input
          className={styles.input}
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder='State....'
        />
        <input
          className={styles.input}
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder='Pincode...'
        />
        <input
          className={styles.input}
          type="text"
          value={mobile_number}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder='Mobile Number....'
        />
        <input
          className={styles.input}
          type="text"
          value={whatsapp_number}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder='WhatsApp Number...'
        />
        <input
          className={styles.input}
          type="number"
          value={total_seat}
          onChange={(e) => handleSeat(e)}
          placeholder='Number Seat'
        />
        <input
          className={styles.input}
          type="number"
          value={longitude}
          onChange={() => getlocation()}
          placeholder='Longitude'
        />
        <input
          className={styles.input}
          type="number"
          value={latitude}
          onChange={() => getlocation()}
          placeholder='latitude'
        />
        <button className={styles.button} onClick={() => handleSubmit()}>Submit</button>
       \
      </div>
    </div>
  </div>
  )
}

export default Page
