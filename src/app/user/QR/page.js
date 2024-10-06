'use client'
import React from 'react'
import QRCode from "react-qr-code";
function QR() {
  const url = new URLSearchParams(window.location.search)
  const data = url.get('data')
  return (
    <div style={{ height: "auto", margin: "0 auto", maxWidth: 250, width: "100%" }}>
  <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={data}
    viewBox={`0 0 256 256`}
  />
</div>
  )
}

export default QR
