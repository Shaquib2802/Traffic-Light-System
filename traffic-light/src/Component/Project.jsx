import React, { useEffect, useState } from "react";

const Project = () => {
  const [light, setLight] = useState("green");
  const [counter, setCounter] = useState(0);
  const durations = {
    green: 120,
    red: 30,
    yellow: 10,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + 1;
        if (next >= durations[light]) {
          const nextLight =
            light === "green" ? "yellow" : light === "yellow" ? "red" : "green";
          setLight(nextLight);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [light]);

  const handleClick = (color) => {
    setLight(color);
    setCounter(0);
  };
  console.log(":::", counter);

  const getLightClass = (color) => {
    const isActive = light === color;
    const base = "w-20 h-20 rounded-full cursor-pointer transition";
    const activeColors = {
      red: "bg-red-600 ",
      yellow: "bg-yellow-500 ",
      green: "bg-green-500 ",
    };
    return `${base} ${isActive ? activeColors[color] : "bg-gray-300"}`;
  };

  return (
    <div className=" h-screen   ">
      <div className="flex flex-col py-1 justify-center items-center">
        <div className="mx-auto w-[10%] ">
          <div className="bg-gray-600 p-6 rounded-lg   flex flex-col items-center gap-4">
            <div
              onClick={() => handleClick("red")}
              className={`${getLightClass(
                "red"
              )} border border-t-4 border-gray-700 `}
            />
            <div
              onClick={() => handleClick("yellow")}
              className={`${getLightClass(
                "yellow"
              )} border border-t-4 border-gray-700 `}
            />
            <div
              onClick={() => handleClick("green")}
              className={`${getLightClass(
                "green"
              )} border border-t-4 border-gray-700`}
            />
          </div>
        </div>
        <div className="bg-black h-56 w-7">2</div>
      </div>
      <div className="absolute bottom-36 right-[47.8%] w-14 text-center   border-4  border-gray-600 p-1 bg-white rounded-sm font-bold  text-gray-600 ">
        {counter}
      </div>
    </div>
  );
};

export default Project;
