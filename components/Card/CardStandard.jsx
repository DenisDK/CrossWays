import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const CardStandard = () => {
  return (
    <div className="border-[3px] rounded-[30px] border-[#5C6D67] p-10 mt-16 max-w-xl">
      <div className="text-center max-w-96">
        <h2 className="text-[#876447] text-3xl font-bold">Regular</h2>
        <h3 className="text-[#876447] text-2xl mt-3">
          Use standard features to plan and search for trips easily
        </h3>
      </div>
      <div className="flex flex-col items-center my-10">
        <p className="flex items-center text-2xl text-[#876447]">
          <span className="mr-2">
            <FaCheck color="#19a625" />
          </span>
          Lorem, ipsum dolor.
        </p>
        <p className="flex items-center text-2xl text-[#876447]">
          <span className="mr-2">
            <FaCheck color="#19a625" />
          </span>
          Lorem, ipsum dolor.
        </p>
        <p className="flex items-center text-2xl text-[#876447]">
          <span className="mr-2">
            <FaCheck color="#19a625" />
          </span>
          Lorem, ipsum dolor.
        </p>
        <p className="flex items-center text-2xl text-[#876447]">
          <span className="mr-2">
            <IoMdClose color="#f52020" />
          </span>
          Lorem, ipsum dolor.
        </p>
        <p className="flex items-center text-2xl text-[#876447]">
          <span className="mr-2">
            <IoMdClose color="#d91c1c" />
          </span>
          Lorem, ipsum dolor.
        </p>
      </div>
      <div className="text-center">
        <span className="text-white text-2xl bg-[#5C6D67] px-5 py-2 rounded-lg">
          Now active
        </span>
      </div>
    </div>
  );
};

export default CardStandard;