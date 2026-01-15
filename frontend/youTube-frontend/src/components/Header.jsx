import { IoReorderThreeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

function Header({ toggleSidebar, user, setUser, setVideos }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchAllVideos = () => {
    fetch("http://localhost:8000/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.log(err));
  };

  // Search videos
  const handleSearch = () => {
    if (!search.trim()) {
      fetchAllVideos();   
      return;
    }

    fetch(`http://localhost:8000/videos/search/${search}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        navigate("/");   
      })
      .catch(err => console.log(err));
  };

useEffect(() => {
  if (!search.trim()) {
    fetchAllVideos();
    return;
  }

  const delay = setTimeout(() => {
    fetch(`http://localhost:8000/videos/search/${search}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        navigate("/");
      })
      .catch(err => console.log(err));
  }, 400); 

  return () => clearTimeout(delay);
}, [search]);
  return (
    <header className="w-full h-16 fixed flex items-center justify-between px-4 bg-white z-50">

      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-2xl">
          <IoReorderThreeOutline />
        </button>

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            setSearch("");
            fetchAllVideos();
            navigate("/");
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            className="h-6"
          />
          <span className="text-xs text-gray-500">IN</span>
        </div>
      </div>

      <div className="flex items-center w-[45%] relative">

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full outline-none"
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");
              fetchAllVideos();
            }}
            className="absolute right-12 text-gray-500"
          >
            ✕
          </button>
        )}

        <button
          onClick={handleSearch}
          className="p-[12px] border bg-gray-100 rounded-r-full"
        >
          <FaSearch />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">

            <Link to="/channel">
              <button className="border px-3 py-1 rounded">
                My Channel
              </button>
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
                fetchAllVideos();
              }}
              className="border px-3 py-1 rounded text-red-500"
            >
              Logout
            </button>

            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
              {user.username[0].toUpperCase()}
            </div>

            <span>{user.username}</span>
          </div>
        ) : (
          <Link to="/login">
            <button className="border px-4 py-1 rounded">Sign In</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
