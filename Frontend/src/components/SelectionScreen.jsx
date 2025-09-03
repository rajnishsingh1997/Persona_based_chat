import React from "react";
import Select, { components } from "react-select";

const SelectionScreen = ({ setSelectedAvatar }) => {
  const { Option, SingleValue } = components;

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

  //   const handleSelectedAvatar = (selectedAvatar) => {
  //     setSelectedAvatar(selectedAvatar);
  //   };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img
        src={props.data.icon}
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      {props.data.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img
        src={props.data.icon}
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      {props.data.label}
    </Option>
  );
  return (
    <div>
      {/* <select
        onChange={(e) => {
          handleSelectedAvatar(e.target.value);
        }}
      >
        <option>hitesh</option>
        <option>piyush</option>
      </select> */}
      <Select
        placeholder="select your hero"
        components={{ Option: IconOption }}
        options={options}
      />
    </div>
  );
};

export default SelectionScreen;
