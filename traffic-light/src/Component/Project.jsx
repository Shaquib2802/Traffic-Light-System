import React, { useEffect, useState } from "react";

const Project = () => {
  const [light, setLight] = useState("green");
  const [counter, setCounter] = useState(0);
  const [lightDuration, setLightDuration] = useState(20); 

  const durations = {
    green: 10,
    red: 10,
    yellow: 10,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + 1;
        if (next >= lightDuration) {
          let nextLight;
          if (light === "green") nextLight = "red";
          else if (light === "red") nextLight = "yellow";
          else nextLight = "green";

          setLight(nextLight);
          setLightDuration(durations[nextLight]);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [light, lightDuration]);

  const handleClickSwitch = (color) => {
    setLight(color);
    setCounter(0);
    setLightDuration(durations[color]);
  };
  console.log(":::", counter+1);
  const getLightStyle = (color) => {
    const isActive = light === color;
    const baseClasses =
      "w-20 h-20 rounded-full  cursor-pointer";
    const activeColor = {
      red: "bg-red-500  shadow-red-500",
      yellow: "bg-yellow-400  shadow-yellow-400",
      green: "bg-green-500  shadow-green-500",
    };

    return `${baseClasses} ${isActive ? activeColor[color] : "bg-gray-300"}`;
  };
  return (
    <div className="h-screen  flex items-center justify-center bg-gray-100">
      <div className="bg-black  p-6 rounded-lg flex flex-col items-center gap-4">
        <div
          onClick={() => handleClickSwitch("red")}
          className={getLightStyle("red")}
        />
        <div
          onClick={() => handleClickSwitch("yellow")}
          className={getLightStyle("yellow")}
        />
        <div
          onClick={() => handleClickSwitch("green")}
          className={getLightStyle("green")}
        />
      </div>
    </div>
  );
};

export default Project;
