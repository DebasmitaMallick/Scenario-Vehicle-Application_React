import React from 'react'

function ScenarioDropdown(props) {
  return (
    <select value={props.scenario} onChange={e => {props.setScenario(e.target.value);}}>
      <option value="" disabled defaultValue='Select a Scenario' hidden>Select a Scenario</option>
        {props.scenarios.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
    </select>
  )
}

export default ScenarioDropdown