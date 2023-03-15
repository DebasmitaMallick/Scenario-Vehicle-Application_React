import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion/dist/framer-motion";
import './carStyles.css';
import { useWindowSize } from '../hooks/useWindowSize';

const Car = ({id, posX, posY, direction, speed, simulate}) => {

  // X -> 1-1400
  // Y -> 10 - 690
  let speedVals = [];
  for(let i=20; i>0; i--) {
    speedVals.push(i);
  }

  const [move, setMove] = useState(true);

  const width = useWindowSize().width;

  const [x, setX] = useState(posX);
  
  const [y, setY] = useState(posY);

  const increment = () => {
    switch(direction) {
      case 'towards':
        {
          setX(i => {
            if(i > (width-115)){
              setMove(false);
              return;
            }
            return (
              i + 1
            );
          });
          break;
        }
      case 'backwards':
        {
          setX(i => {
            if(i < 1){
              setMove(false);
              return;
            }
            return (
              i - 1
            );
          });
          break;
        }
      case 'downwards':
        {
          setY(i => {
            if(i > 710){
              setMove(false);
              return;
            }
            return (
              i + 1
            );
          });
          break;
        }
      default:
        {
          setY(i => {
            if(i < -30){
              setMove(false);
              return;
            }
            return (
              i - 1
            );
          });
        }
    }
  }

  useEffect(() => {
    if(simulate && move) {
      const id = setInterval(increment, speedVals[speed-1]);
      return () => clearInterval(id);
    }
  }, [id, posX, posY, direction, speed, simulate]);


  return (
    <div>
        <motion.div
          className="box"
          animate={{ x, y }}
          transition={{ type: "spring" }}
          initial={false} //to disable enter animation
          exit={false}
        >
          <div class="sign">
            <span>{id}</span>
          </div>
        </motion.div>
    </div>
  )
}

export default Car