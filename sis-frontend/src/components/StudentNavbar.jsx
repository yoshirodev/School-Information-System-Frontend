
import { useState } from "react";
import {
  Home,
  UserRound,
  BookOpen,
  ClipboardPenLine,
  FileText,
  FileOutput,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import "../styles/Portal_Student_Home.css";
import schoolLogo from "../assets/t_logo.png";

const navigationItems = [
  { label: "Home", page: "home", icon: Home },
  { label: "Profile", page: "profile", icon: UserRound },
  { label: "Subjects", page: "subjects", icon: BookOpen },
  { label: "Grades", page: "grades", icon: ClipboardPenLine },
  { label: "Clearance", page: "clearance", icon: FileText },
  { label: "Request", page: "request", icon: FileOutput },
];

export default function StudentNavbar({
  activePage = "home",
  onNavigate,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page) => {
    setMenuOpen(false);
    onNavigate?.(page);
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
            <span>Student Portal</span>
          </div>
        </div>

        <nav
          className="sidebar-navigation"
          aria-label="Student navigation"
        >
          {navigationItems.map(({ label, page, icon: Icon }) => (
            <button
              key={page}
              type="button"
              className={`sidebar-link ${
                activePage === page ? "sidebar-link--active" : ""
              }`}
              onClick={() => navigate(page)}
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
        onClick={() => setMenuOpen(true)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
        Menu
      </button>
    </>
  );
}
