"use client";
import { url } from "@/store/url";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect  ,useCallback} from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import styles from "./page.module.css";
import { useCookies } from "react-cookie";
import HashLoader from "react-spinners/HashLoader";

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"20px",
  marginBottom:"100vh",
};
Chart.register(CategoryScale);
 
function Page({ params: { id } }) {
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");
  const [token] = useCookies()
  const [data, setData] = useState([]);
  const [seatData, setSeatData] = useState({});

  const fetchSeatData = async () => {
    const response = await axios.get(`${url}/booked-seat/${id}/`, {
      headers: {
        Authorization: "Bearer " + token.access,
      },
    });
    const res = await response.data;
    console.log("res", res);
    setSeatData(res);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/view-seat/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " +token.access,
        },
      });
      const res = await response.data;

      console.log("data", res, res.booked);
      setData(res);
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  };
  useEffect(() => {
   fetchData();
    fetchSeatData()
  }, []);

  const chartData = {
    labels: ["Booked Seats", "Vaccent Seats"],
    datasets: [
      {
        data: [seatData.booked, seatData.vaccent],

        backgroundColor: [ "gray" ,"green"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const BarChatData = {
    labels: ["15 - 20 age", "20-25 age", "25-30 age", "30+ age"],
    datasets: [
      {
        data: [
          seatData.above15,
          seatData.above20,
          seatData.above25,
          seatData.above30,
        ],
        // data:[10 , 23 , 40 , 15],
        label: "Number of students",
        backgroundColor: ["orange"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const generData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [seatData.male, seatData.female],
        // data:[10 , 23 , 40 , 15],
        label: "Number of students",
        backgroundColor: ["#01A6EA", "pink"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
  <>
   {loading?<HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />: <div className={styles.container}>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <Pie data={chartData} />
        </div>
        <div className={styles.chart}>
          <Bar data={BarChatData} />
        </div>
        <div className={styles.chart}>
          <Bar data={generData} />
        </div>
      </div>

      <div className={styles.seatContainer}>
        <div className={styles.seat}>
          {data?.data?.map((item) => (
            <Link
              key={item.id}
              className={!item.booked ? styles.chair : styles.chairBooked}
              href={`/user/view-seat/${id}/${item.id}/`}
            >
              {/* You can add an icon here if needed */}
              <p className={styles.chairNumber}>{item.seat_num}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>}</>
  );
}

export default Page;
