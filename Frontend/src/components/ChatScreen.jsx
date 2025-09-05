import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { system_prompt, system_prompt_two } from "../utils/system_prompt";
import { useNavigate } from "react-router";
import TypingIndicator from "./IncomingChatLoading";

const ChatScreen = ({ selectedAvatar }) => {
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [convoHistory, setConvoHistory] = useState([
    {
      role: "system",
      content: `${
        selectedAvatar == "hitesh" ? system_prompt : system_prompt_two
      }`,
    },
  ]);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [incomingResponse, setIncomingResponse] = useState(false);

  let navigate = useNavigate();

  async function sendUserInput(convoHistory) {
    let payload = convoHistory;
    setIncomingResponse(true);
    try {
      const response = await fetch("https://persona-based-chat-3.onrender.com/chat/start", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ conversation: payload }),
      });
      setIncomingResponse(false);
      return response.json();
    } catch (error) {
      setIncomingResponse(false);
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
    const updatedConvo = [
      ...convoHistory,
      { role: "user", content: userQuery },
    ];
    setConvoHistory(updatedConvo);
    setMessages(newMessages);
    setUserQuery("");

    try {
      const responseFromModel = await sendUserInput(updatedConvo);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responseFromModel.message.choices[0].message.content,
        },
      ]);
      setConvoHistory((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: responseFromModel.message.choices[0].message.content,
        },
      ]);
    } catch (error) {
      setError({
        status: true,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (!selectedAvatar) {
      navigate("/");
    }
  }, [selectedAvatar]);

  if (error.status) {
    return <div>{error.message}</div>;
  }

  return (
    <>
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

          {incomingResponse && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
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
    </>
  );
};

export default ChatScreen;
