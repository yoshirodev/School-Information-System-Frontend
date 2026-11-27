
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  UserRound,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  FileText,
  UserCircle,
  Users,
  Clock3,
  Files,
  CalendarDays,
  Bell,
  ChevronRight,
  X,
  Info,
  Activity,
  Megaphone,
  BarChart3,
  FileCheck2,
} from "lucide-react";

import "../../../styles/Portal_Registrar_Home.css";
import RegistrarNavbar from "../../../components/RegistrarNavbar";

const defaultDashboard = {
  userName: "Registrar",
  registrarName: "Registrar Personnel",
  schoolYear: "2026-2027",
  officeHours: "7:30 AM - 8:30 PM (Monday - Friday)",
  totalStudents: "567",
  pendingRequests: "3",
  processedDocuments: "67",
  pendingDocumentRequests: "—",
  nextEnrollmentDate: "December 1, 2026",
};

const defaultActivities = [
  {
    id: 1,
    title: "New Document Request",
    description: "A document request was received.",
    date: "Recent activity",
  },
  {
    id: 2,
    title: "Student Document Uploaded",
    description: "A student document was uploaded.",
    date: "Recent activity",
  },
  {
    id: 3,
    title: "New Student Record",
    description: "A student record was added.",
    date: "Recent activity",
  },
];

const defaultNotifications = [
  {
    id: 1,
    icon: "megaphone",
    title: "School Announcements",
    description: "Check the latest school announcements.",
    content: "New school announcements will appear here.",
  },
  {
    id: 2,
    icon: "document",
    title: "Pending Document Requests",
    description: "Review document requests awaiting action.",
    content: "Requests requiring registrar review will appear here.",
  },
  {
    id: 3,
    icon: "calendar",
    title: "Upcoming Enrollment",
    description: "Prepare for the next enrollment period.",
    content: "The next enrollment schedule will be displayed here.",
  },
];

export default function Portal_Registrar_Home({
  dashboardData = {},
  activities = defaultActivities,
  notifications = defaultNotifications,
  onNavigate,
  onLogout,
  onRegistrarInfo,
  onViewAllActivity,
  onActivityClick,
  onNotificationClick,
}) {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [message, setMessage] = useState("");

  const data = useMemo(
    () => ({ ...defaultDashboard, ...dashboardData }),
    [dashboardData]
  );

  const activityList = Array.isArray(activities) ? activities : [];
  const notificationList = Array.isArray(notifications)
    ? notifications
    : [];

  const firstName = data.userName?.trim().split(/\s+/)[0] || "Registrar";

  const handleNavbarNavigation = (page, path, label) => {
    if (onNavigate) return onNavigate(page, path);

    if (page === "home" || page === "profile") {
      return navigate(path);
    }

    setMessage(`${label} page is not connected yet.`);
  };

  const logout = () => (onLogout ? onLogout() : navigate("/login"));

  const openDetails = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);

    if (type === "activity") onActivityClick?.(item);
    if (type === "notification") onNotificationClick?.(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
    setSelectedType("");
  };

  const openRegistrarInfo = () => {
    if (onRegistrarInfo) return onRegistrarInfo();

    openDetails(
      {
        title: "Registrar Information",
        content: `${data.registrarName}\nOffice hours: ${data.officeHours}\nSchool year: ${data.schoolYear}`,
      },
      "information"
    );
  };

  const viewAllActivity = () => {
    if (onViewAllActivity) return onViewAllActivity();

    openDetails(
      {
        title: "Recent Activity",
        content: activityList.length
          ? activityList
              .map(
                (item) =>
                  `${item.title}: ${item.description || ""}`
              )
              .join("\n\n")
          : "No recent activity available.",
      },
      "activity"
    );
  };

  // QUICK OVERVIEW - THREE CARDS
  const stats = [
    {
      label: "Total Students",
      value: data.totalStudents,
      icon: Users,
    },
    {
      label: "Pending Request",
      value: data.pendingRequests,
      icon: FileText,
    },
    {
      label: "Processed Documents",
      value: data.processedDocuments,
      icon: FileCheck2,
    },
  ];

  const NotificationIcon = ({ icon }) =>
    icon === "calendar" ? (
      <CalendarDays size={29} />
    ) : icon === "document" ? (
      <FileText size={29} />
    ) : icon === "grades" ? (
      <GraduationCap size={29} />
    ) : (
      <Megaphone size={29} />
    );

  return (
    <div className="registrar-portal">
      <RegistrarNavbar
        activePage="home"
        onNavigate={handleNavbarNavigation}
        onLogout={logout}
      />

      <main className="registrar-main">
        <div className="registrar-dashboard-grid">
          <div className="registrar-left-column">

            {/* WELCOME CARD */}
            <section className="registrar-welcome-card">
              <div className="registrar-welcome-copy">
                <span className="registrar-eyebrow">
                  MEDROSO-MENDOZA NATIONAL HIGH SCHOOL
                </span>

                <h1>Hello {firstName}</h1>

                <p>
                  Welcome to the MMNHS Registrar Portal. Manage student
                  records, document requests, and registrar activities
                  in one place.
                </p>
              </div>

              <div className="registrar-welcome-avatar">
                <UserCircle size={76} strokeWidth={1.15} />
              </div>

              <div className="registrar-welcome-person">
                <span>REGISTRAR PERSONNEL</span>
                <strong>{data.registrarName}</strong>
                <small>School Year {data.schoolYear}</small>
              </div>
            </section>

            {/* QUICK OVERVIEW */}
            <section className="registrar-overview-card">
              <div className="registrar-section-heading registrar-overview-heading">
                <BarChart3 size={32} />
                <h2>Quick Overview</h2>
              </div>

              <div className="registrar-stats-grid">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <article
                      className="registrar-stat-card"
                      key={stat.label}
                    >
                      <span className="registrar-stat-icon">
                        <Icon size={25} strokeWidth={1.8} />
                      </span>

                      <div className="registrar-stat-content">
                        <strong>{stat.value ?? "—"}</strong>
                        <span>{stat.label}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* RECENT ACTIVITY */}
            <section className="registrar-activity-card">
              <div className="registrar-section-heading registrar-activity-heading">
                <FileText size={27} />

                <h2>Recent Activity</h2>

                <button
                  type="button"
                  onClick={viewAllActivity}
                >
                  View All <ChevronRight size={17} />
                </button>
              </div>

              <div className="registrar-activity-list">
                {activityList.length ? (
                  activityList.slice(0, 4).map((item, index) => (
                    <button
                      className="registrar-activity-row"
                      type="button"
                      key={item.id ?? `${item.title}-${index}`}
                      onClick={() => openDetails(item, "activity")}
                    >
                      <span className="registrar-row-icon">
                        <FileText size={23} />
                      </span>

                      <span className="registrar-row-copy">
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>

                      <time>{item.date || "Recent activity"}</time>

                      <ChevronRight
                        className="registrar-row-chevron"
                        size={19}
                      />
                    </button>
                  ))
                ) : (
                  <p className="registrar-empty-state">
                    No recent activity available.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="registrar-right-column">

            {/* NOTIFICATIONS */}
            <section className="registrar-notifications-card">
              <div className="registrar-section-heading">
                <Bell size={25} />
                <h2>Updates &amp; Notifications</h2>
              </div>

              <div className="registrar-notification-list">
                {notificationList.length ? (
                  notificationList.map((item, index) => (
                    <button
                      className="registrar-notification-row"
                      type="button"
                      key={item.id ?? `${item.title}-${index}`}
                      onClick={() =>
                        openDetails(item, "notification")
                      }
                    >
                      <span className="registrar-notification-icon">
                        <NotificationIcon icon={item.icon} />
                      </span>

                      <span className="registrar-row-copy">
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>

                      <ChevronRight size={18} />
                    </button>
                  ))
                ) : (
                  <p className="registrar-empty-state">
                    No new notifications.
                  </p>
                )}
              </div>
            </section>

            {/* REGISTRAR INFORMATION */}
            <section className="registrar-information-card">
              <button
                type="button"
                className="registrar-information-heading"
                onClick={openRegistrarInfo}
              >
                <Info size={27} />
                <span>Registrar Information</span>
                <ChevronRight size={19} />
              </button>

              <div className="registrar-information-content">
                <div>
                  <span>Registrar Personnel</span>
                  <strong>{data.registrarName}</strong>
                </div>

                <div>
                  <span>Office Hours</span>
                  <strong>{data.officeHours}</strong>
                </div>

                <div>
                  <span>School Year</span>
                  <strong>{data.schoolYear}</strong>
                </div>
              </div>
            </section>

            {/* UPCOMING ENROLLMENT */}
            <section className="registrar-enrollment-card">
              <div className="registrar-enrollment-icon">
                <CalendarDays size={29} />
              </div>

              <div>
                <h2>Upcoming Enrollment</h2>
                <p>{data.nextEnrollmentDate}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* TOAST MESSAGE */}
      {message && (
        <div className="registrar-toast" role="status">
          <span>{message}</span>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedItem && (
        <div
          className="registrar-modal-overlay"
          onClick={closeDetails}
        >
          <section
            className="registrar-details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registrar-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="registrar-modal-header">
              <div>
                <span>
                  {selectedType === "activity"
                    ? "ACTIVITY DETAILS"
                    : selectedType === "information"
                    ? "OFFICE DETAILS"
                    : "NOTIFICATION"}
                </span>

                <h2 id="registrar-modal-title">
                  {selectedItem.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeDetails}
                aria-label="Close details"
              >
                <X size={22} />
              </button>
            </div>

            <p className="registrar-modal-content">
              {selectedItem.content ||
                selectedItem.description ||
                "No additional details available."}
            </p>

            {selectedItem.date && (
              <small className="registrar-modal-date">
                {selectedItem.date}
              </small>
            )}

            <button
              type="button"
              className="registrar-modal-close"
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
