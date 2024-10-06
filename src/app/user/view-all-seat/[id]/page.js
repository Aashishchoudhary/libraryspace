"use client";
import { url, getCookie } from "@/store/url";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

function View_all_seat({ params: { id } }) {
  
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item?.data[0]?.name
          ? item?.data[0]?.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const shortedData = () => {
    setDisplay(false);
    const dtt = masterDataSource.slice().sort((a, b) => {
      const aEndDate = a.data?.[0]?.end_date || "";
      const bEndDate = b.data?.[0]?.end_date || "";

      if (aEndDate === "" && bEndDate === "") {
        // If both are empty, consider them equal.
        return 0;
      } else if (aEndDate === "") {
        // If only aEndDate is empty, b should come before a.
        return 1;
      } else if (bEndDate === "") {
        // If only bEndDate is empty, a should come before b.
        return -1;
      } else {
        return new Date(aEndDate) - new Date(bEndDate);
      }
    });
    setFilteredDataSource(dtt);
  };
  const admissionData = () => {
    setDisplay(false);
    const dtt = masterDataSource.slice().sort((a, b) => {
      const aEndDate = a.data?.[0]?.updated_at || "";
      const bEndDate = b.data?.[0]?.updated_at || "";
      if (aEndDate === "" && bEndDate === "") {
        // If both are empty, consider them equal.
        return 0;
      } else if (aEndDate === "") {
        // If only aEndDate is empty, b should come before a.
        return 1;
      } else if (bEndDate === "") {
        // If only bEndDate is empty, a should come before b.
        return -1;
      } else {
        return new Date(bEndDate) - new Date(aEndDate);
      }
    });
    setFilteredDataSource(dtt);
  };

  //
  const fetchData = async () => {
    const response = await axios.get(
      `${url}/all-seat-reservation-view/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("authToken").access,
        },
      }
    );

    const res = await response.data;

    setFilteredDataSource(res);
    setMasterDataSource(res);
  };
  const filterFun = () => {
    setDisplay(!display )
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subCon}>
        <input
          className={styles.textInputStyle}
          onChange={(e) => searchFilterFunction(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Here"
        />
        <button
          onClick={() => filterFun()}
          className={styles.filterButton}
        >
          <p className={styles.filterButtonText}>{!display?'Filter':"Hide"}</p>
        </button>
        {display &&<div><button onClick={()=>shortedData()}>Expire</button><button onClick={()=>admissionData()}>Newer</button></div>}
      </div>
      {filteredDataSource?.map((item) => (
        <Link
          key={item.seat_num}
          href={`/user/view-all-seat-data/${item?.ser?.map(y => y.id)}/`}
          className={[
            styles.container,
            item.seat_num % 2 ? styles.evenStyle : styles.oddStyle,
          ]}
        >
          <div key={item.id}>
            <p className={styles.seatNumber}>{item.seat_num}</p>
            {item?.data?.map((x) => (
              <div key={x.id}>
                <p className={styles.name}>
                  {x.name.slice(0, 1).toUpperCase() + x.name.slice(1)}
                </p>
                <p className={styles.endDate}>{x.end_date}</p>
                {new Date(x.end_date) < new Date() && (
                  <p className={styles.expired}>Expired</p>
                )}
                {new Date(x.end_date) > new Date() && (
                  <p className={styles.expiring}>
                    Days Left{" "}
                    {Math.floor(
                      (new Date(x.end_date).getTime() - new Date().getTime()) /
                        86400000
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default View_all_seat;
