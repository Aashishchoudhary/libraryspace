"use client";
import { url, handleImageUpload } from "@/store/url";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import { useCookies } from "react-cookie";
import Image from "next/image";
const Feedback = () => {
  const [token] = useCookies()
 
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const [form, setForm] = useState(false);

  const updateData = new FormData();
  if (message) updateData.append("message", message);

  const postData = async () => {
    try {
      const adha = await handleImageUpload(img || null);
      if (img) updateData.append("img", adha, adha.name);
      await axios.post(`${url}/feedback/`, updateData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token.access
        },
      });
      fetchData()
      setForm(false)
      setMessage('')
      setImg(null)
    } catch (err) {}
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/feedback/`, {
        headers: {
          Authorization: "Bearer " + token.access
        },
      });
      const res = await response.data;
      setData(res);
    } catch (err) {
      alert("something went wrong");
    }
  };
  function showForm() {
    setForm(!form);
  }
  useEffect(() => {
    useCallback(()=>{fetchData()},[fetchData])
  }, []);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={() => showForm()}>
          {form ? "Hide" : "Add"}
        </button>
      </div>
      {form && (
        <div className={styles.formContainer}>
            <div className={styles.form}>
          <textarea
            className={styles.input}
            value={message}
            style={{height:"70px" ,width:'80%'}}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mention any feature you want or any issue with application , Please give your feedback it might help us"
          />
          <input
          
            className={styles.input}
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          {img && <Image className={styles.img} src={URL.createObjectURL(img)} alt='img'/>}
          <button
            style={{ width: "30%" }}
            onClick={postData}
            className={styles.button}
          >
            Submit
          </button>
        </div>
        </div>
      )}
      {data.map((item) => (
        <div className={styles.container} key={item.id}>
          <p className={styles.text}>{item.message}</p>
          <div className={styles.buttonContainer}>
            <Link
              className={item.resolved ? styles.button : styles.buttonDisabled}
              aria-disabled={!item.resolved}
              href={item.resolved?`/data/feedback/${item.id}/`:""}
            >
              {item.resolved ? "View" : "Wait.."}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
