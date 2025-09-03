import "./App.css";
import ChatScreen from "./components/ChatScreen";
import { Routes, Route } from "react-router";
import SelectionScreen from "./components/SelectionScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatScreen />} />
      </Routes>
    </>
  );
}

export default App;
