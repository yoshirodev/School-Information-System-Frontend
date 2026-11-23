
import { useState } from "react";
import {
  UserRound,
  Monitor,
  FileText,
  Contact,
  IdCard,
  MapPin,
  X,
} from "lucide-react";

import TeacherNavbar from "../../../components/TeacherNavbar";
import "../../../styles/Portal_Student_Profile.css";

function StudentProfile({
  student: initialStudent,
  onLogout,
  onNavigate,
}) {
  const [student, setStudent] = useState(
    initialStudent || {
    fullName: "Kyle Damerick Asor",
    position: "Teacher III",
    advisoryClass: "9 - Bayani Agbayani",
    schoolYear: "2026-2027",
    }
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);

  const handleEdit = () => {
    setEditedStudent({ ...student });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setStudent({ ...editedStudent });
    setShowEditModal(false);
  };

  return (
    <div className="student-profile-layout">
      <TeacherNavbar
        activePage="Profile"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="student-profile-main">
        <header className="student-profile-header">
          <h1>Teacher Profile</h1>
          <p>View and manage your personal information</p>
        </header>

        <section className="student-personal-card">
          <div className="student-personal-card-header">
            <h2>Personal Information</h2>
          </div>

          <div className="student-personal-card-body">
            <div className="student-profile-avatar-section">
              <div className="student-profile-avatar">
                <UserRound size={105} strokeWidth={1.5} />
              </div>

              <h2>Hello, {student.fullName.split(" ")[0]}!</h2>
            </div>

            <div className="student-profile-divider"></div>

            <div className="student-profile-information">
              <div className="student-profile-info-column">
                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <UserRound />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Student Name</span>
                    <p>{student.fullName}</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <FileText />
                  </div>

                  <div className="student-profile-info-text">
                    <span>DepEd Email</span>
                    <p>kyledamerick.asor@deped.gov.ph</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <Contact />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Contact</span>
                    <p>09696969696</p>
                  </div>
                </div>
              </div>

              <div className="student-profile-info-column">
                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <Monitor />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Advisory Class</span>
                    <p>9 - Bayani Agbayani</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <IdCard />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Position Title</span>
                    <p>Teacher III</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <MapPin />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Address</span>
                    <p>Naga City, Calabanga,
Camarines Sur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <button
          className="student-profile-edit-button"
          onClick={handleEdit}
        >
          Edit Information
        </button>
      </main>

      {showEditModal && (
        <div
          className="student-profile-modal-overlay"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="student-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="student-profile-modal-header">
              <h2>Edit Personal Information</h2>

              <button
                className="student-profile-modal-close"
                onClick={() => setShowEditModal(false)}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="student-profile-form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={editedStudent.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="student-profile-form-group">
                <label>DepEd Email</label>
                <input
                  type="text"
                  name="lrn"
                  value={editedStudent.lrn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="student-profile-form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={editedStudent.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="student-profile-form-group">
                <label>Advisory Class</label>
                <input
                  type="text"
                  name="gradeSection"
                  value={editedStudent.gradeSection}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="student-profile-form-group">
                <label>Position Title</label>
                <input
                  type="text"
                  name="adviser"
                  value={editedStudent.adviser}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="student-profile-form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={editedStudent.address}
                  onChange={handleChange}
                  rows="2"
                  required
                />
              </div>

              <div className="student-profile-modal-actions">
                <button
                  type="button"
                  className="student-profile-cancel-button"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="student-profile-save-button"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
