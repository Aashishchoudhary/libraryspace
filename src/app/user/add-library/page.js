"use client";
import { url} from "@/store/url";
import axios from "axios";
import React, {  useEffect, useState , useCallback} from "react";
import styles from "./page.module.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import HashLoader from "react-spinners/HashLoader";

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"20px",
  marginBottom:"100vh",
};
const containerStyle = {
  width: '400px',
  height: '400px',
  
}

function AddLibrary() {
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");
  const router = useRouter()
  const [token] = useCookies()
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [total_seat, setTotalSeat] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address , setAddress]=useState('')


  const uploadData = new FormData();
  if (name) uploadData.append("name", name);
  if (price) uploadData.append("price", price);
  if (mobile_number) uploadData.append("mobile_number", mobile_number);
  if (total_seat) uploadData.append("total_seat", total_seat);
  if(latitude)uploadData.append('latitude' , latitude)
    if(longitude)uploadData.append('longitude' , longitude)
    if(address)uploadData.append('address' , address)
  







  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI',
  })

  const [map, setMap] = useState(null)

  
  const geocode=async()=>{
  const res= await  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI&latlng=${latitude},${longitude}`)
  const data = await res.data
  console.log(data.results[0].formatted_address)
  setAddress(data.results[0].formatted_address)
  }


console.log({lat:latitude , lng:longitude})

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(latitude , longitude)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


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
      setLoading(true)
      if(name.trim().length<5){
        alert("Name must be more than 5 letters")
        return
      }
      else if(price.trim().length<1){
        alert("Please fill the price")
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
     router.push('/')
    } catch (err) {
     console.log(err)
      Alert.alert(err.response.data.deatils);
    }
  };

  const getLocation = (position) => {
    
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
  
    setLoading(false)
    
  }, []);
  const clickfun=(event)=>{setLatitude(event.latLng.lat())
    setLongitude(event.latLng.lng())
    geocode()
    
  }
  const handleSeat = (text) => {
    if (text.target.value < 201) {
      setTotalSeat(text.target.value);
    } else {
      alert("seat should be less than 201");
    }
  };

  
  return (
    <> {loading? <HashLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />:<div className={styles.container}>
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
            value={mobile_number}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder='Mobile Number....'
          />
         <input type="number"
         value={price}
         className={styles.input}
         onChange={(e)=>setPrice(e.target.value)}
         placeholder="price"
         />
          {isLoaded &&
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{lat:latitude , lng:longitude}}
      zoom={5}
      onLoad={onLoad}
      onClick={clickfun}
      onUnmount={onUnmount}
    />}
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
            value={latitude}
            onChange={(e) =>setLatitude(e.target.value)}
            placeholder='latitude'
          />
          <input
            className={styles.input}
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder='longitude'
          />
          <textarea
            className={styles.input}
           
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='address'
          />
          
          <button className={styles.button} onClick={() => handleSubmit()}>Submit</button>
         
        </div>
      </div>
  

    
    </div>}</>
  );
}

export default AddLibrary;
