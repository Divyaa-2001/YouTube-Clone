import {
  FaHome,
  FaFire,
  FaYoutube,
  FaHistory,
  FaClock,
  FaThumbsUp,
  FaMusic,
  FaShoppingBag
} from "react-icons/fa";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-white border-r z-40
      transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      ${isOpen ? "md:w-65" : "md:w-15"}
      w-60`}
    >
      <ul className="py-4 space-y-2 text-sm">

        {/* Home / Shorts */}
        <SidebarItem icon={<FaHome />} text="Home" isOpen={isOpen} active />
        <SidebarItem icon={<FaFire />} text="Shorts" isOpen={isOpen} />

        <hr />

        {/* Subscriptions */}
        {isOpen && (
          <p className="px-4 text-gray-500 font-semibold">Subscriptions</p>
        )}
        <SidebarItem icon={<FaYoutube />} text="Lakshmivenkat69" isOpen={isOpen} />
        <SidebarItem icon={<FaYoutube />} text="Code Camp Tamil" isOpen={isOpen} />

        <hr />

        {/* You */}
        {isOpen && <p className="px-4 text-gray-500 font-semibold">You</p>}
        <SidebarItem icon={<FaHistory />} text="History" isOpen={isOpen} />
        <SidebarItem icon={<FaClock />} text="Watch later" isOpen={isOpen} />
        <SidebarItem icon={<FaThumbsUp />} text="Liked videos" isOpen={isOpen} />

        <hr />

        {/* Explore */}
        {isOpen && <p className="px-4 text-gray-500 font-semibold">Explore</p>}
        <SidebarItem icon={<FaShoppingBag />} text="Shopping" isOpen={isOpen} />
        <SidebarItem icon={<FaMusic />} text="Music" isOpen={isOpen} />
      </ul>
    </aside>
  );
}

function SidebarItem({ icon, text, isOpen, active }) {
  return (
    <li
      className={`flex items-center gap-4 px-4 py-2 cursor-pointer rounded-lg 
      hover:bg-gray-100 ${active ? "bg-gray-200 font-semibold" : ""}`}
    >
      <span className="text-lg">{icon}</span>
      {isOpen && <span>{text}</span>}
    </li>
  );
}

export default Sidebar;
