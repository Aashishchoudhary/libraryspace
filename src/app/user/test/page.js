'use client'
import { yyyymmdd } from '@/store/url';
import {useCallback, useEffect, useState} from 'react'


function page() {
    const today=new Date('2021-03-25')
    
    const [date , setDate] = useState(yyyymmdd(new Date()))
    const [gender , setGender] = useState()
    const [img , setImage] = useState(null)
    const datefun=(e)=>{
        setDate(e.target.value)
        console.log('e' ,date)
    }
    const genderFun=(e)=>{
        setGender(e.target.value)
        console.log(e.target.value)
        // console.log(gender)
    }

    const gg=()=>{
        console.log(gender)
        console.log(img)
    }
    const [data, setData] = useState('me')
    const [a ,b]=useState(false)
console.log('aa')
const ff = () => {
    setData('aashish')
    b(true)
}
useEffect(() => {
 ff()
}, [])
  return (
    <div>

      <input type="date" value={date} onChange={(e)=>datefun(e)} />
      <br />
      
  <input type="radio" onChange={(e)=>genderFun(e)} id="female" name="gender" value="Female"/>
  <label htmlFor="female">Female</label><br/>
  <input type="radio" onChange={(e)=>genderFun(e)} id="male" name="gender" value="Male"/>
  <label htmlFor="male">Male</label><br/>
<button onClick={()=>gg()}>Check</button>
<input type="file" onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]))} />
<img src={img}/>
{a&&<p>{data}</p>}
    </div>
  )
}

export default page
