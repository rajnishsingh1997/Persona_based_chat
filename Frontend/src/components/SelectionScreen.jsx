import React, { useState } from "react";
import Select, { components } from "react-select";

const SelectionScreen = () => {
  const { Option } = components;
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const options = [
    {
      value: "hitesh",
      label: "hitesh",
      icon: "https://media.licdn.com/dms/image/v2/D4D03AQH8CXRHAKQd6Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1693777638244?e=1759968000&v=beta&t=5wws_pfgy9wI1fqp0d2DJlkZaiBdW1OLJBDf6YoBMEo",
    },
    {
      value: "piyush",
      label: "piyush",
      icon: "https://media.licdn.com/dms/image/v2/D5603AQGibOAbOze1IA/profile-displayphoto-shrink_800_800/B56ZRk01SFGoAg-/0/1736858359580?e=1759968000&v=beta&t=MQxIXWzJXNaq5z0p1njyo0aDD3dO6msTcr3msYk5bSg",
    },
  ];

  const IconOption = (props) => (
    <Option
      {...props}
      className="flex items-center space-x-3 px-3 py-2 hover:bg-blue-200 rounded-md"
    >
      <img
        src={props.data.icon}
        className="w-10 h-10 rounded-full object-cover"
        alt={props.data.label}
      />
      <span className="text-blue-900 font-medium ">{props.data.label}</span>
    </Option>
  );

  const handleSubmit = async (selectedAvatar) => {
    console.log(selectedAvatar);
  };

  return (
    <div className="fixed inset-0 bg-blue-900/50 flex justify-center items-center z-50">
      <div className="bg-blue-100 p-10 rounded-2xl shadow-lg w-96 max-w-[90%] text-center">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6">
          Select Your Avatar
        </h2>

        <Select
          placeholder="Choose your hero"
          components={{ Option: IconOption }}
          options={options}
          onChange={(selected) => setSelectedAvatar(selected.value)}
          className="mb-6"
          classNamePrefix="react-select"
        />

        <button
          onClick={() => {
            handleSubmit(selectedAvatar);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelectionScreen;
