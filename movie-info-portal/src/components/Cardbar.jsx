import React from "react";

const formatNumber = (number) => {
  // Convert the number to a string
  let numStr = number.toString();

  // Split the string into an array of characters
  let numArr = numStr.split("");

  // Reverse the array to start formatting from the rightmost digit
  numArr.reverse();

  // Insert commas every three digits
  for (let i = 3; i < numArr.length; i += 4) {
    numArr.splice(i, 0, ",");
  }

  // Reverse the array back to its original order
  numArr.reverse();

  // Join the array back into a string
  numStr = numArr.join("");

  // Return the formatted number
  return numStr;
};

const hourmin = (runtime) => {
  let hours = Math.floor(runtime / 60);
  let minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};
const Cardbar = ({ title, data }) => {
  return (
    <div className="px-4 py-4 border border-slate-3000">
      <div className="font-bold">{title}</div>
      <div className="pl-2 font-bold text-blue-500">
        {" "}
        {data
          ? title === "Total Runtime"
            ? hourmin(data)
            : `${data}`
          : "$0"}
      </div>
    </div>
  );
};

export default Cardbar;
