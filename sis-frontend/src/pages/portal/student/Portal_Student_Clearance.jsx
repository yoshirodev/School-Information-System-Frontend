
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import StudentNavbar from "../../../components/StudentNavbar";
import "../../../styles/Portal_Student_Clearance.css";

const clearanceRecords = {
  "2026-2027": [
    { subject: "Filipino", teacher: "Jose Manalo", status: "Passed", subjectId: "FIL-7", remarks: "NOT CLEARED" },
    { subject: "English", teacher: "Jose Manalo", status: "Passed", subjectId: "ENG-7", remarks: "NOT CLEARED" },
    { subject: "Mathematics", teacher: "Jose Manalo", status: "Failed", subjectId: "MATH-7", remarks: "NOT CLEARED" },
    { subject: "Science", teacher: "Jose Manalo", status: "Passed", subjectId: "SCI-7", remarks: "NOT CLEARED" },
    { subject: "Araling Panlipunan", teacher: "Jose Manalo", status: "Passed", subjectId: "AP-7", remarks: "NOT CLEARED" },
    { subject: "Edukasyon na Pagpapakatao", teacher: "Jose Manalo", status: "Passed", subjectId: "ESP-7", remarks: "NOT CLEARED" },
    { subject: "MAPEH", teacher: "Jose Manalo", status: "Passed", subjectId: "PG-7", remarks: "NOT CLEARED" },
    { subject: "TLE", teacher: "Jose Manalo", status: "Passed", subjectId: "TLE-7", remarks: "NOT CLEARED" },
  ],
  "2025-2026": [
    { subject: "Filipino", teacher: "Jose Manalo", status: "Passed", subjectId: "FIL-6", remarks: "CLEARED" },
    { subject: "English", teacher: "Jose Manalo", status: "Passed", subjectId: "ENG-6", remarks: "CLEARED" },
    { subject: "Mathematics", teacher: "Jose Manalo", status: "Passed", subjectId: "MATH-6", remarks: "CLEARED" },
    { subject: "Science", teacher: "Jose Manalo", status: "Passed", subjectId: "SCI-6", remarks: "CLEARED" },
  ],
};

function PortalStudentClearance({ student, onLogout }) {
  const [schoolYear, setSchoolYear] = useState("2026-2027");

  const studentInfo = {
    fullName: student?.fullName || "Rafael Pimpolio",
    lrn: student?.lrn || "113009070080",
    gradeSection: student?.gradeSection || "9 - Bayani Agbayani",
    adviser: student?.adviser || "Jose Manalo",
  };

  const records = clearanceRecords[schoolYear] || [];

  return (
    <div className="student-clearance-layout">
      <StudentNavbar
        activePage="clearance"
        onLogout={onLogout}
      />

      <main className="student-clearance-main">
        <header className="student-clearance-header">
          <h1>Clearance</h1>
          <p>School Year {schoolYear}</p>
        </header>

        <section className="student-clearance-card">
          {/* Student Information */}
          <div className="student-clearance-information">
            <div className="student-clearance-info-item">
              <span>STUDENT NAME</span>
              <strong>{studentInfo.fullName}</strong>
            </div>

            <div className="student-clearance-info-item">
              <span>LRN</span>
              <strong>{studentInfo.lrn}</strong>
            </div>

            <div className="student-clearance-info-item">
              <span>GRADES AND SECTION</span>
              <strong>{studentInfo.gradeSection}</strong>
            </div>

            <div className="student-clearance-info-item">
              <span>ADVISER</span>
              <strong>{studentInfo.adviser}</strong>
            </div>
          </div>

          {/* School Year Selector */}
          <div className="student-clearance-controls">
            <div className="student-clearance-select-wrapper">
              <select
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                aria-label="Select school year"
              >
                <option value="2026-2027">2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          {/* Clearance Table */}
          <div className="student-clearance-table-wrapper">
            <table className="student-clearance-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Status</th>
                  <th>Subject ID</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {records.length > 0 ? (
                  records.map((item) => (
                    <tr key={item.subjectId}>
                      <td>{item.subject}</td>
                      <td>{item.teacher}</td>
                      <td>{item.status}</td>
                      <td>{item.subjectId}</td>
                      <td>{item.remarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="student-clearance-empty">
                      No clearance records available for this school year.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Clearance Requirements */}
          <div className="student-clearance-requirements">
            <h3>Clearance Completion Requirements (by Status)</h3>

            <ul>
              <li>
                <strong>Passed (P):</strong> No further action is required
                for this subject area. The department head will officially
                approve the clearance step based on final assessment.
              </li>

              <li>
                <strong>Failed (F):</strong> A 'Final review required' or a
                specific action (e.g., 'Retest scheduled' - refer to table)
                is needed. Please contact the subject Teacher, directly
                during consultation hours.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PortalStudentClearance;
