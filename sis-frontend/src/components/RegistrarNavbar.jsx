
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  UserRound,
  BookOpen,
  ClipboardPenLine,
  FileOutput,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import "../styles/Portal_Student_Home.css";
import schoolLogo from "../assets/t_logo.png";

const navigationItems = [
  { label: "Home", page: "home", path: "/Portal_Registrar_Home", icon: Home },
  { label: "Profile", page: "profile", path: "/Portal_Registrar_Profile", icon: UserRound },
  { label: "Student List", page: "subjects", path: "/Portal_Registrar_Studlist", icon: BookOpen },
  { label: "Document Management", page: "grades", path: "/Portal_Registrar_Doc", icon: ClipboardPenLine },
  { label: "Request Management", page: "clearance", path: "/Portal_Registrar_Req", icon: FileOutput },
];

export default function RegistrarNavbar({
  activePage = "home",
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const logout = () => {
    setMenuOpen(false);
    onLogout?.();
  };

  return (
    <>
      <aside
        className={`student-sidebar ${
          menuOpen ? "student-sidebar--open" : ""
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
            <span>Registrar Portal</span>
          </div>
        </div>

        <nav
          className="sidebar-navigation"
          aria-label="Registrar navigation"
        >
          {navigationItems.map(({ label, page, path, icon: Icon }) => (
            <button
              key={page}
              type="button"
              className={`sidebar-link ${
                activePage === page ? "sidebar-link--active" : ""
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
            className="sidebar-link sidebar-logout"
            onClick={logout}
          >
            <LogOut size={21} strokeWidth={1.9} />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>

      {menuOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <button
        className="mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
        Menu
      </button>
    </>
  );
}
