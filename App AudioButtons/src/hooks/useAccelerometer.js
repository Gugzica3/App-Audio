// src/hooks/useAccelerometer.js

import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function useAccelerometer(updateInterval = 1000) {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    Accelerometer.setUpdateInterval(updateInterval);

    return () => {
      subscription && subscription.remove();
    };
  }, [updateInterval]);

  return data;
}
