import { useState } from "react"

export default function RegionSelect({regionsAndSubregions, selectRegion, selectSubregion}) {

  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedSubregion, setSelectedSubregion] = useState("")

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