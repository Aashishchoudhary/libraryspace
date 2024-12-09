"use client";
import { url } from "@/store/url";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./library-home.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"20px",
  marginBottom:"100vh",
};

function LibraryHome() {
  
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");
 const [token ] =useCookies()
const router = useRouter()
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`${url}/library-view/`, {
      headers: {
        Authorization: "Bearer " + token.access,
      },
    });
    const res = await response.data;
    setData(res);
    console.log(res);
    setLoading(!loading)
  };
  useEffect(() => {
   fetchData()
  }, []);
  return (
  <> {loading?<HashLoader
    color={color}
    loading={loading}
    cssOverride={override}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  />: <div>
      {data.length > 0 ? (
        <div className={styles.container}>
          {data.map((item) => (
            <div key={item.id}>
              <div className={styles.libraryItem}>
                <Link style={{textDecoration:"none"}}  href={`/user/view-seat/${item.id}`}>
                  <h3 className={styles.libraryName}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </h3>
                  <p className={styles.seatNumber}>
                    Total Seats: {item.total_seat}
                  </p>
                </Link>
              </div>
              <div className={styles.buttonContainer}>
                <Link style={{textDecoration:"none"}}
                  className={styles.button}
                  href={`/user/view-all-seat/${item.id}`}
                >
                  View Data
                </Link>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/total/${item.id}`}>
                  Total Collection
                </Link>
              </div>

              <div className={styles.buttonContainer}>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/extra/${item.id}`}>
                  Extra
                </Link>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/half/${item.id}`}>
                  Half Day
                </Link>
              </div>
              <div className={styles.buttonContainer}>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/due-amount/${item.id}`}>
                  Due Amount
                </Link>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/ending/${item.id}`}>
                  End in 5 Days
                </Link>
              </div>
              <div className={styles.buttonContainer}>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/bday/${item.id}`}>
                  BirthDay this month
                </Link>
                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/enquiry/${item.id}`}>
                 Enquiry
                </Link>
              </div>

              <div className={styles.buttonContainer}>
                <Link style={{textDecoration:"none"}}
                  className={styles.button}
                  href={`/user/previous/${item.id}/`}
                >
                  Deleted Data
                </Link>

                <Link style={{textDecoration:"none"}} className={styles.button} href={`/user/edit/${item.id}/`}>
                  Edit Library
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.btnContainer}>

        <button
          className={styles.addLibraryButton}
          onClick={() =>router.push('/user/add-library/')}
          >
          Add
        </button>
          </div>
      )}
    </div>}
    </>
  );
}

export default LibraryHome;
