import { useState } from "react";

export const RelativeTimeBar = ({timestamp}) => {
  const [time, setTime] = useState("-");
  setInterval(() => {
    if (timestamp !== undefined){
      const now = Date.now();
      const difference = now - new Date(timestamp).getTime();
  
      // Calculate time units
      const seconds = Math.floor(Math.abs(difference) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
  
      // Define thresholds and formatting
      let unit;
      if (seconds < 60) {
        unit = `${seconds}s`;
        setTime(`${unit}`);
      } else if (minutes < 60) {
        unit = `${minutes}m`;
        setTime(`${unit}`);
      } else if (hours < 24) {
        unit = `${hours}h`;
        setTime(`${unit}`);
      } else {
        unit = `${days}d`;
        setTime(`${unit}`);
      } 
  
    }    
    // Update state with relative time
  }, 1000);

  return <>{time}</>
}
