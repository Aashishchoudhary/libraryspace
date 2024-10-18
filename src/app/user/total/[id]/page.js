'use client'
import { url } from "@/store/url";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function Total({params:{id}}) {
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
    } catch (err) {
      alert(err);
    }
  };
  const fetchPayment = async () => {
    await axios.get(`${url}/library-collection/${id}/`, {
      headers: {
        Authorization: "Bearer " +token,
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
  const currentMonthCollectiion = data.filter((x) => {
    const currentDate = new Date().getMonth();
    const itemDate = new Date(x.collection_month).getMonth();
    if (currentDate === itemDate) {
      return true;
    }
    return false;
  });
  console.log(currentMonthCollectiion)
  useEffect(() => {
    fetchData();
    fetchPayment();
  }, []);
  return (
    <div>
        <div> Collection this month {currentMonthCollectiion.map(x => x.amount)}</div>
      {data?.map((item) => (
        <div key={item.id}>
            <p>{months[new Date(item.collection_month).getMonth()]}{' '}
            {new Date(item.collection_month).getFullYear()}</p>
            <p>{item.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default Total;
