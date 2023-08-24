import React from 'react'
import {TbWorldDollar} from "react-icons/tb"
import "./Header.scss"

const Header = () => {
  return (
    <header>
      <TbWorldDollar />
      <div className="title">
        <h1>EXCHANGE-RATES</h1>
        <p>WORLD CURENNCY EXCHANGE RATES</p>
        <p>AND CURENNCY EXCHANGE RATE HISTORY</p>
      </div>
    </header>
  )
}

export default Header