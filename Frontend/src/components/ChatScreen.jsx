import React from "react";

const ChatScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <input
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
