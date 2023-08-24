let exchangeData;
export const getCountryRate = async (countryCode, allValues) => {
    const apiKey = `https://v6.exchangerate-api.com/v6/74c178d96f60c58d1102df36/latest/${countryCode}`;
    try {
        const response = await fetch(apiKey)
        const data = await response.json();
        exchangeData = data.conversion_rates;
        if(allValues) { 
            return getCountry()
         }else {
            return exchangeData
         }
        
    } catch (error) {
      console.error('Error:', error);
    }
}


const fetchCountryInfo = async (currencyCode) => {
    const countryCode = currencyCode.substring(0, 2);
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        return {
            png: data[0]?.flags?.png,
            name: data[0]?.name?.official
        };
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
};

const getCountry = async () => {
    const exchangeRates = [];
    for (const currencyCode in exchangeData) {
        const rateValue = {
            countryCode: currencyCode,
            cost: exchangeData[currencyCode]
        };
        const countryInfo = await fetchCountryInfo(currencyCode);
        if (countryInfo.png && countryInfo.name) {
            Object.assign(rateValue, countryInfo);
            exchangeRates.push(rateValue);
        }

    }
    return exchangeRates
};
