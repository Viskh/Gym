import React, { useEffect, useState } from 'react';
import { getRemainingTimeUntil } from './Utils';

const defaultTime = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00"
}

const Timer = ({timestampMs}) => {
  const [time, setTime] = useState(defaultTime);

  useEffect(()=> {
    const intervalId = setInterval(()=> {
      updateTime(timestampMs);
    }, 1000);
    return ()=> clearInterval(intervalId)
  }, [timestampMs])

  function updateTime(countdown) {
   setTime(getRemainingTimeUntil(countdown))
  }

  return (
    <div>
      <h3>Осталось: </h3>
      <span>{time.days}</span>
      <span> d : </span>
      <span>{time.hours}</span>
      <span> h  </span>
      <span>{time.minutes}</span>
      <span> m : </span>
      <span>{time.seconds}</span>
      <span> s  </span>
    </div>
  );
};

export default Timer;