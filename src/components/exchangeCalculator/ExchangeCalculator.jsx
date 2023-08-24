import React, { useState } from 'react';
import Select from 'react-select';
import {FaExchangeAlt} from "react-icons/fa"
import { getCountryRate } from '../../config';

import "./ExchangeCalculator.scss"

const ExchangeCalculator = ({exchangeRates}) => {
  const [rates, setRates] = useState({})
  const [rate, setRate] = useState([]);
  const [exchangedRate, setExchangedRate] = useState([]);
  const [amount, setAmount] = useState(1)
  async function getRatesFunction(countryCode) {
    try {
    const data = await getCountryRate(countryCode, false);
    setRates(data);
  } catch (error) {
    console.log(error)
  }
}
  const countryOptions = exchangeRates.map(({ countryCode, name, png }) => ({
    value: countryCode,
    label: (
      <div>
        <img src={png} alt={name} style={{ width: '20px', marginRight: '5px' }} />
        {name} 
        <b> {countryCode}</b>
      </div>
    ),
  }));

  return (
    <div className='exchangeCalculator'>
      <div className="live-calculator">
        <FaExchangeAlt />
        <span>Live Currency Exchange Converter</span>
      </div>
      <label htmlFor="amount">
        Amount:
      </label>
      <input type="text" id='amount' maxLength={15} value={amount} onChange={(e) => {setAmount(e.target.value)}} />
      <label htmlFor="from">
        From:
      </label>
      <Select
        id='from'
        options={countryOptions}
        onChange={(selectedOption) => {
          getRatesFunction(selectedOption.value);
          setRate(selectedOption.value)
        }}
      />
      <label htmlFor="to">
        To:
      </label>
      <Select
        id='to'
        options={countryOptions}
        onChange={(selectedOption) => {
          setExchangedRate(selectedOption.value)
        }}
      />
      {rate.length !== 0 && exchangedRate.length !== 0 && <>
        <span className='result'>{rate.length !== 0 && <b>{amount} {rate} =</b>} {exchangedRate.length !== 0 && <b>{(rates[exchangedRate] * amount).toFixed(3)} {exchangedRate}</b>}</span>
        <span className='result'>{exchangedRate.length !== 0 && <b>{amount} {exchangedRate} =</b>} {rate.length !== 0 && <b>{(amount / (rates[exchangedRate])).toFixed(3)} {rate}</b>}</span>     
      </>
      }
    </div>
  );
};

export default ExchangeCalculator;
