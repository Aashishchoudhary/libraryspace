'use client'
import { url } from "@/store/url";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import HashLoader from "react-spinners/HashLoader";
import styles from './page.module.css'
const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"20px",
  marginBottom:"100vh",
};
function Total({params:{id}}) {
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");
  const [data, setData] = useState([]);
  const [token] = useCookies()
  const fetchData = async () => {
    try {

      const respone = await axios.get(`${url}/total/${id}/`, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });
      const res = await respone.data;
      setData(res);
      setLoading(false)
    } catch (err) {
      alert(err);
    }
  };
  const fetchPayment = async () => {
    await axios.get(`${url}/library-collection/${id}/`, {
      headers: {
        Authorization: "Bearer " +token.access,
      },
    });
  };

  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };
  const currentMonthCollection = data.filter((x) => {
    const currentDate = new Date().getMonth();
    const itemDate = new Date(x.collection_month).getMonth();
    if (currentDate === itemDate) {
      return true;
    }
    return false;
  });
  
  useEffect(() => {
    fetchData();
    fetchPayment()
  }, []);
  return (
   <>{loading?<HashLoader
    color={color}
    loading={loading}
    cssOverride={override}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  />:<>
        <div className={styles.collectionContainer}>
      <div className={styles.collectionSummary}>
        <div>
          <span>Collection this month - </span>
          <span className={styles.amount}>
          ₹ {currentMonthCollection.map(x => x.amount).reduce((acc, amount) => acc + amount, 0)}
          </span>
        </div>
      </div>

      <div className={styles.collectionItems}>
        {data?.map((item) => (
          <div key={item.id} className={styles.collectionItem}>
            <p className="month">
              {months[new Date(item.collection_month).getMonth()]}{' '}
              {new Date(item.collection_month).getFullYear()}
            </p>
            <p className="amount">₹ {item.amount}</p>
          </div>
        ))}
      </div>
    </div>
      
    </>}</> 
  );
}

export default Total;
