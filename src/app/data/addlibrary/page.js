"use client";
import { url } from "@/store/url";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import styles from "../../user/add-library/page.module.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "20px",
    marginBottom: "100vh",
  };
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
function AddLibraryMobile() {
    const [openMap, setOpenMap] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color] = useState("black");
    const router = useRouter();
    const [token] = useCookies();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [mobile_number, setMobileNumber] = useState("");
    const [total_seat, setTotalSeat] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [address, setAddress] = useState("");
  
    const [id , setId] = useState('')
    const [sign , setSign]=useState('')
    const fetchUrlValue=()=>{

        const urlParams = new URLSearchParams(window.location.search);
        setId(urlParams.get("user"));
        setSign(urlParams.get("sign"));
    }


    const uploadData = new FormData();
    if (name) uploadData.append("name", name);
    if (price) uploadData.append("price", price);
    if (mobile_number) uploadData.append("mobile_number", mobile_number);
    if (total_seat) uploadData.append("total_seat", total_seat);
    if (latitude) uploadData.append("latitude", latitude);
    if (longitude) uploadData.append("longitude", longitude);
    if (address) uploadData.append("address", address);
  
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI",
    });
  
    const [map, setMap] = useState(null);
  
    const geocode = async () => {
     
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI&latlng=${latitude},${longitude}`
      );
      const data = await res.data;
    
      setAddress(data.results[0].formatted_address);
    };
  
  
    const onLoad = useCallback(function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(latitude, longitude);
      map.fitBounds(bounds);
  
      setMap(map);
    }, []);
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null);
    }, []);
  
    
  
    const handleSubmit = async () => {
      try {
        setLoading(true);
        if (name.trim().length < 5) {
          alert("Name must be more than 5 letters");
          return;
        } else if (price.trim().length < 1) {
          alert("Please fill the price");
          return;
        } else if (mobile_number.trim().length < 10) {
          alert("fill correct mobile number");
          return;
        }
  
        await axios.post(`${url}/add-library-mobile/${id}/${sign}/`, uploadData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
           
          },
        });
  
        alert("library added");
        router.push("/");
      } catch (err) {
        setLoading(false)
        console.log(err);
        Alert.alert(err.response.data.deatils);
      }
    };
  
    const getLocation = (position) => {
     
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      const getadd = async () => {
     
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI&latlng=${position.coords.latitude},${position.coords.longitude}`
        );
        const data = await res.data;
      
        setAddress(data.results[0].formatted_address);
      };
      getadd()
    };
  
    const getloc=()=> {
     
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation);
      }
      else {
         alert("Geolocation is not supported by this browser.")
      }
    }
    const openMapFunction=()=>{
      getloc()
  
      setOpenMap(!openMap)
    }
  
    useEffect(() => {
      
   
      fetchUrlValue()
      setLoading(false);
    }, []);
    const clickfun = (event) => {
      setLatitude(event.latLng.lat());
      setLongitude(event.latLng.lng());
      geocode();
    };
    const handleSeat = (text) => {
      if (text.target.value < 201) {
        setTotalSeat(text.target.value);
      } else {
        alert("seat should be less than 201");
      }
    };
  
    return (
      <>
        {" "}
        {loading ? (
          <HashLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className={styles.container}>
            <div className={styles.formcontainer_two}>
              <div className={styles.form}>
                <input
                  className={styles.input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Library Name...."
                />
  
                <input
                  className={styles.input}
                  type="text"
                  value={mobile_number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number...."
                />
                <input
                  type="number"
                  value={price}
                  className={styles.input}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="price"
                />
                <button onClick={() => openMapFunction()}>
                 {!openMap? 'Select Location on Map..':"Hide Map"}
                </button>
                {openMap && (
                  <>
                    {isLoaded && (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: latitude, lng: longitude }}
                        zoom={20}
                        onLoad={onLoad}
                        onClick={clickfun}
                        onUnmount={onUnmount}
                      />
                    )}
                  </>
                )}
                <input
                  className={styles.input}
                  type="number"
                  value={total_seat}
                  onChange={(e) => handleSeat(e)}
                  placeholder="Number of Seat...."
                />
                <input
                  className={styles.input}
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="latitude"
                />
                <input
                  className={styles.input}
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="longitude"
                />
                <textarea
                  className={styles.input}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="address"
                />
  
                <button className={styles.button} onClick={() => handleSubmit()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

export default AddLibraryMobile
