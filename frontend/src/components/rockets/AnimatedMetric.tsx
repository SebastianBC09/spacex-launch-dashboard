import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AnimatedMetricProps {
  value: number;
  label: string;
}

const AnimatedMetric: React.FC<AnimatedMetricProps> = React.memo(({ value, label }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const animationFrame = useRef(0);

  const animate = useCallback((startTime: number, currentTime: number) => {
    const duration = 1500;
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < duration) {
      const progress = elapsedTime / duration;
      setAnimatedValue(Math.round(progress * value));
      animationFrame.current = requestAnimationFrame((time) => animate(startTime, time));
    } else {
      setAnimatedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const startTime = performance.now();
    animationFrame.current = requestAnimationFrame((time) => animate(startTime, time));

    return () => cancelAnimationFrame(animationFrame.current);
  }, [value, animate]);

  const formattedValue = useMemo(() => {
    return animatedValue.toLocaleString();
  }, [animatedValue]);

  return (
    <div className="space-y-1">
      <p className="text-gray-400">{label}</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-white"
      >
        ${formattedValue}
      </motion.p>
    </div>
  );
});


AnimatedMetric.displayName = 'AnimatedMetric';

export default AnimatedMetric;
