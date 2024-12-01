"use client";
import {  url, yyyymmdd, handleImageUpload } from "@/store/url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Image from "next/image";
import HashLoader from "react-spinners/HashLoader";

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"20px",
  marginBottom:"100vh",
};
function Extra({ params: { id } }) {
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");
  const router = useRouter();
  const [token] = useCookies()
  const [data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState([]);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const date_today=yyyymmdd(new Date()) 
  const [startDate, setStartdate] = useState(date_today);

  const [endDate, setEndDate] = useState(date_today);
  const [amount, setAmount] = useState("");
  const [dob, setDob] = useState(date_today);
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState("");
  const [adharcard, setAdharcard] = useState("");
  const [photo, setPhoto] = useState("");

  
  const [display, setDisplay] = useState(false);

  const updateData = new FormData();
  if (name) updateData.append("name", name);
  if (mobile) updateData.append("mobile_number", mobile);
  if (startDate) updateData.append("start_date",startDate);
  if (endDate) updateData.append("end_date", endDate);
  if (dob) updateData.append("dob",dob);
  if (adress) updateData.append("adress", adress);
  if (gender) updateData.append("gender", gender);
  if (amount) updateData.append("amount", amount);
  if (adharcard) updateData.append("adharcard", adharcard);
  if (photo) updateData.append("photo", photo);

 

  const createRoom = async () => {
    try {
      // Call signatureGenration() and handle potential errors
      const response = await axios.get(`${url}/create-signature/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access,
        },
      });
      const res = await response.data;

      // Construct the complete URL with all necessary parameters
      const qr_value = `${url}/half-chat-page/?libid=${id}&user_id=${
        jwtDecode(token.access).user_id
      }&sign=${res["sign"]}&url=add-extra-time`;
      router.push(`/user/QR/?data=${qr_value}`);
      // Perform navigation using navigation.navigate
    } catch (error) {
      // Handle errors gracefully, e.g., display an error message or retry logic
      console.error("Error creating room:", error);
      // You can add error handling specific to your application's requirements
    }
  };

  const postData = async () => {
    
    const adha = await handleImageUpload(adharcard || null);
    const pho = await handleImageUpload(photo || null);
    if (adha) updateData.append("adharcard", adha, adha.name);
    if (pho) updateData.append("photo", pho, pho.name);
    try {
      setLoading(true)
      await axios.post(`${url}/extra-student/${id}/`, updateData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token.access,
        },
      });
      console.warn("Data Saved");
      
      fetchData();
      setLoading(false)
    } catch (err) {
      console.log(err)
      if(err.status==400){
        alert("please fill all the fields")
       }
       else{

        alert("check all the data fileds or try again later")
       
        }
        setLoading(false)
      // alert('Something went wrong please try again later');
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/extra-student/${id}/`, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });

      const res = await response.data;
      const newData = res.slice().sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      setFilteredData(newData);
      setData(res);
      setLoading(false)
    } catch (err) {
      // console.log(err.response)
      setLoading(false)
      alert(err.response.data.details);;
    }
  };
  const filterFun = () => {
    setDisplay(!display);
  };

  const expireDate = () => {
    setDisplay(false);
    const newData = data.slice().sort((a, b) => {
      return new Date(a.end_date) - new Date(b.end_date);
    });

    setFilteredData(newData);
  };
  const admissionDate = () => {
    setDisplay(false);
    const newData = data.slice().sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    setFilteredData(newData);
  };
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item?.name
          ? item?.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };

  useEffect(() => {
   fetchData()
  }, []);
  return (
    <>
     {loading?<HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />: <div className={styles.subCon}>
        <div className={styles.mainContainer}>
          <div className={styles.serachField}>
            <input
              className={styles.textInputStyle}
              onChange={(e) => searchFilterFunction(e.target.value)}
              value={search}
              type="text"
              placeholder="Search Here"
            />
            <button onClick={() => filterFun()} className={styles.filterButton}>
              <p className={styles.filterButtonText}>
                {!display ? "Filter" : "Hide"}
              </p>
            </button>
            <button
              style={{ background: "#6e3b96" }}
              className={styles.filterButton}
              onClick={() => createRoom()}
            >
              <p style={{ color: "black" }} className={styles.filterButtonText}>
                show Qr
              </p>
            </button>

            {display && (
              <div>
                <button onClick={() => expireDate()}>Expire</button>
                <button onClick={() => admissionDate()}>Newer</button>
              </div>
            )}
          </div>
          {filterdData?.map((item) => (
            <Link
              style={{ textDecoration: "none" }}
              key={item.id}
              href={`/user/extra/${id}/${item.id}/?push_back_id=${id}`}
              className={styles.container}
            >
              <div key={item.id} className={styles.dataContainer}>
                <p className={styles.seatNumber}>
                  {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                </p>
                <p className={styles.name}>{item.mobile_number}</p>
                <p className={styles.name}>{item.amount}</p>
                <p className={styles.name}>{item.end_date}</p>
                {new Date(item.end_date) < new Date() && (
                  <p className={styles.expired}>Expired</p>
                )}
                {new Date(item.end_date) > new Date() && (
                  <p className={styles.expiring}>
                    Days Left{" "}
                    {Math.floor(
                      (new Date(item.end_date).getTime() -
                        new Date().getTime()) /
                        86400000
                    )}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.dataContainer_two}>
          <div className={styles.formcontainer_two}>
            <div className={styles.form}>
              <input
                type="text"
                className={styles.input}
                value={name}
                placeholder="Name..."
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                className={
                  `input ${mobile.length > 9 ? "green" : "red"} ` + styles.input
                }
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
                <label className={styles.label}>Date of Birth</label>
                <input
                className={styles.input}
                style={{width:"40%"}}
                  type="date"
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
                  checked={gender == "Female"}
                />
                 {" "}
                <label className={styles.label} htmlFor="female">
                  Female
                </label>
                <br />
                <input
                  type="radio"
                  onChange={(e) => setGender(e.target.value)}
                  id="male"
                  name="gender"
                  value="Male"
                  checked={gender == "Male"}
                />
                 {" "}
                <label className={styles.label} htmlFor="male">
                  Male
                </label>
                <br />
              </div>

              <div className={styles.dateCon}>
                <label className={styles.label}>From</label>
                <input
                className={styles.input}
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartdate(e.target.value)}
                />
                <label className={styles.label}>To</label>
                <input
                className={styles.input}
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              {/* Image selection */}
              <div className={styles.imageupload}>
                <label className={styles.label}>Upload Photo</label>
                <input
                className={styles.input}
                style={{width:"40%"}}
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && (
                  <Image
                    className={styles.img}
                    src={URL.createObjectURL(photo)}
                    alt="phtot"
                    width={100}
                  height={100}
                  />
                )}
              </div>

              <div className={styles.imageupload}>
                <label className={styles.label}>Upload Aadharcard</label>
                <input
                className={styles.input}
                style={{width:"40%"}}
                  type="file"
                  onChange={(e) => setAdharcard(e.target.files[0])}
                />
                {adharcard && (
                  <Image
                    className={styles.img}
                    src={URL.createObjectURL(adharcard)}
                    alt="Aadharcard"
                    width={100}
                  height={100}
                  />
                )}
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => postData()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
       
      </div>}
    </>
  );
}

export default Extra;
