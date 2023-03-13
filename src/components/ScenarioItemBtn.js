import React from 'react'
import { Link } from "react-router-dom";
import { useActivePage } from '../contexts/ActivePageProvider';

function ScenarioItemBtn(props) {
  const { setActivePage } = useActivePage();

  return (
    <div className="grid-container all-scenario-header">
        <div className="grid-item">
            <h2 className={props.clsTxt}>All Scenarios</h2>
        </div>
        <div className="grid-item">
            <Link onClick={() => setActivePage('addscenario')} className="button blue-btn" to="/addscenario">
            New Scenario
            </Link>
            <Link onClick={() => setActivePage('addvehiclesform')} className="button green-btn" to="/addvehiclesform">
            Add Vehicles
            </Link>
            <div className={props.cls} onClick={props.delete}>
                Delete All
            </div>
        </div>
    </div>
  )
}

export default ScenarioItemBtn