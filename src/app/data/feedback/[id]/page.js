"use client";
import { url, getCookie } from "@/store/url";
import axios from "axios";
import { useState, useEffect } from "react";

function Feedback_reply({ params: { id } }) {
    const [token] = useState(getCookie("authToken").access);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/feedback/${id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
     
      const res = await response.data;
      setData(res);
    } catch (err) {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div style={{display:"grid" ,gridColumn:"auto" , justifyContent:"center",padding:"20px" ,margin:"30px"}}><p>{data.reply}</p></div>;
}

export default Feedback_reply;
