
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  UserRound,
  BookOpen,
  ClipboardPenLine,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import "../styles/TeacherNavbar.css";
import schoolLogo from "../assets/t_logo.png";

const navigationItems = [
  {
    label: "Home",
    page: "home",
    path: "/Portal_Teacher_Home",
    icon: Home,
  },
  {
    label: "Profile",
    page: "profile",
    path: "/Portal_Teacher_Profile",
    icon: UserRound,
  },
  {
    label: "Teaching Load",
    page: "teaching-load",
    path: "/Portal_Teacher_Load",
    icon: BookOpen,
  },
  {
    label: "Students",
    page: "students",
    path: "/Portal_Teacher_Students",
    icon: ClipboardPenLine,
  },
];

export default function TeacherNavbar({
  activePage = "home",
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);

    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <aside
        className={`teacher-sidebar ${
          menuOpen ? "teacher-sidebar--open" : ""
        }`}
      >
          <div className="sidebar-brand">
                  <img
                    src={schoolLogo}
                    alt="School logo"
                    className="school-logo"
                  />
        
                  <div className="sidebar-brand-text">
                    <strong>MMNHS PORTAL</strong>
                    <span>Teacher Portal</span>
                  </div>
                </div>
        <nav
          className="teacher-sidebar-navigation"
          aria-label="Teacher navigation"
        >
          {navigationItems.map(({ label, page, path, icon: Icon }) => (
            <button
              key={page}
              type="button"
              className={`teacher-sidebar-link ${
                activePage === page
                  ? "teacher-sidebar-link--active"
                  : ""
              }`}
              onClick={() => handleNavigation(path)}
              aria-current={
                activePage === page ? "page" : undefined
              }
            >
              <Icon size={21} strokeWidth={1.9} />
              <span>{label}</span>
            </button>
          ))}

          <button
            type="button"
            className="teacher-sidebar-link teacher-sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={21} strokeWidth={1.9} />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>

      {menuOpen && (
        <button
          className="teacher-sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <button
        className="teacher-mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
        Menu
      </button>
    </>
  );
}
