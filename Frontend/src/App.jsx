import "./App.css";
import ChatScreen from "./components/ChatScreen";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router";
import SelectionScreen from "./components/SelectionScreen";
import { useState } from "react";

function App() {
  const [selectedAvatar, setSelectedAvatar] = useState("hitesh");
  console.log("setSelectedAvatar from app", selectedAvatar);
  return (
    <>
      <Routes>
        <Route
          path="/selectAvatar"
          element={<SelectionScreen setSelectedAvatar={setSelectedAvatar} />}
        />
        <Route path="/" element={<ChatScreen />} />
      </Routes>
    </>
  );
}

export default App;
