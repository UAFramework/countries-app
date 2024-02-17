import { useState, useEffect } from 'react'
import RegionSelect from './components/RegionSelect'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import './App.css'

function App() {
  const [region, setRegion] = useState()
  const [subregion, setSubregion] = useState()
  const [country, setCountry] = useState()

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
