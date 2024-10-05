'use client'
import { useRef, useState, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";
import styles from "./add-data.module.css";
import { url ,handleImageUpload  ,getCookie ,yyyymmdd } from "@/store/url";
import axios from "axios";


function AddData({ params: { id,seatid } }) {
    
  
   
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [startDate, setStartdate] = useState(yyyymmdd(new Date()));
  
  const [endDate, setEndDate] = useState(yyyymmdd(new Date()));
  const [amount, setAmount] = useState("");
  const [dob, setDob] = useState(yyyymmdd(new Date()));
  const [gender, setGender] = useState("");
  const [adress, setAdress] = useState("");
  const [adharcard, setAdharcard] = useState("");
  const [photo, setPhoto] = useState("");

  // chat room creation  and qr code
  const createRoom = async () => {
    try {
      // Call signatureGenration() and handle potential errors
      const response = await axios.get(`${url}/create-signature/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + getCookie('authToken').access,
        },
      });
      const res = await response.data;

      // Construct the complete URL with all necessary parameters
      const url = `${url}/chat-page/?libid=${id}&id=${seatid}&user_id=${userId["user_id"]}&sign=${res["sign"]}`;

      // Perform navigation using navigation.navigate
      navigation.navigate("QR", { data: url });
    } catch (error) {
      // Handle errors gracefully, e.g., display an error message or retry logic
      console.error("Error creating room:", error);
      // You can add error handling specific to your application's requirements
    }
  };

  // image picker

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/view-seat/${id}/${seatid}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + getCookie('authToken').access,
        },
      });
      const res = await response.data;

      setData(res);

      setDob(
        res.seat_data[0]["dob"] ?yyyymmdd(new Date(res.seat_data[0]["dob"])) : new Date()
      );
      setEndDate(
        res.seat_data[0]["end_date"]
          ? yyyymmdd(new Date(res.seat_data[0]["end_date"]))
          : yyyymmdd(new Date())
      );
      // setstdate(res.data[0]['start_date']? new Date(res.data[0]['start_date']):new Date())
     
    } catch (e) {
      console.log("error ", e);
    }
  };

  
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.container}>
      {/* Form for empty seat data */}
      
        <div className={styles.formcontainer}>
          <input
            type="text"
            className={styles.input}
            value={name}
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className={`input ${mobile.length > 9 ? "green" : "red"}`}
            value={mobile}
            placeholder="Mobile number..."
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="text"
            className={styles.input}
            value={amount}
            placeholder="Amount..."
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            className={styles.input}
            value={adress}
            placeholder="Address..."
            onChange={(e) => setAdress(e.target.value)}
          />

          <div className={styles.dateCon}>
            <label>Date of Birth</label>
            <input
              type='date'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            
            />
          </div>

          {/* Gender Radio buttons */}
          <div className={styles.radiocontainer}>
            <input
              type="radio"
              onChange={(e) => setGender(e.target.value)}
              id="female"
              name="gender"
              value="Female"
            />
              <label htmlFor="female">Female</label>
            <br />
            
            <input
              type="radio"
              onChange={(e) => setGender(e.target.value)}
              id="male"
              name="gender"
              value="Male"
            />
              <label htmlFor="male">Male</label>
            <br />
          </div>

          <div className={styles.dateCon}>
            <label>From</label>
            <input
            type='date'
              value={startDate}
              onChange={(e) => setStartdate(e.target.value)}
              
            />
            <label>To</label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              
            />
          </div>

          {/* Image selection */}
          <div className={styles.imageupload}>
            <label>Upload Photo</label>
            {/* <input
              type="file"
              onChange={(e) => handleFileChange(e, setPhoto)}
              accept="image/*"
            /> */}
            {/* {photo && <img src={URL.createObjectURL(photo)} alt="Selected" />} */}
          </div>

          <div className={styles.imageupload}>
            <label>Upload Aadharcard</label>
            {/* <input
              type="file"
              onChange={(e) => handleFileChange(e, setAdharcard)}
              accept="image/*"
            />
            {adharcard && (
              <img src={URL.createObjectURL(adharcard)} alt="Aadharcard" />
            )} */}
          </div>

          <div className="button-container">
            <button className="button" onClick={()=>postData()}>
              Save
            </button>
          </div>
        </div>
      
       
        

    </div>
  );
}

export default AddData;
