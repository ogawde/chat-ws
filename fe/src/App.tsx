import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/app-context";
import { RoomSelection } from "./components/RoomSelection";
import { RoomPage } from "./pages/room-page";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoomSelection />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
