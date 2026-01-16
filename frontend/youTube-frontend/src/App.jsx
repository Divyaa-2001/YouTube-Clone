import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const location = useLocation();

  // Hide header on login & register
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {
    fetch("http://localhost:8000/videos")
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  return (
    <>
      {!hideHeader && (
        <>
          <Header
            toggleSidebar={() => setIsOpen(!isOpen)}
            user={user}
            setUser={setUser}
            setVideos={setVideos}
          />

          <Sidebar
            isOpen={isOpen}
            closeSidebar={() => setIsOpen(false)}
          />
        </>
      )}

      <main
        className={`${
          hideHeader ? "p-0" : "pt-16 px-6"
        } ${isOpen && !hideHeader ? "md:ml-60" : "md:ml-20"}`}
      >
        <Outlet context={{ videos, setVideos, setUser }} />
      </main>
    </>
  );
}

export default App;
