import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header toggleSidebar={() => setIsOpen(!isOpen)} />

      <Sidebar
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main className="pt-16 md:ml-60 px-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
