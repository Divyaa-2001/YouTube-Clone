import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <>
      <Header
        toggleSidebar={() => setIsOpen(!isOpen)}
        user={user}
        setUser={setUser}
      />

      <Sidebar
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main
        className={`pt-16 px-6 transition-all duration-300
        ${isOpen ? "md:ml-60" : "md:ml-20"}`}
      >
        <Outlet context={{ setUser }} />
      </main>
    </>
  );
}

export default App;
