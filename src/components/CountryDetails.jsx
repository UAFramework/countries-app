import { useState, useEffect } from "react"
import './CountryDetails.css'

export default function CountryDetails({country}) {

  const [countryDetails, setCountryDetails] = useState()
  
  const fetchCountryData = async (country) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
      if (response.ok) {
        const data = await response.json()
        setCountryDetails(data[0])
      } else {
        throw new Error(`Got a bad response from the server: ${response.statusText}`)
      }
    } catch (error) {
      alert("An error occurred while fetching data.\n" + 
            "See console log for more details.")

      console.error(error)
    } 
  }

  useEffect(() => {
    if (country === undefined || country === "") {
      setCountryDetails(undefined)
    } else {
      fetchCountryData(country)
    }
  }, [country])

  return (
    <>
    {
      Boolean(countryDetails) &&
        <div id="country-details">
          <p>name: {countryDetails.name?.common}</p>
          <p>flag: <img src={countryDetails.flags.png}></img></p>
        </div>
    }
    </>
  )
}