
import { useState } from "react";
import {
  FileText,
  Megaphone,
  CalendarDays,
  GraduationCap,
  Bell,
  ChevronRight,
  UserCircle,
  X,
} from "lucide-react";

import TeacherNavbar from "../../../components/TeacherNavbar";
import "../../../styles/Portal_Student_Home.css";

// Sample content transcribed from the supplied dashboard screenshot.
// Replace these defaults with API data when your backend is connected.
const defaultStudent = {
  fullName: "Kyle Damerick Asor",
  position: "Teacher III",
  advisoryClass: "9 - Bayani Agbayani",
  schoolYear: "2026-2027",
};

const defaultAnnouncements = [
  {
    id: 1,
    date: "2026-09-20",
    title: "2nd Term Examination Schedule",
    description:
      "Please be advised for the 2nd term examination to all students",
    content:
      "Please be advised for the 2nd term examination to all students.",
  },
  {
    id: 2,
    date: "2026-10-07",
    title: "Office Hours and Other Reminders",
    description:
      "Please be guided with the updated office hours and other important reminders",
    content:
      "Please be guided with the updated office hours and other important reminders.",
  },
  {
    id: 3,
    date: "2026-10-16",
    title: "Grade Update",
    description:
      "Your 1st Term grades are now posted. Check your profile for details",
    content:
      "Your 1st Term grades are now posted. Check your profile for details.",
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
    description:
      "Office hours and other important reminders",
    content:
      "Office hours and other important reminders",
  },
  {
    id: 3,
    icon: "calendar",
    title: "Grades Update",
    description: "All grades must be submitted by the end of the week.",
    content: "All grades must be submitted by the end of the week.",
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

  const studentInfo = { ...defaultStudent, ...student };

  const displayValue = (value) => value || "Not available";

  const firstName =
    studentInfo.fullName?.trim().split(/\s+/)[0] || "Student";

  const announcementList = Array.isArray(announcements)
    ? announcements
    : [];

  const notificationList = Array.isArray(notifications)
    ? notifications
    : [];

  // Handles navigation from the reusable StudentNavbar.
  const navigate = (page) => {
    setActivePage(page);
    onNavigate?.(page);
  };

  const openDetails = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);

    if (type === "announcement") {
      onAnnouncementClick?.(item);
    }

    if (type === "notification") {
      onNotificationClick?.(item);
    }
  };

  const closeDetails = () => {
    setSelectedItem(null);
    setSelectedType(null);
  };

  const formatDate = (date) => {
    if (!date) {
      return { month: "NEW", day: "" };
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return { month: "NEW", day: "" };
    }

    return {
      month: parsed
        .toLocaleDateString("en-US", { month: "short" })
        .toUpperCase(),

      day: parsed.toLocaleDateString("en-US", {
        day: "numeric",
      }),
    };
  };

  return (
    <div className="student-portal">

      {/* Reusable Student Navbar */}
      <TeacherNavbar
        activePage={activePage}
        onNavigate={navigate}
        onLogout={onLogout}
      />

      <main className="student-main">
        <div className="student-dashboard-grid">

          {/* LEFT COLUMN */}
          <div className="dashboard-left-column">

            {/* Welcome Card */}
            <section className="welcome-card">
              <div className="welcome-message">
                <h1>Hello {firstName}</h1>

                <p>
                  WELCOME! <strong>{firstName}.</strong> Everything you need for your teaching journey is right at your fingertips.
                </p>
              </div>

              <div className="welcome-student-avatar">
                <UserCircle size={76} strokeWidth={1.1} />
              </div>

              <div className="welcome-student-details">
                <p>
                  <span>Student Name</span>
                  <strong>
                    {displayValue(studentInfo.fullName)}
                  </strong>
                </p>

                <p>
                  <span>Position Title</span>
                  <strong>
                    {displayValue(studentInfo.position)}
                  </strong>
                </p>

                <p>
                  <span>Advisory Class</span>
                  <strong>
                    {displayValue(studentInfo.advisoryClass)}
                  </strong>
                </p>
              </div>
            </section>

            {/* Latest Announcements */}
            <section className="announcements-card">
              <div className="section-heading">
                <Megaphone
                  size={29}
                  fill="currentColor"
                  strokeWidth={1.6}
                />

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
                        onClick={() =>
                          openDetails(item, "announcement")
                        }
                      >
                        <span className="announcement-date">
                          <strong>{date.month}</strong>

                          {date.day && <b>{date.day}</b>}
                        </span>

                        <span className="announcement-copy">
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>

                        <ChevronRight
                          className="announcement-arrow"
                          size={23}
                        />
                      </button>
                    );
                  })
                ) : (
                  <p className="empty-state">
                    No announcements available.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="dashboard-right-column">

            {/* Updates and Notifications */}
            <section className="notifications-card">
              <h2>Updates &amp; Notifications</h2>

              <div className="notification-list">
                {notificationList.length > 0 ? (
                  notificationList.map((item, index) => {
                    const NotificationIcon =
                      item.icon === "calendar"
                        ? CalendarDays
                        : item.icon === "grades"
                          ? GraduationCap
                          : item.icon === "document"
                            ? FileText
                            : item.icon === "megaphone"
                              ? Megaphone
                              : Bell;

                    return (
                      <button
                        className="notification-row"
                        type="button"
                        key={item.id ?? `${item.title}-${index}`}
                        onClick={() =>
                          openDetails(item, "notification")
                        }
                      >
                        <NotificationIcon
                          size={34}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />

                        <span className="notification-copy">
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="empty-state">
                    No new notifications.
                  </p>
                )}
              </div>
            </section>

            {/* Academic Information */}
            <section className="academic-card">
              <button
                className="academic-heading"
                type="button"
                onClick={() =>
                  navigate("academic-information")
                }
              >
                <GraduationCap
                  size={31}
                  fill="currentColor"
                  strokeWidth={1.5}
                />

                <span>Teacher Information</span>
              </button>

              <div className="academic-information">
                <div className="academic-item">
                  <span>Teacher Name</span>
                  <strong>
                    {displayValue(studentInfo.fullName)}
                  </strong>
                </div>

                <div className="academic-item">
                  <span>Position Title</span>
                  <strong>
                    {displayValue(studentInfo.position)}
                  </strong>
                </div>

                <div className="academic-item">
                  <span>DepEd Email</span>
                  <strong>
                    kyledamerick.asor@deped.gov.ph
                  </strong>
                </div>

                <div className="academic-item">
                  <span>Subject</span>
                  <strong>
                    Enlgish
                  </strong>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Announcement / Notification Details Modal */}
      {selectedItem && (
        <div
          className="details-overlay"
          onClick={closeDetails}
        >
          <section
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="details-modal-header">
              <h2 id="details-title">
                {selectedType === "announcement"
                  ? "Announcement"
                  : "Notification"}
              </h2>

              <button
                type="button"
                onClick={closeDetails}
                aria-label="Close details"
              >
                <X size={22} />
              </button>
            </div>

            <h3>{selectedItem.title}</h3>

            <p>
              {selectedItem.content ||
                selectedItem.description ||
                "No additional details available."}
            </p>

            {selectedItem.date && (
              <small className="details-date">
                {new Date(
                  selectedItem.date
                ).toLocaleDateString()}
              </small>
            )}

            <button
              className="details-close-button"
              type="button"
              onClick={closeDetails}
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
