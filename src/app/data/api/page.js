
'use client'
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import axios from 'axios'

const containerStyle = {
  width: '400px',
  height: '400px',
}
const center = {
  lat: 26.910278,
  lng: 75.7908,
}

function MyComponent() {
  const [lat , setLat]= React.useState('26.910278')
  const [lng , setLng]=React.useState('75.7908')
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI',
  })

  const [map, setMap] = React.useState(null)

  const clickfun=(event)=>{
    console.log(event.latLng.lat())
    setLat(event.latLng.lat())
    setLng(event.latLng.lng())
    console.log(event.latLng.lng())
    console.log(event)
  }
  const geocod=async()=>{
  const res= await  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAgfvPHQTtPbSc5w9VPB0xa3jHr5olxnlI&latlng=${lat},${lng}`)
  const data = await res.data
  console.log(data.results[0].formatted_address)
  console.log(data)
  }
React.useEffect(()=>{
geocod()
},[clickfun])

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onClick={clickfun}
      onUnmount={onUnmount}
    >
     
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)