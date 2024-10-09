"use client";
import { getCookie, url, yyyymmdd, handleImageUpload } from "@/store/url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
function Half({ params: { id } }) {
  const router = useRouter();
  const [token] = useState(getCookie("authToken").access);
  const [data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState([]);

  const [search, setSearch] = useState('');
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartdate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState("");
  const [adharcard, setAdharcard] = useState("");
  const [photo, setPhoto] = useState("");

  const [check, setCheck] = useState(false);
  const [display, setDisplay] = useState(false);

  const updateData = new FormData();
  if (name) updateData.append('name', name);
  if (mobile) updateData.append('mobile_number', mobile);
  if (startDate) updateData.append('start_date', yyyymmdd(startDate));
  if (endDate) updateData.append('end_date', yyyymmdd(endDate));
  if (dob) updateData.append('dob', yyyymmdd(dob));
  if (adress) updateData.append('adress', adress);
  if (gender) updateData.append('gender', gender);
  if (amount) updateData.append('amount', amount);
  if (adharcard) updateData.append('adharcard', adharcard);
  if (photo) updateData.append('photo', photo);

  const funCheck = () => {
    setCheck(true);
  };

  const createRoom = async () => {
    try {
      // Call signatureGenration() and handle potential errors
      const response = await axios.get(`${url}/create-signature/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token,
        },
      });
      const res = await response.data;

      // Construct the complete URL with all necessary parameters
      const qr_value = `${url}/chat-page/?libid=${id}&user_id=${
        jwtDecode(token).access
      }&sign=${res["sign"]}&url=add-half-time`;
      router.push(`/user/QR/?data=${qr_value}`);
      // Perform navigation using navigation.navigate
    } catch (error) {
      // Handle errors gracefully, e.g., display an error message or retry logic
      console.error("Error creating room:", error);
      // You can add error handling specific to your application's requirements
    }
  };



  const postData = async () => {
    try {
      await axios.post(`${url}/extra-student/${id}/`, updateData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      console.warn("Data Saved");
      setCheck(false);
      fetchData();
    } catch (err) {
      console.log(err.response);
      // alert('Something went wrong please try again later');
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/extra-student/${id}/`, {
        headers: {
          Authorization: 'Bearer ' +token,
        },
      });

      const res = await response.data;
      const newData = res.slice().sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
      
      setFilteredData(newData);
      setData(res);
    } catch (err) {
      // console.log(err.response)
      alert(err.response.data);
    }
  };
  const filterFun = () => {
    setDisplay(!display )
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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
      {data?.length < 1 && (
          <div className={styles.btncontainer}>
            <button className={styles.btnbutton} onClick={() => createRoom()}>
              <p className={styles.btnbutton}>Show QR</p>
            </button>
          </div>
        )}
      </div>
      <div className={styles.subCon}>
        <input
          className={styles.textInputStyle}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Here"
        />
        <button onClick={() => filterFun()} className={styles.filterButton}>
          <p className={styles.filterButtonText}>
            {!display ? "Filter" : "Hide"}
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
          key={item.id}
          href={`/user/extra-data/${item.id}/`}
          className={[
            styles.container,
            item.id % 2 ? styles.evenStyle : styles.oddStyle,
          ]}
        >
          <div key={item.id}>
            <p className={styles.seatNumber}>{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</p>
            <p>{item.mobile_number}</p>
            <p>{item.amount}</p>
            <p>{item.end_date}</p>
            {new Date(item.end_date) < new Date() && (
              <p className={styles.expired}>Expired</p>
            )}
            {new Date(item.end_date) > new Date() && (
              <p style={styles.expiring}>
                Days Left{" "}
                {Math.floor(
                  (new Date(item.end_date).getTime() - new Date().getTime()) /
                    86400000,
                )}
              </p>
            )}
            
           
          </div>
        </Link>
      ))}
      
    </>
  );
}

export default Half;
