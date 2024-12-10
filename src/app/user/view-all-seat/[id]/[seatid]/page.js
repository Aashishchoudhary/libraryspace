"use client";
import { url,  yyyymmdd, handleImageUpload } from "@/store/url";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styles from "./add-data.module.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useScreenshot } from "use-react-screenshot";
import { useCookies } from "react-cookie";
import HashLoader from "react-spinners/HashLoader";

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"20px",
  marginBottom:"100vh",
};
import Image from "next/image";

function Editreservation({ params: { id, seatid } }) {
  let [loading, setLoading] = useState(true);
  let [color] = useState("black");
  const [token] =useCookies()

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

  const [getPhoto, setGetPhoto] = useState("");
  const [getAdhar, setGetAdhar] = useState("");
  const[loadphoto , setloadphoto]=useState(false)
  const[loadadhar , setloadadhar]=useState(false)
  const [changeSeat, setChangeSeat] = useState(false);
  const [vaccentSeatData, setVaccentSeatData] = useState([]);
  const [data, setData] = useState([]);
  const [checkData, setCheckData] = useState(false);
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
  const [due_amount , set_Due_amount]=useState(0)
  const[showDueAmount ,setShowDueAmount] =useState(false)
  const [prepare , setPrepare] =useState('')


  const updateData = new FormData();
  if (name) updateData.append("name", name);
  if (mobile) updateData.append("mobile_number", mobile);
  if (startDate) updateData.append("start_date", startDate);
  if (endDate) updateData.append("end_date", endDate);
  if (dob) updateData.append("dob", dob);
  if (adress) updateData.append("adress", adress);
  if (gender) updateData.append("gender", gender);
  if (amount) updateData.append("amount", amount);
  if (adharcard) updateData.append("adharcard", adharcard);
  if (photo) updateData.append("photo", photo);
  if(due_amount)updateData.append('due_amount' ,due_amount)
  if(prepare)updateData.append('field' ,prepare)
  // chat room creation  and qr code
  const createRoom = async () => {
    setLoading(true)
    try {
      // Call signatureGenration() and handle potential errors
      const response = await axios.get(`${url}/create-signature/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: "Bearer " + token.access,
        },
      });
      const res = await response.data;

      // Construct the complete URL with all necessary parameters
      const qr_value = `${url}/chat-page/?libid=${id}&id=${seatid}&user_id=${
        jwtDecode(`${token.access}`).user_id
      }&sign=${res["sign"]}`;
      // Perform navigation using navigation.navigate
      router.push(`/user/QR/?data=${qr_value}`);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert("error while genrating QR")
      console.error("Error creating room:", error);
      // You can add error handling specific to your application's requirements
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}/edit-reservation-view/${id}/${seatid}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token.access,
          },
        }
      );
      const res = await response.data;

      setData(res);

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
      res.data[0]['due_amount']&& set_Due_amount(res.data[0]['due_amount'])
      res.data[0]['field'] && setPrepare(res.data[0]['field'])
      {
        res.data[0]["adharcard"] &&
          setGetAdhar(res.data[0]["adharcard"]);
      }
      {
        res.data[0]["photo"] && setGetPhoto(res.data[0]["photo"]);
      }
      setCheckData(true);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setCheckData(false);
      setLoading(false)
    }
  };

  //patch data
  const patchData = async () => {
    setLoading(true)
    const adha = await handleImageUpload(adharcard || null);
    const pho = await handleImageUpload(photo || null);
    if (adha) updateData.append("adharcard", adha, adha.name);
    if (pho) updateData.append("photo", pho, pho.name);
    try {
      await axios.patch(`${url}/edit-reservation-view/${id}/${seatid}/`, updateData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token.access,
        },
      });

      
      alert("Data updated")
      fetchData()
      setLoading(false)
    } catch (err) {
      console.log(err.response.data);
      setLoading(false)
      alert("something went wrong please try agian later");
    }
  };
  // add data
  const postData = async () => {
    setLoading(true)
    const adha = await handleImageUpload(adharcard || null);
    const pho = await handleImageUpload(photo || null);
    if (adha) updateData.append("adharcard", adha, adha.name);
    if (pho) updateData.append("photo", pho, pho.name);   
    try {
      await axios.post(
        `${url}/edit-reservation-view/${id}/${seatid}/`,updateData,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token.access,
          }
        }
      );

   
      alert("Data Saved");
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if(err.status==400){
        alert("please fill all the fields")
       }
       else{
        alert("Try agian later")
       }
      
    }
    console.log(err,'---')
  };
  // delete data
 
  const deleteData = async () => {
    try {
      if (window.confirm("Do you really want to Delete?")) {
        await axios.delete(`${url}/edit-reservation-view/${id}/${seatid}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.access,
          },
        });
        
        router.push(`/user/view-all-seat/${id}`)
      }
    
    } catch (err) {
      alert("something went wrong please try agian later");
    }
  };
  // whatsapp url
 

  const fetch_vaccent_seat = async () => {
    const response = await axios.get(`${url}/vaccent-seats/${id}/`, {
      headers: {
        Authorization: "Bearer " + token.access,
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
            Authorization: "Bearer " + token.access,
          },
        }
      );
      
      alert("Seat changed");
      router.push(`/user/view-all-seat/${id}/${seat_id}/`)
    } catch (err) {
      console.log(err);
    }
  };
  const get_vaccent_seat = () => {
    fetch_vaccent_seat();
    setChangeSeat(!changeSeat);
  };
  useEffect(() => {
    fetchData();
   
  }, []);
  useEffect(()=>{if(due_amount!=0){setShowDueAmount(true)}} ,[loading])
 // whatsapp url
  const initiateWhatsApp = (num) => {
    router.push(`https://wa.me/${num.replace("+", "")}`);
    window.location.reload()
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
      />:<>
        {checkData && (
          <div className={styles.dataContainer}>
            <div>
            <div  className={styles.buttonContainer}>
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
                  {" "}
                  {vaccentSeatData?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => change_seat_number(item.id)}
                      className={styles.chair}
                    >
                      <p className={styles.chairNumber}>{item.seat_num}</p>
                    </div>
                  ))}
               
                </div>
              )}
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
                        <p className={styles.label}>Seat No. :</p>
                        <p className={styles.value}> {data.seat_num}</p>
                      </div>
                      <div className={styles.detailsRow}>
                      <p className={styles.label}>Bill Date:</p>
                          <p className={styles.value}>
                            {item.updated_at.slice(0,10)}
                          </p>
                      </div>
                      <div className={styles.detailsRow}>
                        <p className={styles.label}>Due Date:</p>
                        <p className={styles.value}>{item.end_date}</p>
                      </div>
                      <div className={styles.detailsRow}>
                        <p className={styles.label}>Paid Amount :</p>
                        <p className={styles.value}>₹ {item.amount}</p>
                      </div>
                      {showDueAmount&&<div className={styles.detailsRow}>
                        <p className={styles.label}>Due Amount :</p>
                        <p className={styles.value}>₹ {item.due_amount}</p>
                      </div>}
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
                    <p className={styles.footerText}>A Aashish kalwaniya Product</p>
                    </div>
                  </div>
                </div>
              ))}
              <br />
             
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
               {checkData && 
                  <>
                    {getPhoto&&<button
                      className={styles.button}
                      onClick={() => setloadphoto(!loadphoto)}
                    >
                      {loadphoto ? "Hide" : "View Photo"}
                    </button>}
                    {loadphoto && (
                      <Image
                        className={styles.img}
                        src={getPhoto}
                        width={100}
                        height={100}
                        alt={"photo"}
                      />
                    )}
                    {getAdhar&& <button
                      className={styles.button}
                      onClick={() => setloadadhar(!loadadhar)}
                    >
                      {loadadhar ? "Hide" : "View Adharcard"}
                    </button>}
                    {loadadhar && (
                      <Image
                        className={styles.img}
                        src={getAdhar}
                        width={100}
                        height={100}
                        alt={"adharcard"}
                      />
                    )}
                  </>
                }
              <br />
            </div>
            <div className={styles.formcontainer}>
             
              <div className={styles.form}>
              
  <label htmlFor="name" className={styles.label}>
    Name
  </label>
  <input
    type="text"
    id="name"
    className={styles.input}
    value={name}
    placeholder="Name..."
    onChange={(e) => setName(e.target.value)}
  />

  <label htmlFor="mobile" className={styles.label}>
    Mobile number
  </label>
  <input
    type="text"
    id="mobile"
    className={`${styles.input} ${mobile.length > 9 ? styles.green : styles.red}`}
    value={mobile}
    placeholder="Mobile number..."
    onChange={(e) => setMobile(e.target.value)}
    maxLength="10"
  />

  <label htmlFor="amount" className={styles.label}>
    Paid Amount
  </label>
  <input
    type="text"
    id="amount"
    className={styles.input}
    value={amount}
    placeholder="Amount..."
    onChange={(e) => setAmount(e.target.value)}
  />

  {!showDueAmount && (
    <button className={styles.button} style={{width:"120px"}} onClick={() => setShowDueAmount(true)}>Due Amount</button>
  )}

  {showDueAmount && (
    <>
      <label htmlFor="dueAmount" className={styles.label}>
        Due Amount
      </label>
      <input
        type="text"
        id="dueAmount"
        className={styles.input}
        value={due_amount}
        placeholder="Amount..."
        onChange={(e) => set_Due_amount(e.target.value)}
      />
    </>
  )}

  <label htmlFor="prepare" className={styles.label}>
    Preparing For
  </label>
  <input
    type="text"
    id="address"
    className={styles.input}
    value={prepare}
    placeholder="Prepare..."
    onChange={(e) => setPrepare(e.target.value)}
  />
  <label htmlFor="address" className={styles.label}>
    Address
  </label>
  <input
    type="text"
    id="address"
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
                      width={100}
                      height={100}
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
                      width={100}
                      height={100}
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
              <label htmlFor="name" className={styles.label}>
    Name
  </label>
  <input
    type="text"
    id="name"
    className={styles.input}
    value={name}
    placeholder="Name..."
    onChange={(e) => setName(e.target.value)}
  />

  <label htmlFor="mobile" className={styles.label}>
    Mobile number
  </label>
  <input
    type="text"
    id="mobile"
    className={`${styles.input} ${mobile.length > 9 ? styles.green : styles.red}`}
    value={mobile}
    placeholder="Mobile number..."
    onChange={(e) => setMobile(e.target.value)}
    maxLength="10"
  />

  <label htmlFor="amount" className={styles.label}>
    Paid Amount
  </label>
  <input
    type="text"
    id="amount"
    className={styles.input}
    value={amount}
    placeholder="Amount..."
    onChange={(e) => setAmount(e.target.value)}
  />

  {!showDueAmount && (
    <button className={styles.button} style={{width:"120px"}} onClick={() => setShowDueAmount(true)}>Due Amount</button>
  )}

  {showDueAmount && (
    <>
      <label htmlFor="dueAmount" className={styles.label}>
        Due Amount
      </label>
      <input
        type="text"
        id="dueAmount"
        className={styles.input}
        value={due_amount}
        placeholder="Amount..."
        onChange={(e) => set_Due_amount(e.target.value)}
      />
    </>
  )}

  <label htmlFor="prepare" className={styles.label}>
    Preparing For
  </label>
  <input
    type="text"
    id="address"
    className={styles.input}
    value={prepare}
    placeholder="Prepare..."
    onChange={(e) => setPrepare(e.target.value)}
  />
  <label htmlFor="address" className={styles.label}>
    Address
  </label>
  <input
    type="text"
    id="address"
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
                      width={100}
                      height={100}
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
                      width={100}
                      height={100}
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
      </>}
    </>
  );
}

export default Editreservation;
