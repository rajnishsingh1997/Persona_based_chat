import "./App.css";
import ChatScreen from "./components/ChatScreen";
import { Routes, Route } from "react-router";
import SelectionScreen from "./components/SelectionScreen";
import { useState } from "react";

function App() {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <SelectionScreen
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
            />
          }
        />
        <Route
          path="/chat"
          element={<ChatScreen selectedAvatar={selectedAvatar} />}
        />
      </Routes>
    </>
  );
}

export default App;
