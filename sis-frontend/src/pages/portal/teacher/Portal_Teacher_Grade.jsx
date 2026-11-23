import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Download, RotateCcw, Save } from "lucide-react";

import TeacherNavbar from "../../../components/TeacherNavbar";
import "../../../styles/Portal_Teacher_Grade.css";

const initialSubjects = [
  { subject: "Filipino", term1: 85, term2: 87, term3: 86, final: 86 },
  { subject: "English", term1: 82, term2: 84, term3: 83, final: 83 },
  { subject: "Mathematics", term1: 78, term2: 80, term3: 79, final: 79 },
  { subject: "Science", term1: 80, term2: 82, term3: 81, final: 81 },
  { subject: "Araling Panlipunan", term1: 88, term2: 89, term3: 90, final: 89 },
  { subject: "Edukasyon na Pagpapakatao", term1: 90, term2: 91, term3: 92, final: 91 },
  { subject: "MAPEH", term1: 87, term2: 88, term3: 89, final: 88 },
  { subject: "TLE", term1: 84, term2: 85, term3: 86, final: 85 },
];

export default function PortalTeacherGrade({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state?.student || {
    name: "Rafael Pimpolio",
    lrn: "113009070080",
    grade: "Grade 9",
    section: "Bayani Agbayani",
  };

  const [subjects, setSubjects] = useState(initialSubjects);
  const [originalSubjects, setOriginalSubjects] = useState(initialSubjects);
  const [editing, setEditing] = useState(false);

  const updateGrade = (index, field, value) => {
    setSubjects((previous) =>
      previous.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
  };

  const saveChanges = () => {
    setOriginalSubjects(subjects);
    setEditing(false);
    alert("Grades saved successfully.");
  };

  const undoChanges = () => {
    setSubjects(originalSubjects);
    setEditing(false);
  };

  const average =
    subjects.reduce((total, subject) => total + Number(subject.final), 0) /
    subjects.length;

  return (
    <div className="teacher-grade-layout">
      <TeacherNavbar activePage="students" onLogout={onLogout} />

      <main className="teacher-grade-main">
        <header className="teacher-grade-header">
          <h1>Grading System</h1>
          <p>School Year 2026-2027</p>
        </header>

        <section className="teacher-grade-panel">
          <div className="teacher-grade-student-info">
            <div>
              <span>STUDENT NAME</span>
              <strong>{student.name}</strong>
            </div>
            <div>
              <span>LRN</span>
              <strong>{student.lrn}</strong>
            </div>
            <div>
              <span>GRADES AND SECTION</span>
              <strong>{student.grade} - {student.section}</strong>
            </div>
            <div>
              <span>ADVISER</span>
              <strong>Jose Manalo</strong>
            </div>
          </div>

          <div className="teacher-grade-controls">
            <button
              type="button"
              className="teacher-grade-clearance-button"
              onClick={() =>
                navigate("/Portal_Teacher_Clearance", {
                  state: { student },
                })
              }
            >
              Clearance
            </button>

            <div className="teacher-grade-right-buttons">
              <button
                type="button"
                onClick={() => setEditing((previous) => !previous)}
              >
                <Pencil size={14} />
                {editing ? "Stop Editing" : "Edit Grades"}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
              >
                <Download size={14} />
                Download SF9
              </button>
            </div>
          </div>

          <div className="teacher-grade-table-wrapper">
            <table className="teacher-grade-table">
              <thead>
                <tr>
                  <th>Learning Area</th>
                  <th>Term 1</th>
                  <th>Term 2</th>
                  <th>Term 3</th>
                  <th>Final Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject.subject}>
                    <td>{subject.subject}</td>

                    {["term1", "term2", "term3"].map((term) => (
                      <td key={term}>
                        {editing ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={subject[term]}
                            onChange={(event) =>
                              updateGrade(index, term, event.target.value)
                            }
                          />
                        ) : (
                          subject[term]
                        )}
                      </td>
                    ))}

                    <td>
                      {editing ? (
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={subject.final}
                          onChange={(event) =>
                            updateGrade(index, "final", event.target.value)
                          }
                        />
                      ) : (
                        subject.final
                      )}
                    </td>

                    <td>
                      {Number(subject.final) >= 75 ? "Passed" : "Failed"}
                    </td>
                  </tr>
                ))}

                <tr className="teacher-grade-average-row">
                  <td>General Average</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{average.toFixed(0)}</td>
                  <td>{average >= 75 ? "Passed" : "Failed"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="teacher-grade-footer">
            <button
              type="button"
              className="teacher-grade-back-button"
              onClick={() => navigate("/Portal_Teacher_Students")}
            >
              Back
            </button>

            <div>
              <button
                type="button"
                className="teacher-grade-undo-button"
                onClick={undoChanges}
              >
                <RotateCcw size={15} />
                Undo
              </button>

              <button
                type="button"
                className="teacher-grade-save-button"
                onClick={saveChanges}
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}