"use client";
import { url } from "@/store/url";
import axios from "axios";

import { useEffect, useState } from "react";
import styles from "../../due-amount/[id]/page.module.css";

import { useCookies } from "react-cookie";

import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop: "20px",
  marginBottom: "100vh",
};
function Enuiry({ params: { id } }) {
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");

  const [showForm, setShowForm] = useState(false);
  const [name , setName] = useState('')
  const [mobile_number , set_Mobile_number]=useState('')

  const [token] = useCookies();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/enquiry/${id}/`, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });

      const res = await response.data;

     

      setData(res);
      setLoading(false);
    } catch (err) {
      // console.log(err.response)
      alert(err.response.data.details);
      setLoading(false);
    }
  };
  const delete_func = async (stid) => {
    setLoading(true);
    try {
      axios.delete(`${url}/delete-enquiry/${stid}/`, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });
      location.reload();
      setLoading(false);
      alert("Deleted");
    } catch (err) {
      alert("Something went wrong");
      setLoading(false);
    }
  };
  const post_data = async () => {
    setLoading(true);
    try {
      axios.post(
        `${url}/enquiry/${id}/`,
        { name: name, mobile_number: mobile_number },
        {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        }
      );
      location.reload();
      setLoading(false);
      alert("Saved");
    } catch (err) {
      alert("Something went wrong");
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
        <div style={{marginBottom:'500px'}}>
          <button style={{margin:'10px'}} onClick={() => setShowForm(!showForm)} className={styles.button}>
        {showForm ? "Hide" : "Add Enquiry"}
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name..."
            className={styles.inputField}
          />
          <input
            type="text"
            value={mobile_number}
            onChange={(e) => set_Mobile_number(e.target.value)}
            maxLength={10}
            placeholder="Mobile Number..."
            className={styles.inputField}
          />
          <button onClick={post_data} className={styles.submitButton}>
            Submit
          </button>
        </div>
      )}
          <>
            {data?.map((item, index) => (
              <div key={index} className={styles.container}>
                <div key={item.id} className={styles.dataContainer}>
                  <p className={styles.seatNumber}>
                    {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                  </p>
                  <p className={styles.name}>{item.mobile_number}</p>
                  <p className={styles.name}>{item.amount}</p>

                  <button
                    className={styles.name}
                    style={{ color: "black" }}
                    onClick={() => delete_func(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
}

export default Enuiry;
