import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/app-context";
import { RoomSelection } from "./components/RoomSelection";
import { RoomPage } from "./pages/room-page";
import { AvatarProfileModal } from "./components/avatar-profile-modal";

function AppRoutes() {
  const {
    isProfileModalOpen,
    initialProfile,
    saveProfile,
    username,
  } = useApp();

  return (
    <>
      <AvatarProfileModal
        isOpen={isProfileModalOpen}
        initialProfile={initialProfile}
        fallbackName={username}
        onSave={saveProfile}
      />
      <Routes>
        <Route path="/" element={<RoomSelection />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </>
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
