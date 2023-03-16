import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import VehicleItem from "./VehicleItem";
import Car from "./Car";
import { motion } from "framer-motion/dist/framer-motion";
import { ImEnlarge } from "react-icons/im";
import { TbArrowsMinimize } from "react-icons/tb";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import './homeStyles.css';

function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [simulate, setSimulate] = useState(false);

  const appUrl = process.env.REACT_APP_APP_URL;
  const [isRefresh, setIsRefresh] = useState(false);
  const [refreshRequireVehicles, setRefreshRequireVehicles] = useState(false);
  const [requiredVehicles, setRequiredVehicles] = useState([]);

  const controllerBtnRef = useRef();
  const carGridRef = useRef();

  useEffect(() => {
    setSimulate(false);
  }, [isRefresh, scenario]);

  useEffect(() => {
    axios.get(`${appUrl}/scenarios`).then((response) => {
      setScenarios(response.data);
    });

    axios.get(`${appUrl}/vehicles`).then((response) => {
      setVehicles(response.data);
      setRefreshRequireVehicles(!refreshRequireVehicles);
    });
  }, [isRefresh]);

   
  useEffect(() => {
    if(vehicles !== undefined && vehicles.length > 0 && scenario !== "") {
      const filteredVehicles = vehicles.filter(item => {
        return item.scenarioId.toString().includes(scenario)
      })
      setRequiredVehicles(filteredVehicles);
    }

  }, [scenario, refreshRequireVehicles]);

  const handleFullScreen = useFullScreenHandle();
  
  return (
    <div className='home'>
      <select value={scenario} onChange={e => {setScenario(e.target.value);}}>
        <option value="" disabled defaultValue='Select a Scenario' hidden>Select a Scenario</option>
          {scenarios.map((option) => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
      </select>

      { scenario !== '' &&
        (
          (requiredVehicles.length) === 0 ? 
          (<h2 className="info">This scenario has no vehicles</h2>)
          :
          (
            <table className="vehicles">
              <thead>
                <tr>
                  <th>Vehicle id</th>
                  <th>Vehicle Name</th>
                  <th>Position X</th>
                  <th>Position Y</th>
                  <th>Speed</th>
                  <th>Direction</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {requiredVehicles.map((vehicle) => {
                  return (
                    <VehicleItem
                      key={vehicle.id}
                      vehicle={vehicle}
                      refresh={setIsRefresh}
                      isRefresh={isRefresh}
                    />
                  );
                })}
              </tbody>
            </table>
          )
        )
      }

      <FullScreen handle={handleFullScreen}>
        <div className="carGrid" ref={carGridRef} style={{width: handleFullScreen.active ? '93.9%' : '94.9%'}} >

          {
            requiredVehicles.length > 0 && 
            (
              <>
                <div className="controllerBtns" ref={controllerBtnRef} >
                  <motion.div 
                    onClick={() => setSimulate(!simulate)} 
                    whileHover={{scale : 1.3}}
                  >
                    {
                      !simulate ? 
                        <BsPlayCircle fontSize={30} color={'#39FF14'} cursor={'pointer'} />
                        :
                        <BsPauseCircle fontSize={30} color={'#FF6700'} cursor={'pointer'} />
                    }
                  </motion.div>
                </div>

                <span
                  className="enlargeBtn"
                >
                  {
                    !handleFullScreen.active ? 
                      <ImEnlarge fontSize={20} onClick={handleFullScreen.enter} /> : 
                      <TbArrowsMinimize fontSize={30} onClick={handleFullScreen.exit} />
                  }
                  
                </span>
              </>
            )
          }
          {
            requiredVehicles.length > 0 &&
            requiredVehicles.map(sc => {
              return (
                <Car key={sc.id} id={sc.id} posX={parseInt(sc.positionX)} posY={parseInt(sc.positionY)} direction={sc.direction} speed={parseInt(sc.speed)} simulate={simulate} />
              )
            })
          }
        </div>
      </FullScreen>
      
    </div>
  );
}

export default Home;
