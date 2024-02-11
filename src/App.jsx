import { useState, useEffect } from 'react'
import RegionSelect from './components/RegionSelect'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import './App.css'

function App() {
  const [regionsAndSubregions, setRegionsAndSubregions] = useState({})
  const [region, setRegion] = useState()
  const [subregion, setSubregion] = useState()
  const [country, setCountry] = useState()

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

  const handleRegionChange = (region) => {
    setRegion(region)
    setSubregion("")
    setCountry(undefined)
  }

  const handleSubregionChange = (subregion) => {
    setSubregion(subregion)
    setCountry(undefined)
  }

  return (
    <>
      <RegionSelect 
          regionsAndSubregions={regionsAndSubregions} 
          selectRegion={handleRegionChange} 
          selectSubregion={handleSubregionChange} 
      />

      <div id="data-container">
        <CountryList region={region} subregion={subregion} setCountry={setCountry} />
        <CountryDetails country={country}/>
      </div>
    </>
  )
}

export default App
