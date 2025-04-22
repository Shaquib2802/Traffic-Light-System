import React, { useEffect, useState } from "react";

const App = () => {
  const [light, setLight] = useState("green"); 
  const [counter, setCounter] = useState(0); 
  const [manualSwitch, setManualSwitch] = useState(false);
  const [lightDuration, setLightDuration] = useState(120); 

  const handleClickSwitch = (color) => {
    setLight(color);
    setManualSwitch(true); 
    resetCounter(color);
  };


  const resetCounter = (color) => {
    if (color === "green") {
      setCounter(0); 
      setLightDuration(120); // 120 seconds for Green
    } else if (color === "red") {
      setCounter(0); // Reset counter for Red (30 seconds)
      setLightDuration(30); // 30 seconds for Red
    } else if (color === "yellow") {
      setCounter(0); // Reset counter for Yellow (10 seconds)
      setLightDuration(10); // 10 seconds for Yellow
    }
  };

  console.log("Counter:", counter);

  // Auto switch traffic lights every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (manualSwitch) {
        setCounter((prev) => {
          const next = prev + 1; // Increment time counter

          // Switch lights based on the counter and duration
          if (next >= lightDuration) {
            switchLight();
            return 0; // Reset counter after duration
          }

          return next;
        });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [manualSwitch, lightDuration]);

  // Function to handle the automatic switching of lights
  const switchLight = () => {
    if (light === "green") {
      setLight("red"); // Green -> Red
      setLightDuration(30); // Set Red duration to 30 seconds
    } else if (light === "red") {
      setLight("yellow"); // Red -> Yellow
      setLightDuration(10); // Set Yellow duration to 10 seconds
    } else if (light === "yellow") {
      setLight("green"); // Yellow -> Green
      setLightDuration(120); // Set Green duration to 2 minutes
    }
  };

  // Styling for traffic light colors
  const getLightStyle = (color) => ({
    backgroundColor: color === light ? color : "#ccc", // Active light gets color, inactive gets gray
    width: 80,
    height: 80,
    margin: "10px auto",
    borderRadius: "50%",
    transition: "background-color 0.5s", // Smooth transition
    cursor: "pointer", // Change cursor to pointer when hovering over light
  });

  return (
    <div className="text-center mt-10">
      <div
        style={{
          width: 100,
          margin: "0 auto",
          padding: 20,
          backgroundColor: "#333",
          borderRadius: 10,
        }}
      >
        {/* Click on the red light to switch */}
        <div
          onClick={() => handleClickSwitch("red")}
          style={getLightStyle("red")}
        ></div>
        {/* Click on the yellow light to switch */}
        <div
          onClick={() => handleClickSwitch("yellow")}
          style={getLightStyle("yellow")}
        ></div>
        {/* Click on the green light to switch */}
        <div
          onClick={() => handleClickSwitch("green")}
          style={getLightStyle("green")}
        ></div>
      </div>
    </div>
  );
};

export default App;
