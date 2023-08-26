import Image from "next/image";
import React from "react";

function Card({ record }) {
  console.log("record", record);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg mr-3 ml-3 mb-6 w-15">
      <img
        className="w-full"
        src={record?.["Logo of the organisation"]?.[0]?.thumbnails.large.url}
        alt="Program image"
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {record["Name of the organisation"]}
        </div>
        <p className="text-gray-700 text-base">
          {record["What is this program about?"].slice(0, 180).padEnd(183, ".")}
        </p>
      </div>
      <span className="bg-gray-100 text-gray-800 text-xs font-medium ml-4 mb-50 px-2.5 py-0.5 rounded inline dark:bg-gray-700 dark:text-gray-300">
        {record.Name}
      </span>
    </div>
  );
}

export default Card;
