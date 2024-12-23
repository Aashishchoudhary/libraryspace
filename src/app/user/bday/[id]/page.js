"use client";
import { url } from "@/store/url";
import axios from "axios";


import { useEffect, useState } from "react";
import styles from "../../due-amount/[id]/page.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";

import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop: "20px",
  marginBottom: "100vh",
};
function Bday({ params: { id } }) {
    let [loading, setLoading] = useState(true);
    let [color] = useState("black");
   
    const [token] = useCookies();
    const [data, setData] = useState([]);
    const [noBday , setNoBday] =useState(false)
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/bday/${id}/`, {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        });
  
        const res = await response.data;
  
        if(res.seat.length<1&&res.half.length<1&&res.extra.length<1){setNoBday(true)}

        setData(res);
        setLoading(false);
      } catch (err) {
        // console.log(err.response)
        alert(err.response.data.details);
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    return (
      <>
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
          <div>
            <>
              {data?.seat?.map((item, index) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={index}
                  href={`/user/view-bday-amount-expire-seat/${id}/${item.id}/?push_back_id=${id}`}
                  className={styles.container}
                >
                  <div key={item.id} className={styles.dataContainer}>
                    <p className={styles.seatNumber}>
                      {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                    </p>
                    <p className={styles.name}>{item.mobile_number}</p>
                    <p className={styles.name} style={{color:'green'}}>{item.dob}</p>
                  
                  </div>
                </Link>
              ))}
            </>
            <>
              {data?.half?.map((item, index) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={index}
                  href={`/user/half/${id}/${item.id}/`}
                  className={styles.container}
                >
                  <div key={item.id} className={styles.dataContainer}>
                    <p className={styles.seatNumber}>
                      {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                    </p>
                    <p className={styles.name}>{item.mobile_number}</p>
                   
                  </div>
                </Link>
              ))}
            </>
            <>
              {data?.extra?.map((item, index) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={index}
                  href={`/user/extra/${id}/${item.id}/`}
                  className={styles.container}
                >
                  <div key={item.id} className={styles.dataContainer}>
                    <p className={styles.seatNumber}>
                      {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                    </p>
                    <p className={styles.name}>{item.mobile_number}</p>
                   
                  </div>
                </Link>
              ))}
            </>
          </div>
        )}
        {noBday&&<p style={{margin:'10px' , color:'black'  , fontSize:'18px'}}> No birthday found this month </p>}
      </>
    );
  }

export default Bday
