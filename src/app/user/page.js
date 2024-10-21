"use client";
import { url } from "@/store/url";
import axios from "axios";
import React, { useEffect, useState  ,useCallback} from "react";
import styles from "./library-home.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";

function LibraryHome() {
 const [token ] =useCookies()

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
  };
  useEffect(() => {
   useCallback(()=> {fetchData()},[fetchData])
  }, []);
  return (
    <div>
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
        <button
          className={styles.addLibraryButton}
          onClick={() => navigation.navigate("AddLibrary")}
        >
          Add
        </button>
      )}
    </div>
  );
}

export default LibraryHome;
