import { useEffect, useState } from 'react';
import './App.scss';
import ExchangeCalculator from './components/exchangeCalculator/ExchangeCalculator';
import ExchangeTable from './components/exchangeTable/ExchangeTable';
import Header from './components/header/Header';
import { getCountryRate } from './config';

function App() {

    const [exchangeRates, setExchangeRates] = useState([])
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        async function getCountryFunction() {
          try {
            const data = await getCountryRate('USD', true);
            setExchangeRates(data);
            console.log(data);
          } catch (error) {
            
          }finally {
            setLoading(false)
          }
        }
        getCountryFunction()
      },[])

  return (
    <div className='App'>
      <Header />
      {loading ? (
          <div className='loading'><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      ) : (
        <main>
          <ExchangeCalculator exchangeRates={exchangeRates} setExchangeRates={setExchangeRates}/>
          <ExchangeTable exchangeRates={exchangeRates} setExchangeRates={setExchangeRates}/>
        </main>
      )}
    </div>
  )
}

export default App;
