
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import StudentNavbar from "../../../components/StudentNavbar";
import "../../../styles/Portal_Student_Subjects.css";

const schoolSubjects = {
  "2026-2027": [
    {
      subject: "Filipino",
      teacher: "Jose Manalo",
      schedule: "07:30AM-08:30AM",
      subjectId: "FIL-7",
    },
    {
      subject: "English",
      teacher: "Jose Manalo",
      schedule: "08:30AM-09:30AM",
      subjectId: "ENG-7",
    },
    {
      subject: "Mathematics",
      teacher: "Jose Manalo",
      schedule: "09:30AM-10:30AM",
      subjectId: "MATH-7",
    },
    {
      subject: "Science",
      teacher: "Jose Manalo",
      schedule: "10:30AM-11:30AM",
      subjectId: "SCI-7",
    },
    {
      subject: "Araling Panlipunan",
      teacher: "Jose Manalo",
      schedule: "12:30PM-01:30PM",
      subjectId: "AP-7",
    },
    {
      subject: "Edukasyon na Pagpapakatao",
      teacher: "Jose Manalo",
      schedule: "01:30PM-02:30PM",
      subjectId: "ESP-7",
    },
    {
      subject: "MAPEH",
      teacher: "Jose Manalo",
      schedule: "02:30PM-03:30PM",
      subjectId: "PG-7",
    },
    {
      subject: "TLE",
      teacher: "Jose Manalo",
      schedule: "03:30PM-04:30PM",
      subjectId: "TLE-7",
    },
  ],
  "2025-2026": [
    {
      subject: "Filipino",
      teacher: "Jose Manalo",
      schedule: "07:30AM-08:30AM",
      subjectId: "FIL-6",
    },
    {
      subject: "English",
      teacher: "Jose Manalo",
      schedule: "08:30AM-09:30AM",
      subjectId: "ENG-6",
    },
    {
      subject: "Mathematics",
      teacher: "Jose Manalo",
      schedule: "09:30AM-10:30AM",
      subjectId: "MATH-6",
    },
    {
      subject: "Science",
      teacher: "Jose Manalo",
      schedule: "10:30AM-11:30AM",
      subjectId: "SCI-6",
    },
  ],
};

function PortalStudentSubjects({
  student,
  onLogout,
}) {
  const [schoolYear, setSchoolYear] = useState("2026-2027");

  const studentInfo = {
    fullName: student?.fullName || "Rafael Pimpolio",
    lrn: student?.lrn || "113009070080",
    gradeSection: student?.gradeSection || "9 - Bayani Agbayani",
    adviser: student?.adviser || "Jose Manalo",
  };

  const subjects = schoolSubjects[schoolYear] || [];

  return (
    <div className="student-subjects-layout">
      <StudentNavbar
        activePage="subjects"
        onLogout={onLogout}
      />

      <main className="student-subjects-main">
        <header className="student-subjects-header">
          <h1>Subjects</h1>
          <p>School Year {schoolYear}</p>
        </header>

        <section className="student-subjects-card">
          <div className="student-subjects-information">
            <div className="student-subjects-info-item">
              <span>STUDENT NAME</span>
              <strong>{studentInfo.fullName}</strong>
            </div>

            <div className="student-subjects-info-item">
              <span>LRN</span>
              <strong>{studentInfo.lrn}</strong>
            </div>

            <div className="student-subjects-info-item">
              <span>GRADES AND SECTION</span>
              <strong>{studentInfo.gradeSection}</strong>
            </div>

            <div className="student-subjects-info-item">
              <span>ADVISER</span>
              <strong>{studentInfo.adviser}</strong>
            </div>
          </div>

          <div className="student-subjects-controls">
            <div className="student-subjects-select-wrapper">
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

          <div className="student-subjects-table-wrapper">
            <table className="student-subjects-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Schedule</th>
                  <th>Subject ID</th>
                </tr>
              </thead>

              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((item) => (
                    <tr key={item.subjectId}>
                      <td>{item.subject}</td>
                      <td>{item.teacher}</td>
                      <td>{item.schedule}</td>
                      <td>{item.subjectId}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="student-subjects-empty">
                      No subjects available for this school year.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PortalStudentSubjects;
