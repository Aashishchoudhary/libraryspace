"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useScreenshot } from "use-react-screenshot";
import styles from '../../../view-all-seat/[id]/[seatid]/add-data.module.css'
import { url, handleImageUpload, yyyymmdd } from "@/store/url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";
function AddData({ params: { id, seatid } }) {
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


  const [changeSeat, setChangeSeat] = useState(false);
  const [vaccentSeatData, setVaccentSeatData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartdate] = useState(yyyymmdd(new Date()));

  const [endDate, setEndDate] = useState(yyyymmdd(new Date()));
  const [amount, setAmount] = useState("");
  const [dob, setDob] = useState(yyyymmdd(new Date()));
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState("");
  const [adharcard, setAdharcard] = useState();
  const [photo, setPhoto] = useState();

  // chat room creation  and qr code
  const createRoom = async () => {
    try {
      // Call signatureGenration() and handle potential errors
      const response = await axios.get(`${url}/create-signature/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access
        },
      });
      const res = await response.data;

      // Construct the complete URL with all necessary parameters
      const qr_value = `${url}/chat-page/?libid=${id}&id=${seatid}&user_id=${
        jwtDecode(token.access).user_id
      }&sign=${res["sign"]}`;

      // Perform navigation using navigation.navigate
      router.push(`/user/QR/?data=${qr_value}`);
    } catch (error) {
      // Handle errors gracefully, e.g., display an error message or retry logic
      console.error("Error creating room:", error);
      // You can add error handling specific to your application's requirements
    }
  };

  // image picker

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/view-seat/${id}/${seatid}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access
        },
      });
      const res = await response.data;

      setData(res);

      {
        res.seat_data[0]["dob"] &&
          setDob(yyyymmdd(new Date(res.seat_data[0]["dob"])));
      }

      {
        res.seat_data[0]["end_date"] &&
          setEndDate(yyyymmdd(new Date(res.seat_data[0]["end_date"])));
      }
      {
        res.seat_data[0]["start_date"] &&
          setStartdate(yyyymmdd(new Date(res.seat_data[0]["start_date"])));
      }
      {
        res.seat_data[0]["name"] && setName(res.seat_data[0]["name"]);
      }
      {
        res.seat_data[0]["adress"] && setAdress(res.seat_data[0]["adress"]);
      }
      {
        res.seat_data[0]["mobile_number"] &&
          setMobile(res.seat_data[0]["mobile_number"]);
      }
      {
        res.seat_data[0]["amount"] && setAmount(res.seat_data[0]["amount"]);
      }
      {
        res.seat_data[0]["gender"] && setGender(res.seat_data[0]["gender"]);
      }
    
      setCheckData(true);
    } catch (e) {
      console.log("error ", e);
      setCheckData(false);
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

  const postData = async () => {
    const adha = await handleImageUpload(adharcard || null);
    const pho = await handleImageUpload(photo || null);
    if (adha) updateData.append("adharcard", adha, adha.name);
    if (pho) updateData.append("photo", pho, pho.name);
    try {
      await axios.post(
        `${url}/view-seat/${id}/${seatid}/`,
        updateData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",

            Authorization: "Bearer " + token.access
          },
        }
      );
      
getData()
      alert("Data saved");
      
    } catch (err) {
   if(err.status==400){
    alert("please fill all the fields")
   }
   else{
    alert("check all the data fileds or try again later")
   }
    }
  };
  const deleteData = async () => {
    try {
      if (window.confirm("Do you really want to Delete?")) {
      await axios.delete(`${url}/view-seat/${id}/${seatid}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access
        },
      });
     
      router.push(`/user/view-seat/${id}`)
    }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const patchData = async () => {
    const adha = await handleImageUpload(adharcard || null);
    const pho = await handleImageUpload(photo || null);
    if (adha) updateData.append("adharcard", adha, adha.name);
    if (pho) updateData.append("photo", pho, pho.name);
    try {
      await axios.patch(`${url}/view-seat/${id}/${seatid}/`, updateData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access
        },
      });

      alert("Data Updated");
      getData()
    } catch (err) {
      console.log(err);
    }
  };
  const initiateWhatsApp = (num) => {
    router.push(`https://wa.me/${num.replace("+", "")}`);
  };
  const fetch_vaccent_seat = async () => {
    const response = await axios.get(`${url}/vaccent-seats/${id}/`, {
      headers: {
        Authorization: "Bearer " + token.access
      },
    });
    const res = await response.data;
    console.log(res);
    setVaccentSeatData(res);
  };

  const change_seat_number = async (seat_id) => {
    try {
      await axios.patch(
        `${url}/change-seat/${id}/${seatid}/`,
        { change_id: seat_id },
        {
          headers: {
            Authorization: "Bearer " + token.access
          },
        }
      );
     
      alert("Seat changed")
      router.push(`/user/view-seat/${id}/${seat_id}/`)
    } catch (err) {
      console.log(err);
    }
  };
  const get_vaccent_seat = () => {
    fetch_vaccent_seat();
    setChangeSeat(!changeSeat);
  };
  
  useEffect(() => {
    
    useCallback(() => {getData();},[getData])
  }, []);

  return (
    <>
      <div>
        {checkData && (
          <div className={styles.dataContainer}>
            <div>
            <div className={styles.buttonContainer}>
                <button
                style={{marginTop:"5px" ,marginLeft:'10px'}}
                  onClick={() => get_vaccent_seat()}
                  className={styles.button}
                >
                  Chanage Seat
                </button>
              </div>
              {changeSeat && (
                <div className={styles.seat}>
                  
                  {vaccentSeatData?.map((item) => (
                    <div key={item.id} onClick={()=>change_seat_number(item.id)} className={styles.chair}>
                      <p className={styles.chairNumber}>{item.seat_num}</p>
                    </div>
                  ))}
                </div>
              )}
              {data?.seat_data?.map((item) => (
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
                        <p className={styles.label}>Seat No. :</p>
                        <p className={styles.value}> {data.seat_num}</p>
                      </div>
                      <div className={styles.detailsRow}>
                        <p className={styles.label}>Date:</p>
                        <p className={styles.value}>
                          {new Date().toDateString()}
                        </p>
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
                        {item.name.slice(0, 1).toUpperCase() +
                          item.name.slice(1)}
                      </p>
                      <p className={styles.clientDetails}>{item.adress}</p>
                      <p className={styles.clientDetails}>
                        Phone: {item.mobile_number}
                      </p>
                      <p className={styles.clientDetails}>
                        Preapring For: {item.field}
                      </p>
                      <p className={styles.clientDetails}>
                        Gender: {item.gender}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                      <p className={styles.footerP}>Product made by Labeo</p>
                    </div>
                  </div>
                </div>
              ))}
             
              {checkData && (
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
              )}
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
                  type="number"
                  className={
                    `input ${mobile.length > 9 ? "green" : "red"} ` +
                    styles.input
                  }
                  value={mobile}
                  placeholder="Mobile number..."
                  onChange={(e) => setMobile(e.target.value) }
                 
                />

                <input
                  type="number"
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
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartdate(e.target.value)}
                  />
                  <label className={styles.label}>To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                {/* Image selection */}
                <div className={styles.imageupload}>
                  <label className={styles.label}>Upload Photo</label>
                  <input
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
                  <button
                    className={styles.button}
                    onClick={() => deleteData()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!checkData && (
          <div className={styles.dataContainer_two}>
            <div className={styles.buttonContainer_two}>
              <button
                className={styles.button_two}
                onClick={() => createRoom()}
              >
                Show QR
              </button>
            </div>
            <div className={styles.formcontainer_two}>
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
                    `input ${mobile.length > 9 ? "green" : "red"} ` +
                    styles.input
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
                    style={{ width: "40%" }}
                    className={styles.input}
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
                  <button className={styles.button} onClick={() => postData()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddData;
