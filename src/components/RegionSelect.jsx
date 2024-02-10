import { useState, useEffect } from "react"

export default function RegionSelect({setRegion, setSubregion}) {

  const [regionsAndSubregions, setRegionsAndSubregions] = useState({})
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedSubregion, setSelectedSubregion] = useState("")

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

  useEffect(() => {
    setSelectedSubregion("")
    setRegion(selectedRegion)
  }, [selectedRegion])

  useEffect(() => {
    setSubregion(selectedSubregion)
  }, [selectedSubregion])

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value)
    // setRegion(event.target.value)
  }

  const handleSubregionChange = (event) => {
    setSelectedSubregion(event.target.value)
    // setSubregion(selectedSubregion)
  }

  return (
    <div id="select-bar">
      <select name="regions" onChange={handleRegionChange} defaultValue={selectedRegion}>
        <option value="" disabled>Pick a region</option>
        {
          Object.keys(regionsAndSubregions)
            .map(region => <option key={region} value={region}>{region}</option>)
        }
      </select>

      
      <select name="subregions" onChange={handleSubregionChange} defaultValue={selectedSubregion}>
        <option value="" disabled>Pick a subregion</option>
        { Boolean(selectedRegion) &&
          regionsAndSubregions[selectedRegion]
            .map(subregion => <option key={subregion} value={subregion}>{subregion}</option>)
        }
      </select>
    
      
    </div>
  )
}