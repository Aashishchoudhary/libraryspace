"use client";
import { useRef, useState, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";
import styles from "./page.module.css";
import { url, handleImageUpload, getCookie, yyyymmdd } from "@/store/url";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
function ViewHalf({ params: { id } }) {
  const [token] = useCookies()
  const orig = "http://localhost:8000";
  const router = useRouter();

  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = async () => {
    const image = await takeScreenshot(ref.current);
    if (!image) {
      console.error("Error taking screenshot!");
      return;
    }
    const a = document.createElement("a");
    a.href = image;
    a.download = `${name}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // router push id
  const [pushBackId, setPushBackId] = useState("");
  const fetch_push_back_id = () => {
    const url = new URLSearchParams(window.location.search);
    setPushBackId(url.get("push_back_id"));
  };

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartdate] = useState(yyyymmdd(new Date()));

  const [endDate, setEndDate] = useState(yyyymmdd(new Date()));
  const [amount, setAmount] = useState("");
  const [dob, setDob] = useState(yyyymmdd(new Date()));
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState("");
  const [adharcard, setAdharcard] = useState("");
  const [photo, setPhoto] = useState("");

  // chat room creation  and qr code

  // image picker

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/half-day-student-view/${id}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access,
        },
      });
      const res = await response.data;

      setData(res);
      console.log(res);

      res.data[0]["dob"] && setDob(yyyymmdd(new Date(res.data[0]["dob"])));

      res.data[0]["end_date"] &&
        setEndDate(yyyymmdd(new Date(res.data[0]["end_date"])));
      res.data[0]["start_date"] &&
        setStartdate(yyyymmdd(new Date(res.data[0]["start_date"])));
      res.data[0]["name"] && setName(res.data[0]["name"]);
      res.data[0]["adress"] && setAdress(res.data[0]["adress"]);
      res.data[0]["mobile_number"] && setMobile(res.data[0]["mobile_number"]);
      res.data[0]["amount"] && setAmount(res.data[0]["amount"]);
      res.data[0]["gender"] && setGender(res.data[0]["gender"]);
    } catch (e) {
      console.log("error ", e);
    }
  };

  const updateData = new FormData();
  if (name) updateData.append("name", name);
  if (mobile) updateData.append("mobile_number", mobile);
  if (startDate) updateData.append("start_date", startDate);
  if (endDate) updateData.append("end_date", endDate);

  if (amount) updateData.append("amount", amount);
  if (adharcard) updateData.append("adharcard", adharcard);
  if (photo) updateData.append("photo", photo);
  if (dob) updateData.append("dob", dob);
  if (adress) updateData.append("adress", adress);
  if (gender) updateData.append("gender", gender);

  const deleteData = async () => {
    try {
      if (window.confirm("Do you really want to Delete?")) {
        await axios.delete(`${url}/half-day-student-view/${id}/`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",

            Authorization: "Bearer " + token.access,
          },
        });
       
        router.push(`/user/half/${pushBackId}/`);
      }
    } catch (err) {
      console.log(err.response.data.details);
    }
  };
  const patchData = async () => {
    const adha = await handleImageUpload(adharcard || null);
    const pho = await handleImageUpload(photo || null);
    if (adha) updateData.append("adharcard", adha, adha.name);
    if (pho) updateData.append("photo", pho, pho.name);
    try {
      await axios.patch(`${url}/half-day-student-view/${id}/`, updateData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access,
        },
      });

      alert("Data Updated");
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    fetch_push_back_id()
  }, []);
  return (
    <>
      <div className={styles.dataContainer}>
        <div>
          {data?.data?.map((item) => (
            <div key={item.id}>
              <div className={styles.container} ref={ref}>
                {/* Header with Company Info */}
                <div className={styles.header}>
                  <p className={styles.companyName}>
                    {data.library_name.slice(0, 1).toUpperCase() +
                      data.library_name.slice(1)}
                  </p>
                  <p className={styles.companyDetails}>{data.address}</p>
                  <p className={styles.companyDetails}>
                    Phone: {data.mobile_number}
                  </p>
                  <p className={styles.companyDetails}>
                    Email: info@company.com
                  </p>
                </div>

                {/* Invoice Details */}
                <div className={styles.invoiceInfo}>
                  <div className={styles.invoiceHeader}>
                    <p className={styles.invoiceTitle}>INVOICE</p>
                  </div>
                  <div className={styles.detailsRow}>
                    <p className={styles.label}>Date:</p>
                    <p className={styles.value}>{new Date().toDateString()}</p>
                  </div>
                  <div className={styles.detailsRow}>
                    <p className={styles.label}>Due Date:</p>
                    <p className={styles.value}>{item.end_date}</p>
                  </div>
                  <div className={styles.detailsRow}>
                    <p className={styles.label}>Amount :</p>
                    <p className={styles.value}>₹ {item.amount}</p>
                  </div>
                </div>

                {/* Client Information */}
                <div className={styles.clientInfo}>
                  <p className={styles.sectionTitle}>Bill To:</p>
                  <p className={styles.clientName}>
                    {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                  </p>
                  <p className={styles.clientDetails}>{item.adress}</p>
                  <p className={styles.clientDetails}>
                    Phone: {item.mobile_number}
                  </p>
                  <p className={styles.clientDetails}>
                    Preapring For: {item.field}
                  </p>
                  <p className={styles.clientDetails}>Gender: {item.gender}</p>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                  <p className={styles.footerP}>Product made by Labeo</p>
                </div>
              </div>
            </div>
          ))}
          <br />
         

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={() => getImage()}>
              Download Invoice
            </button>
            <button
              className={styles.button}
              onClick={() => initiateWhatsApp(mobile)}
            >
              Open Whatsapp
            </button>
          </div>

          <br />
        </div>
        <div className={styles.formcontainer}>
          <div className={styles.form}>
            <input
              type="text"
              className={styles.input}
              value={name}
              placeholder="Name..."
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className={
                `input ${mobile.length > 9 ? "green" : "red"} ` + styles.input
              }
              value={mobile}
              placeholder="Mobile number..."
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              type="text"
              className={styles.input}
              value={amount}
              placeholder="Amount..."
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="text"
              className={styles.input}
              value={adress}
              placeholder="Address..."
              onChange={(e) => setAdress(e.target.value)}
            />

            <div className={styles.dateCon}>
              <label className={styles.label}>Date of Birth</label>
              <input
                className={styles.input}
                style={{ width: "40%" }}
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            {/* Gender Radio buttons */}
            <div className={styles.radiocontainer}>
              <input
                type="radio"
                onChange={(e) => setGender(e.target.value)}
                id="female"
                name="gender"
                value="Female"
                checked={gender == "Female"}
              />
               {" "}
              <label className={styles.label} htmlFor="female">
                Female
              </label>
              <br />
              <input
                type="radio"
                onChange={(e) => setGender(e.target.value)}
                id="male"
                name="gender"
                value="Male"
                checked={gender == "Male"}
              />
               {" "}
              <label className={styles.label} htmlFor="male">
                Male
              </label>
              <br />
            </div>

            <div className={styles.dateCon}>
              <label className={styles.label}>From</label>
              <input
                className={styles.input}
                type="date"
                value={startDate}
                onChange={(e) => setStartdate(e.target.value)}
              />
              <label className={styles.label}>To</label>
              <input
                className={styles.input}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {/* Image selection */}
            <div className={styles.imageupload}>
              <label className={styles.label}>Upload Photo</label>
              <input
                style={{ width: "40%" }}
                className={styles.input}
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {photo && (
                <Image
                  className={styles.img}
                  src={URL.createObjectURL(photo)}
                  alt="phtot"
                />
              )}
            </div>

            <div className={styles.imageupload}>
              <label className={styles.label}>Upload Aadharcard</label>
              <input
                style={{ width: "40%" }}
                className={styles.input}
                type="file"
                onChange={(e) => setAdharcard(e.target.files[0])}
              />
              {adharcard && (
                <Image
                  className={styles.img}
                  src={URL.createObjectURL(adharcard)}
                  alt="Aadharcard"
                />
              )}
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={() => patchData()}>
                Upadte
              </button>
              <button className={styles.button} onClick={() => deleteData()}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewHalf;
