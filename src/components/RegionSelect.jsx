import { useState } from "react"

export default function RegionSelect({selectRegion, selectSubregion}) {

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
  
  const handleSelectRegion = (event) => {
    const region = event.target.value
    setSelectedRegion(region)
    setSelectedSubregion("")
    selectRegion(region)
    selectSubregion("")
  }

  const handleSelectSubregion = (event) => {
    const subregion = event.target.value
    setSelectedSubregion(subregion)
    selectSubregion(subregion)
  }

  return (
    <div id="select-bar">
      <select name="regions" onChange={handleSelectRegion} value={selectedRegion}>
        <option value="" disabled>Pick a region</option>
        {
          Object.keys(regionsAndSubregions)
            .map(region => <option key={region} value={region}>{region}</option>)
        }
      </select>

      <select name="subregions" onChange={handleSelectSubregion} value={selectedSubregion}>
        <option value="" disabled>Pick a subregion</option>
        { Boolean(selectedRegion) &&
          regionsAndSubregions[selectedRegion]
            .map(subregion => <option key={subregion} value={subregion}>{subregion}</option>)
        }
      </select>
    </div>
  )
}