import { useEffect, useState } from "react";

export default function CountryList({region, subregion, setCountry}) {
  
  const [countries, setCountries] = useState([])

  const fetchCountriesBySubregion = async (subregion) => {
    // use https://restcountries.com/v3.1/subregion/{subregion}?fields=name
    try {
      const response = await fetch(`https://restcountries.com/v3.1/subregion/${subregion}?fields=name`)
      if (response.ok) {
        const data = await response.json()
        const countryNames = data.map(country => country.name.common)
        setCountries(countryNames)
      } else {
        throw new Error(`Got a bad response from the server: ${response.statusText}`)
      }
    } catch (error) {
      alert("An error occurred while fetching data.\n" + 
            "See console log for more details.")
      
      console.error(error)
    } 
  }

  const fetchCountriesByRegion = async (region) => {
    // use https://restcountries.com/v3.1/region/{region}
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name`)
      if (response.ok) {
        const data = await response.json()
        const countryNames = data.map(country => country.name.common)
        setCountries(countryNames)
      } else {
        throw new Error(`Got a bad response from the server: ${response.statusText}`)
      }
    } catch (error) {
      alert("An error occurred while fetching data.\n" + 
            "See console log for more details.")
      
      console.error(error)
    }

  }
  
  const fetchCountries = (region, subregion) => {
    if (subregion) {
      fetchCountriesBySubregion(subregion)
    } else if (subregion === "" && region) {
      fetchCountriesByRegion(region)
    } else if (region) {
      fetchCountriesByRegion(region)
    }
  }
  
  useEffect(() => {
    fetchCountries(region, subregion)
  }, [region, subregion])

  return (
    <div id="country-list">
      <ul>
        {
          countries.map(country => <li key={country} onClick={() => setCountry(country)}>{country}</li>)
        }
      </ul>
    </div>
  )
}