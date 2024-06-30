import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DARKMODE } from '../features/darkMode/darkModeSlice';
import logo from '../assets/AENihongoLogo.svg';
import logoText from '../assets/AENihongoTextBlack.svg';
import logoTextDarkMode from '../assets/AENihongoTextWhite.svg';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const Header = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-900 z-50">
      <nav className="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-70 custom-transition"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10"
          />
        
          {darkMode ? (
            <img
              src={logoTextDarkMode}
              alt="Logo"
              className="w-auto h-6 hidden sm:inline-block"
            />
          ) : (
            <img
              src={logoText}
              alt="Logo"
              className="w-auto h-6 hidden sm:inline-block"
            />
          )}
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 font-bold">
          <button
            type="button"
            className="hover:opacity-70"
            onClick={() => dispatch(TOGGLE_DARKMODE())}
          >
            {darkMode ? (
              <HiOutlineSun
                className="w-6 h-6"
              />
            ) : (
              <HiOutlineMoon
                className="w-6 h-6"
              />
            )}
          </button>
          <Link
            to="/login"
            className="py-2 px-4 hover:text-primary-shade"
          >
            Đăng nhập
          </Link>
          <Link
            to="/signup"
            className="py-2 px-4 text-white bg-primary hover:bg-primary-shade rounded-xl"
          >
            Đăng ký
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
