
import { useState } from "react";
import {
  UserCircle,
  Monitor,
  FileText,
  Contact,
  IdCard,
  MapPin,
  X,
} from "lucide-react";

import StudentNavbar from "../../../components/StudentNavbar";
import "../../../styles/Portal_Student_Profile.css";

function StudentProfile({
  student: initialStudent,
  onLogout,
  onNavigate,
}) {
  const [student, setStudent] = useState(
    initialStudent || {
      fullName: "Rafael I. Pimpolio",
      lrn: "113009070080",
      contact: "09676767676",
      gradeSection: "9 - Bayani Agbayani",
      adviser: "Jessa Manalo",
      address: "Manguiring, Calabanga, Camarines Sur",
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
      <StudentNavbar
        activePage="Profile"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="student-profile-main">
        <header className="student-profile-header">
          <h1>Student Profile</h1>
          <p>View and manage your personal information</p>
        </header>

        <section className="student-personal-card">
          <div className="student-personal-card-header">
            <h2>Personal Information</h2>
          </div>

          <div className="student-personal-card-body">
            <div className="student-profile-avatar-section">
              <div className="student-profile-avatar">
                <UserCircle size={105} strokeWidth={-1.5} />
              </div>

              <h2>Hello, {student.fullName.split(" ")[0]}!</h2>
            </div>

            <div className="student-profile-divider"></div>

            <div className="student-profile-information">
              <div className="student-profile-info-column">
                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <UserCircle />
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
                    <span>LRN</span>
                    <p>{student.lrn}</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <Contact />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Contact</span>
                    <p>{student.contact}</p>
                  </div>
                </div>
              </div>

              <div className="student-profile-info-column">
                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <Monitor />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Grade &amp; Section</span>
                    <p>{student.gradeSection}</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <IdCard />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Adviser</span>
                    <p>{student.adviser}</p>
                  </div>
                </div>

                <div className="student-profile-info-item">
                  <div className="student-profile-info-icon">
                    <MapPin />
                  </div>

                  <div className="student-profile-info-text">
                    <span>Address</span>
                    <p>{student.address}</p>
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
                <label>LRN</label>
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
                <label>Grade &amp; Section</label>
                <input
                  type="text"
                  name="gradeSection"
                  value={editedStudent.gradeSection}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="student-profile-form-group">
                <label>Adviser</label>
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
