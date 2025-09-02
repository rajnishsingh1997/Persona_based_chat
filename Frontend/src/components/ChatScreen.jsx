import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ChatScreen = () => {
  const [userQuery, setUserQuery] = useState("");

  async function sendUserInput(userQuery) {
    console.log("userQuery from api calling function", userQuery);
    const payload = {
      query: userQuery,
    };
    const response = await fetch("http://localhost:3000/chat/start", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  const handleInputUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  const handleSubmitUserMessage = async (userQuery) => {
    sendUserInput(userQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <input
        onChange={handleInputUserQuery}
        placeholder="Enter your message.."
        className="border-2 border-black px-4 py-2 rounded w-72"
      />
      <button
        onClick={() => {
          handleSubmitUserMessage(userQuery);
        }}
        className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default ChatScreen;
