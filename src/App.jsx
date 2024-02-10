import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import './App.css'

function App() {
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedSubregion, setSelectedSubregion] = useState("")
  const [country, setCountry] = useState()
  
  const [regionsAndSubregions, setRegionsAndSubregions] = useState({})

  const fetchRegionsAndSubregions = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=region,subregion")
      if (response.ok) {
        const data = await response.json()
        const result = data.reduce((acc, {region, subregion}) => {
          if (!acc.hasOwnProperty(region)) {
            acc[region] = []
          }

          if (subregion !== "" && !acc[region].includes(subregion)) {
            acc[region].push(subregion)
          }

          return acc
        }, {})

        setRegionsAndSubregions(result)

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
    fetchRegionsAndSubregions()
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value)
    setSelectedSubregion("")
    setCountry(undefined)
  }

  const handleSubregionChange = (event) => {
    setSelectedSubregion(event.target.value)
    setCountry(undefined)
  }

  return (
    <>
      <div id="select-bar">
        <select name="regions" onChange={handleRegionChange} value={selectedRegion}>
          <option value="" disabled>Pick a region</option>
          {
            Object.keys(regionsAndSubregions)
              .map(region => <option key={region} value={region}>{region}</option>)
          }
        </select>

        <select name="subregions" onChange={handleSubregionChange} value={selectedSubregion}>
          <option value="" disabled>Pick a subregion</option>
          {
            regionsAndSubregions[selectedRegion]
              ?.map(subregion => <option key={subregion} value={subregion}>{subregion}</option>)
          }
      </select>
      </div>
      <div id="data-container">
        <CountryList region={selectedRegion} subregion={selectedSubregion} setCountry={setCountry} />
        <CountryDetails country={country}/>
      </div>
    </>
  )
}

export default App
