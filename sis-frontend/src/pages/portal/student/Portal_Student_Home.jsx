import { useState } from "react";
import {
  Home,
  UserRound,
  BookOpen,
  ClipboardPenLine,
  FileText,
  FileOutput,
  LogOut,
  Megaphone,
  CalendarDays,
  GraduationCap,
  Bell,
  Menu,
  X,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import "../../../styles/Portal_Student_Home.css";
import schoolLogo from "../../../assets/t_logo.png";


const navigationItems = [
  { label: "Home", page: "home", icon: Home },
  { label: "Profile", page: "profile", icon: UserRound },
  { label: "Subjects", page: "subjects", icon: BookOpen },
  { label: "Grades", page: "grades", icon: ClipboardPenLine },
  { label: "Clearance", page: "clearance", icon: FileText },
  { label: "Request", page: "request", icon: FileOutput },
];

// Sample content transcribed from the supplied dashboard screenshot.
// Replace these defaults with API data when your backend is connected.
const defaultStudent = {
  fullName: "Rafael I. Pimpolio",
  adviser: "Jessa Manalo",
  gradeSection: "9 - Bayani Agbayani",
  schoolYear: "2026-2027",
  course: "Junior High School",
  graduating: false,
};

const defaultAnnouncements = [
  {
    id: 1,
    date: "2026-09-20",
    title: "2nd Term Examination Schedule",
    description: "Please be advised for the 2nd term examination to all students",
    content: "Please be advised for the 2nd term examination to all students.",
  },
  {
    id: 2,
    date: "2026-10-07",
    title: "Office Hours and Other Reminders",
    description: "Please be guided with the updated office hours and other important reminders",
    content: "Please be guided with the updated office hours and other important reminders.",
  },
  {
    id: 3,
    date: "2026-10-16",
    title: "Grade Update",
    description: "Your 1st Term grades are now posted. Check your profile for details",
    content: "Your 1st Term grades are now posted. Check your profile for details.",
  },
];

const defaultNotifications = [
  {
    id: 1,
    icon: "megaphone",
    title: "School Announcements",
    description: "2nd Term Examination is ongoing",
    content: "2nd Term Examination is ongoing.",
  },
  {
    id: 2,
    icon: "document",
    title: "New Memorandum",
    description: "Office hours and other important reminders for students",
    content: "Office hours and other important reminders for students.",
  },
  {
    id: 3,
    icon: "calendar",
    title: "Grades Update",
    description: "Your 1st Term grades are now available",
    content: "Your 1st Term grades are now available.",
  },
];

export default function StudentHome({
  student = defaultStudent,
  announcements = defaultAnnouncements,
  notifications = defaultNotifications,
  onNavigate,
  onLogout,
  onAnnouncementClick,
  onNotificationClick,
}) {
  const [activePage, setActivePage] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const studentInfo = {...student };
  const displayValue = (value) => value || "Not available";
  const firstName = studentInfo.fullName?.trim().split(/\s+/)[0] || "Student";
  const announcementList = Array.isArray(announcements) ? announcements : [];
  const notificationList = Array.isArray(notifications) ? notifications : [];

  const navigate = (page) => {
    setActivePage(page);
    setMenuOpen(false);
    onNavigate?.(page);
  };

  const openDetails = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    if (type === "announcement") onAnnouncementClick?.(item);
    if (type === "notification") onNotificationClick?.(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
    setSelectedType(null);
  };

  const formatDate = (date) => {
    if (!date) return { month: "NEW", day: "" };
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return { month: "NEW", day: "" };
    return {
      month: parsed.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: parsed.toLocaleDateString("en-US", { day: "numeric" }),
    };
  };

  return (
    <div className="student-portal">
      <aside className={`student-sidebar ${menuOpen ? "student-sidebar--open" : ""}`}>
        <div className="sidebar-brand">
          <img src={schoolLogo} className="school-logo" />
          <div className="sidebar-brand-text">
            <strong>MMNHS PORTAL</strong>
            <span>Student Portal</span>
          </div>
        </div>

        <nav className="sidebar-navigation" aria-label="Student navigation">
          {navigationItems.map(({ label, page, icon: Icon }) => (
            <button
              key={page}
              type="button"
              className={`sidebar-link ${activePage === page ? "sidebar-link--active" : ""}`}
              onClick={() => navigate(page)}
              aria-current={activePage === page ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={1.9} />
              <span>{label}</span>
            </button>
          ))}
          <button type="button" className="sidebar-link sidebar-logout" onClick={() => onLogout?.()}>
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

      <main className="student-main">
        <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(true)}>
          <Menu size={19} /> Menu
        </button>

        <div className="student-dashboard-grid">
          <div className="dashboard-left-column">
            <section className="welcome-card">
              <div className="welcome-message">
                <h1>Hello {firstName}</h1>
                <p>
                  WELCOME! <strong>{firstName}.</strong> Everything you need for your school
                  journey is right at your fingertips.
                </p>
              </div>

              <div className="welcome-student-avatar">
                <UserCircle size={76} strokeWidth={1.1} />
              </div>

              <div className="welcome-student-details">
                <p><span>Student Name</span><strong>{displayValue(studentInfo.fullName)}</strong></p>
                <p><span>Adviser</span><strong>{displayValue(studentInfo.adviser)}</strong></p>
                <p><span>Grade &amp; Section</span><strong>{displayValue(studentInfo.gradeSection)}</strong></p>
              </div>
            </section>

            <section className="announcements-card">
              <div className="section-heading">
                <Megaphone size={29} fill="currentColor" strokeWidth={1.6} />
                <h2>Latest Announcements</h2>
              </div>

              <div className="announcement-list">
                {announcementList.length > 0 ? (
                  announcementList.map((item, index) => {
                    const date = formatDate(item.date);
                    return (
                      <button
                        className="announcement-row"
                        type="button"
                        key={item.id ?? `${item.title}-${index}`}
                        onClick={() => openDetails(item, "announcement")}
                      >
                        <span className="announcement-date">
                          <strong>{date.month}</strong>
                          {date.day && <b>{date.day}</b>}
                        </span>
                        <span className="announcement-copy">
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                        <ChevronRight className="announcement-arrow" size={23} />
                      </button>
                    );
                  })
                ) : (
                  <p className="empty-state">No announcements available.</p>
                )}
              </div>
            </section>
          </div>

          <div className="dashboard-right-column">
            <section className="notifications-card">
              <h2>Updates &amp; Notifications</h2>
              <div className="notification-list">
                {notificationList.length > 0 ? (
                  notificationList.map((item, index) => {
                    const NotificationIcon = item.icon === "calendar" ? CalendarDays :
                      item.icon === "grades" ? GraduationCap :
                      item.icon === "document" ? FileText :
                      item.icon === "megaphone" ? Megaphone : Bell;
                    return (
                      <button
                        className="notification-row"
                        type="button"
                        key={item.id ?? `${item.title}-${index}`}
                        onClick={() => openDetails(item, "notification")}
                      >
                        <NotificationIcon size={34} fill="currentColor" strokeWidth={1.5} />
                        <span className="notification-copy">
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="empty-state">No new notifications.</p>
                )}
              </div>
            </section>

            <section className="academic-card">
              <button
                className="academic-heading"
                type="button"
                onClick={() => navigate("academic-information")}
              >
                <GraduationCap size={31} fill="currentColor" strokeWidth={1.5} />
                <span>Academic Information</span>
              </button>
              <div className="academic-information">
                <div className="academic-item">
                  <span>Last Enrollment</span>
                  <strong>{displayValue(studentInfo.schoolYear)}</strong>
                </div>
                <div className="academic-item">
                  <span>Grade/Section</span>
                  <strong>{displayValue(studentInfo.gradeSection)}</strong>
                </div>
                <div className="academic-item">
                  <span>Course/Strand</span>
                  <strong>{displayValue(studentInfo.course)}</strong>
                </div>
                <div className="academic-item">
                  <span>Graduating</span>
                  <strong>
                    {studentInfo.graduating === null
                      ? "Not available"
                      : studentInfo.graduating ? "True" : "False"}
                  </strong>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {selectedItem && (
        <div className="details-overlay" onClick={closeDetails}>
          <section
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="details-modal-header">
              <h2 id="details-title">
                {selectedType === "announcement" ? "Announcement" : "Notification"}
              </h2>
              <button type="button" onClick={closeDetails} aria-label="Close details">
                <X size={22} />
              </button>
            </div>
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.content || selectedItem.description || "No additional details available."}</p>
            {selectedItem.date && (
              <small className="details-date">{new Date(selectedItem.date).toLocaleDateString()}</small>
            )}
            <button className="details-close-button" type="button" onClick={closeDetails}>Close</button>
          </section>
        </div>
      )}
    </div>
  );
}
