import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ChatScreen = () => {
  const [userQuery, setUserQuery] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const [error, setError] = useState({
    message: "",
  });

  async function sendUserInput(userQuery) {
    if (!userQuery) {
      throw new Error("input string not provided");
    }
    const payload = {
      query: userQuery,
    };
    try {
      const response = await fetch("http://localhost:3000/chat/start", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      return response.json();
    } catch (error) {
      setError({
        message: error.message,
      });
      throw new Error(error);
    }
  }

  const handleInputUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  const handleSubmitUserMessage = async (userQuery) => {
    try {
      const responseFromModel = await sendUserInput(userQuery);
      setModelResponse(responseFromModel.message);
    } catch (error) {
      setError({
        message: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <input
        value={userQuery}
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
