"use client";
import { url} from "@/store/url";
import axios from "axios";
import {  useEffect, useState } from "react";
import styles from "./page.module.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
function AddLibrary() {
  const router = useRouter()
  const [token] = useCookies()
  const [name, setName] = useState("");
  const [facilty, setFacilty] = useState("");
  const [locality, setlocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
 
  const [price, setPrice] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [whatsapp_number, setWhatsappNumber] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [total_seat, setTotalSeat] = useState("");

  // geo location

  const uploadData = new FormData();
  if (name) uploadData.append("name", name);
  if (facilty) uploadData.append("facilty", facilty);
  if (locality) uploadData.append("locality", locality);
  if (city) uploadData.append("city", city);
  if (state) uploadData.append("state", state);
  if (pincode) uploadData.append("pincode", pincode);

  // Optional image fields (null values are omitted)
 

  if (price) uploadData.append("price", price);
  if (mobile_number) uploadData.append("mobile_number", mobile_number);
  if (whatsapp_number) uploadData.append("whatsapp_number", whatsapp_number);
  if (longitude) uploadData.append("longitude", longitude);
  if (latitude) uploadData.append("latitude", latitude);
  if (total_seat) uploadData.append("total_seat", total_seat);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/add-library/`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      const res = await response.data;
      console.log(res.count);

      if (res.count > 4) {
        Alert.alert("you can not add more , please contact to HELP center");
      }
    } catch (err) {
      console.log(err);
    }
  };




  const handleSubmit = async () => {
    try {
      if(name.trim().length<5){
        alert("Name must be more than 5 letters")
        return
      }
      else if(locality.trim().length<1){
        alert('fill the adress')
        return
      }
      else if(city.trim().length<1){
        alert('fill city')
        return
      }
      else if(state.trim().length<1){
        alert('Fill state')
        return
      }
      else if(pincode.trim().length<6){
        alert('Fill correct pincode')
        return
      }
      else if(mobile_number.trim().length<10){
        alert('fill correct mobile number')
        return
      }
    
      
       await axios.post(`${url}/add-library/`, uploadData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token.access,
        },
      });

      

     alert("library added")
     router.push('/user')
    } catch (err) {
      console.log('dd' , err)
      Alert.alert(err.response.data.deatils);
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
   fetchData();
    getlocation()
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
            defaultValue={longitude}
            
            placeholder='Longitude'
          />
          <input
            className={styles.input}
            type="number"
            defaultValue={latitude}
            
            placeholder='latitude'
          />
          <button className={styles.button} onClick={() => handleSubmit()}>Submit</button>
         
        </div>
      </div>
   
    </div>
  );
}

export default AddLibrary;
