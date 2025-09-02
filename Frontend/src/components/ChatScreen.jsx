import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const ChatScreen = () => {
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  async function sendUserInput(userQuery) {
    if (!userQuery) {
      throw new Error("Input string not provided");
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
        status: true,
        message: error.message,
      });
      throw new Error(error);
    }
  }

  const handleSubmitUserMessage = async () => {
    if (!userQuery.trim()) return;
    const newMessages = [...messages, { sender: "user", text: userQuery }];
    setMessages(newMessages);
    setUserQuery("");

    try {
      const responseFromModel = await sendUserInput(userQuery);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseFromModel.message },
      ]);
    } catch (error) {
      setError({
        status: true,
        message: error.message,
      });
    }
  };

  if (error.status) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 w-fit rounded-lg max-w-[80%] break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-300 text-black rounded-bl-none"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex space-x-2">
        <input
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-400 rounded px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSubmitUserMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
