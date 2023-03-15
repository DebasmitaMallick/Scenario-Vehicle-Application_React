import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from "framer-motion/dist/framer-motion" 

const PlayMotion = () => {
    const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 30 });

    return animation.stop;
  }, []);

  return (
    <div style={{marginTop: '5.5rem'}}>
        <motion.h1>{rounded}</motion.h1>
    </div>
  );
}

export default PlayMotion