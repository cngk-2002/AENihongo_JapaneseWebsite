import { HiOutlineHome, HiOutlineUserCircle } from 'react-icons/hi';
import { IoLanguage } from 'react-icons/io5';
import { TbVocabulary } from "react-icons/tb";
import { MdOutlineLeaderboard } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const sidebarNavItems = [
  {
    title: 'Trang chủ',
    path: '/home',
    icon: <HiOutlineHome className="sidebar-btn-icon" />,
  },
  {
    title: 'Bảng chữ cái',
    path: '/characters',
    icon: <IoLanguage className="sidebar-btn-icon" />,
  },
  // {
  //   title: 'Từ vựng',
  //   path: '/vocabularies',
  //   icon: <TbVocabulary className="sidebar-btn-icon" />,
  // },
  {
    title: 'Bảng xếp hạng',
    path: '/leaderboards',
    icon: <MdOutlineLeaderboard className="sidebar-btn-icon" />,
  },
  {
    title: 'Trang cá nhân',
    path: '/profile',
    icon: <HiOutlineUserCircle className="sidebar-btn-icon" />,
  },
];

const socialLinks = [
  {
    title: 'Github',
    url: 'https://github.com/cngk-2002/japanese_basicweb',
    icon: <FaGithub className="social-link" />,
  },
];

const charBannerText = {
  Hiragana: 'Học tiếng Nhật từ căn bản.',
  Katakana: 'Thực hành với các ký tự cần thiết cho từ mượn.',
  Kanji: 'Đưa khả năng làm chủ tiếng Nhật của bạn lên một tầm cao mới.',
};

export { sidebarNavItems, socialLinks, charBannerText };
