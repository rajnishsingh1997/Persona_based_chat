import React from "react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';

const ChatScreen = () => {
  const [userQuery, setUserQuery] = useState("");

  const handleInputUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  // we need to define the function that can be passed to the tanstack for the api calls.

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <input
        onChange={handleInputUserQuery}
        placeholder="Enter your message.."
        className="border-2 border-black px-4 py-2 rounded w-72"
      />
      <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600">
        Send
      </button>
    </div>
  );
};

export default ChatScreen;
