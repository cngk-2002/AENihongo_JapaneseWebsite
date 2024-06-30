import { NavLink } from "react-router-dom";
import Auth from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_DARKMODE } from "../features/darkMode/darkModeSlice";
import logo from "../assets/AENihongoLogo.svg";
import logoText from "../assets/AENihongoTextBlack.svg";
import logoTextDarkMode from "../assets/AENihongoTextWhite.svg";
import { sidebarNavItems } from "../constants/constants";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

const Sidebar = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  return (
    <aside
      id="sidebar"
      className="hidden sm:flex flex-col items-center xl:items-start fixed z-30 w-full h-full min-h-full max-w-[88px] xl:max-w-[300px] p-6 px-4 bg-white dark:bg-slate-800 border-r-2 border-gray-300 dark:border-gray-700"
    >
      <NavLink
        to="/home"
        className="flex items-center gap-3 w-fit xl:px-4 hover:opacity-70"
      >
        <img src={logo} alt="Logo" className="w-10 h-10" />
        {darkMode ? (
          <img
            src={logoTextDarkMode}
            alt="Logo"
            className="w-auto h-6 sidebar-text"
          />
        ) : (
          <img src={logoText} alt="Logo" className="w-auto h-6 sidebar-text" />
        )}
      </NavLink>

      <nav className="flex flex-col justify-between w-full gap-2 mt-8">
        {sidebarNavItems.map((item) => (
          <NavLink key={item.title} to={item.path} className="sidebar-btn">
            {item.icon}
            <span className="sidebar-text">{item.title}</span>
          </NavLink>
        ))}

        <button
          type="button"
          className="sidebar-btn"
          onClick={() => dispatch(TOGGLE_DARKMODE(darkMode))}
        >
          {darkMode ? (
            <HiOutlineSun className="sidebar-btn-icon" />
          ) : (
            <HiOutlineMoon className="sidebar-btn-icon" />
          )}
          <span className="sidebar-text">
            {darkMode ? "Light mode" : "Dark mode"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => Auth.logout()}
          className="sidebar-btn"
        >
          <FiLogOut className="sidebar-btn-icon" />
          <span className="sidebar-text">Đăng xuất</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
