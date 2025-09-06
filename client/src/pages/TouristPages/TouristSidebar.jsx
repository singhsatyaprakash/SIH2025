import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaRegCalendarAlt, // <-- Add this import
  FaLanguage,
  FaFileAlt,
  FaUser,
  FaBars,
} from "react-icons/fa";

const TouristSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Dashboard", path: "/tourist/dashboard", icon: <FaTachometerAlt /> },
    { name: "Add New Journey", path: "/tourist/new-journey", icon: <FaMapMarkedAlt /> },
    { name: "Travel Planner", path: "/tourist/travel-planner", icon: <FaRegCalendarAlt /> }, // Changed icon
    { name: "Translator", path: "/translator", icon: <FaLanguage /> },
    { name: "File Complaint", path: "/tourist/complaint", icon: <FaFileAlt /> },
    { name: "Profile", path: "/tourist/profile", icon: <FaUser /> },
  ];

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300
        ${isOpen ? "w-64" : "w-16"} relative flex flex-col h-full`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-5 bg-blue-500 text-white rounded-full p-2 shadow-md z-10"
      >
        <FaBars />
      </button>

      {/* Logo */}
      <div className="p-4 font-bold text-blue-600 text-lg flex items-center justify-center">
        {isOpen ? "SafeTour India" : "ST"}
      </div>

      {/* Menu */}
      <ul className="mt-6 flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center gap-3 p-3 mx-2 rounded-lg cursor-pointer 
                         hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`${!isOpen && "hidden"} text-base`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TouristSidebar;
