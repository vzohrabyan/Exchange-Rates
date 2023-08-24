import { useState } from 'react';
import Select from 'react-select';
import {MdCurrencyExchange} from "react-icons/md"
import { getCountryRate } from '../../config';

import "./ExchangeTable.scss";

const ExchangeTable = ({ exchangeRates }) => {
  const [rates, setRates] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  const [loading, setLoading] = useState(true)

  async function getRatesFunction(countryCode) {
    try {
      const data = await getCountryRate(countryCode, true);
      setRates(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  console.log(rates);
  
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
    <div className="exchangeTable">
      <div className="rates-today">
        <MdCurrencyExchange />
        <span>Exchange Rates Today</span>
      </div>
      <Select
        value={selectValue ? selectValue : countryOptions[0]}
        options={countryOptions}
        onChange={(selectedOption) => {
          setSelectValue(selectedOption);
          getRatesFunction(selectedOption.value);
          setLoading(true)
        }}
      />
      <ul>
        {!loading && rates && rates.length !== 0 && Array.isArray(rates) ? (
          rates.map(({ png, name, countryCode, cost }, id) =>
            id !== 0 ? (
              <div className="country" key={id}>
                <div className="country-info">
                  <img src={png} alt="flag" />
                  <span>{name}</span>
                </div>
                <div className="country-change">
                  <p>{cost.toFixed(3)}</p>
                  <span>{rates[0].countryCode} / {countryCode}</span>
                </div>
                <div className="country-change-reverse">
                  <p>{(1 / cost).toFixed(3)}</p>
                  <span>{countryCode} / {rates[0].countryCode}</span>
                </div>
              </div>
            ) : null
          )
        ) : (loading && selectValue) ? (
          <div className='loading'><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        )  : (
          exchangeRates.map(({ png, name, countryCode, cost }, id) =>
            id !== 0 ? (
              <div className="country" key={id}>
                <div className="country-info">
                  <img src={png} alt="flag" />
                  <span>{name}</span>
                </div>
                <div className="country-change">
                  <p>{cost.toFixed(3)}</p>
                  <span>{exchangeRates[0].countryCode} / {countryCode}</span>
                </div>
                <div className="country-change-reverse">
                  <p>{(1 / cost).toFixed(3)}</p>
                  <span>{exchangeRates[0].countryCode} / {countryCode}</span>
                </div>
              </div>
            ) : null
          )
        )}
      </ul>
    </div>
  );
};

export default ExchangeTable;
