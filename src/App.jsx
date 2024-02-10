import { useState, useEffect } from 'react'
import RegionSelect from './components/RegionSelect'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import './App.css'

function App() {
  const [region, setRegion] = useState()
  const [subregion, setSubregion] = useState()
  const [country, setCountry] = useState()

  return (
    <>
      {
        <RegionSelect setRegion={setRegion} setSubregion={setSubregion} />
      }
      <div id="data-container">
        <CountryList region={region} subregion={subregion} setCountry={setCountry} />
        <CountryDetails country={country}/>
      </div>
    </>
  )
}

export default App
