// import { IoReorderThreeOutline } from "react-icons/io5";
// import { FaSearch, FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function Header({toggleSidebar} ) {
//   const user = JSON.parse(localStorage.getItem("user")); // saved after login

//   return (
//     <header className="w-full h-16 flex items-center justify-between px-4 border-b bg-white">

//       <div className="flex items-center gap-4">
//          <button onClick={toggleSidebar} className="text-2xl">
//         <IoReorderThreeOutline />
//       </button>

//         <div className="flex items-center gap-1">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
//             className="h-6"
//           />
//           <span className="text-xs text-gray-500">IN</span>
//         </div>
//       </div>

//       <div className="flex items-center w-[45%]">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full px-4 py-2 border border-gray-300 rounded-l-full"
//         />
//         <button className="p-[12px] border bg-gray-100 rounded-r-full">
//           <FaSearch />
//         </button>
//       </div>

//       <div className="flex items-center gap-4">

//         <button className="flex items-center gap-1 px-3 py-2 border rounded-full">
//           <FaPlus /> <span>Create</span>
//         </button>

//        {user ? (
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
//             {user.username[0].toUpperCase()}
//           </div>
//           <span>{user.username}</span>
//         </div>
//       ) : (
//         <Link to="/login">
//           <button className="border px-4 py-1 rounded">Sign In</button>
//         </Link>
//       )}

//       </div>
//     </header>
//   );
// }

// export default Header;

import { IoReorderThreeOutline } from "react-icons/io5";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ toggleSidebar, setVideos }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search) return;

    fetch(`http://localhost:8000/videos/search/${search}`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.log(err));
  };

  return (
    <header className="w-full h-16 fixed flex items-center justify-between px-4 border-b bg-white">

      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-2xl">
          <IoReorderThreeOutline />
        </button>

        <div className="flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            className="h-6"
          />
          <span className="text-xs text-gray-500">IN</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-[45%]">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full"
        />
        <button
          onClick={handleSearch}
          className="p-[12px] border bg-gray-100 rounded-r-full"
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center gap-4">

        <button className="flex items-center gap-1 px-3 py-2 border rounded-full">
          <FaPlus /> <span>Create</span>
        </button>

        {user ? (
          <div className="flex items-center gap-2">
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
