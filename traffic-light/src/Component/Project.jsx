import React, { useEffect, useState } from "react";

const durations = {
  green: 10,
  red: 10,
  yellow: 10,
};

const Project = () => {
  const [light, setLight] = useState("green");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + 1;
        if (next >= durations[light]) {
          const nextLight =
            light === "green" ? "red" : light === "red" ? "yellow" : "green";
          setLight(nextLight);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [light]);

  console.log(":::", counter);
  const handleClick = (color) => {
    setLight(color);
    setCounter(0);
  };

  const getLightClass = (color) => {
    const isActive = light === color;
    const base = "w-20 h-20 rounded-full cursor-pointer transition";
    const colors = {
      red: "bg-red-500 shadow-red-500",
      yellow: "bg-yellow-400 shadow-yellow-400",
      green: "bg-green-500 shadow-green-500",
    };
    return `${base} ${isActive ? colors[color] : "bg-gray-300"}`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-black p-6 rounded-lg flex flex-col items-center gap-4">
        <div
          onClick={() => handleClick("red")}
          className={getLightClass("red")}
        />
        <div
          onClick={() => handleClick("yellow")}
          className={getLightClass("yellow")}
        />
        <div
          onClick={() => handleClick("green")}
          className={getLightClass("green")}
        />
      </div>
    </div>
  );
};

export default Project;
