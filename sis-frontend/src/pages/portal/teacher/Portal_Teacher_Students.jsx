import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Pencil,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import TeacherNavbar from "../../../components/TeacherNavbar";
import "../../../styles/Portal_Teacher_Students.css";

const initialStudents = [
  { id: 1, name: "Rafael Pimpolio", lrn: "113009070080", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 2, name: "John Michael Santos", lrn: "113009070081", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 3, name: "Angela Cruz", lrn: "113009070082", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 4, name: "Mark Joseph Reyes", lrn: "113009070083", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 5, name: "Sofia Garcia", lrn: "113009070084", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 6, name: "Daniel Mendoza", lrn: "113009070085", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 7, name: "Maria Lopez", lrn: "113009070086", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 8, name: "Gabriel Torres", lrn: "113009070087", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 9, name: "Isabella Flores", lrn: "113009070088", grade: "Grade 9", section: "Bayani Agbayani" },
  { id: 10, name: "Nathaniel Ramos", lrn: "113009070089", grade: "Grade 9", section: "Bayani Agbayani" },
];

export default function PortalTeacherStudents({
  students = initialStudents,
  onLogout,
  onRefresh,
}) {
  const navigate = useNavigate();

  const [studentList] = useState(students);
  const [search, setSearch] = useState("");
  const [selectedSection, setSelectedSection] = useState("All Section");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStudent, setViewStudent] = useState(null);

  const studentsPerPage = 10;

  const sections = useMemo(
    () => [...new Set(studentList.map((student) => student.section))],
    [studentList]
  );

  const grades = useMemo(
    () => [...new Set(studentList.map((student) => student.grade))],
    [studentList]
  );

  const filteredStudents = useMemo(() => {
    return studentList.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.lrn.includes(search);

      const matchesSection =
        selectedSection === "All Section" ||
        student.section === selectedSection;

      const matchesGrade =
        selectedGrade === "All Grades" ||
        student.grade === selectedGrade;

      return matchesSearch && matchesSection && matchesGrade;
    });
  }, [studentList, search, selectedSection, selectedGrade]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );

  const startIndex = (currentPage - 1) * studentsPerPage;

  const displayedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handleRefresh = () => {
    setSearch("");
    setSelectedSection("All Section");
    setSelectedGrade("All Grades");
    setCurrentPage(1);
    onRefresh?.();
  };

  const openGradingSystem = (student) => {
    navigate("/Portal_Teacher_Grade", {
      state: { student },
    });
  };

  return (
    <div className="teacher-students-layout">
      <TeacherNavbar activePage="students" onLogout={onLogout} />

      <main className="teacher-students-main">
        <div className="teacher-students-content">
          <header className="teacher-students-header">
            <h1>Grading System</h1>
            <p>School Year 2026-2027</p>
          </header>

          <section className="teacher-students-panel">
            <div className="teacher-students-toolbar">
              <div className="teacher-students-search">
                <Search size={19} />
                <input
                  type="text"
                  placeholder="Search student name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <select
                value={selectedSection}
                onChange={(event) => {
                  setSelectedSection(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Section</option>
                {sections.map((section) => (
                  <option key={section}>{section}</option>
                ))}
              </select>

              <select
                value={selectedGrade}
                onChange={(event) => {
                  setSelectedGrade(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Grades</option>
                {grades.map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>

              <button
                type="button"
                className="teacher-students-refresh"
                onClick={handleRefresh}
              >
                <RefreshCw size={15} />
                Refresh
              </button>
            </div>

            <h2 className="teacher-students-list-title">STUDENT LIST</h2>

            <div className="teacher-students-table-wrapper">
              <table className="teacher-students-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>LRN</th>
                    <th>Grade &amp; Section</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedStudents.length > 0 ? (
                    displayedStudents.map((student, index) => (
                      <tr key={student.id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.lrn}</td>
                        <td>
                          {student.grade} - {student.section}
                        </td>
                        <td>
                          <div className="teacher-students-actions">
                            <button
                              type="button"
                              className="teacher-students-action-button"
                              onClick={() => setViewStudent(student)}
                            >
                              <Eye size={17} />
                              View
                            </button>

                            <button
                              type="button"
                              className="teacher-students-action-button"
                              onClick={() => openGradingSystem(student)}
                            >
                              <Pencil size={16} />
                              Grade
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="teacher-students-empty">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="teacher-students-footer">
              <span>
                Showing {filteredStudents.length === 0 ? 0 : startIndex + 1}-
                {Math.min(
                  startIndex + studentsPerPage,
                  filteredStudents.length
                )}{" "}
                out of {filteredStudents.length} Students
              </span>

              <div className="teacher-students-pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  <ChevronLeft size={16} />
                </button>

                <span>
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {viewStudent && (
        <div
          className="teacher-students-modal-overlay"
          onClick={() => setViewStudent(null)}
        >
          <div
            className="teacher-students-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="teacher-students-modal-header">
              <h2>Student Information</h2>
              <button type="button" onClick={() => setViewStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="teacher-students-modal-details">
              <div>
                <span>Student Name</span>
                <strong>{viewStudent.name}</strong>
              </div>
              <div>
                <span>LRN</span>
                <strong>{viewStudent.lrn}</strong>
              </div>
              <div>
                <span>Grade Level</span>
                <strong>{viewStudent.grade}</strong>
              </div>
              <div>
                <span>Section</span>
                <strong>{viewStudent.section}</strong>
              </div>
            </div>

            <div className="teacher-students-modal-actions">
              <button type="button" onClick={() => setViewStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}