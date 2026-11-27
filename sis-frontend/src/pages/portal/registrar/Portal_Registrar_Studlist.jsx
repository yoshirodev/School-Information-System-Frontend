
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  UserPlus,
} from "lucide-react";

import RegistrarNavbar from "../../../components/RegistrarNavbar";

const initialStudents = [
  { id: 1, name: "Juan Dela Cruz", lrn: "123456789001", grade: "Grade 7", section: "Mabini", birthday: "2013-05-12", sex: "Male", address: "Manguiring, Calabanga, Camarines Sur", guardian: "Pedro Dela Cruz", contact: "09123456789" },
  { id: 2, name: "Maria Santos", lrn: "123456789002", grade: "Grade 7", section: "Rizal", birthday: "2013-08-21", sex: "Female", address: "San Bernardino, Calabanga, Camarines Sur", guardian: "Ana Santos", contact: "09123456780" },
  { id: 3, name: "Jose Reyes", lrn: "123456789003", grade: "Grade 8", section: "Bonifacio", birthday: "2012-03-15", sex: "Male", address: "Sagrada, Calabanga, Camarines Sur", guardian: "Ramon Reyes", contact: "09123456781" },
  { id: 4, name: "Angela Garcia", lrn: "123456789004", grade: "Grade 8", section: "Mabini", birthday: "2012-11-02", sex: "Female", address: "San Roque, Calabanga, Camarines Sur", guardian: "Liza Garcia", contact: "09123456782" },
  { id: 5, name: "Mark Fernandez", lrn: "123456789005", grade: "Grade 9", section: "Rizal", birthday: "2011-06-18", sex: "Male", address: "Manguiring, Calabanga, Camarines Sur", guardian: "Mario Fernandez", contact: "09123456783" },
  { id: 6, name: "Sofia Mendoza", lrn: "123456789006", grade: "Grade 9", section: "Bonifacio", birthday: "2011-09-25", sex: "Female", address: "Poblacion, Calabanga, Camarines Sur", guardian: "Rosa Mendoza", contact: "09123456784" },
  { id: 7, name: "Carlo Ramos", lrn: "123456789007", grade: "Grade 10", section: "Mabini", birthday: "2010-01-10", sex: "Male", address: "Dominorog, Calabanga, Camarines Sur", guardian: "Carlos Ramos", contact: "09123456785" },
  { id: 8, name: "Isabella Cruz", lrn: "123456789008", grade: "Grade 10", section: "Rizal", birthday: "2010-04-30", sex: "Female", address: "San Bernardino, Calabanga, Camarines Sur", guardian: "Elena Cruz", contact: "09123456786" },
  { id: 9, name: "Daniel Torres", lrn: "123456789009", grade: "Grade 11", section: "Mabini", birthday: "2009-07-14", sex: "Male", address: "Manguiring, Calabanga, Camarines Sur", guardian: "Roberto Torres", contact: "09123456787" },
  { id: 10, name: "Camille Flores", lrn: "123456789010", grade: "Grade 11", section: "Rizal", birthday: "2009-12-05", sex: "Female", address: "Sagrada, Calabanga, Camarines Sur", guardian: "Marites Flores", contact: "09123456788" },
  { id: 11, name: "Nathan Villanueva", lrn: "123456789011", grade: "Grade 12", section: "Bonifacio", birthday: "2008-02-19", sex: "Male", address: "Poblacion, Calabanga, Camarines Sur", guardian: "Rogelio Villanueva", contact: "09123456789" },
  { id: 12, name: "Andrea Bautista", lrn: "123456789012", grade: "Grade 12", section: "Mabini", birthday: "2008-10-11", sex: "Female", address: "San Roque, Calabanga, Camarines Sur", guardian: "Teresa Bautista", contact: "09123456790" },
];

const PAGE_SIZE = 10;
const STORAGE_KEY = "registrarStudentRecords";

const gradeOptions = [
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const emptyForm = {
  name: "",
  lrn: "",
  grade: "Grade 7",
  section: "",
  birthday: "",
  sex: "Male",
  address: "",
  guardian: "",
  contact: "",
};

const inputClass =
  "h-10 w-full box-border rounded-[5px] border border-[#cccccc] bg-white px-[11px] text-[13px] text-[#222222] outline-none focus:border-[#2d75d9]";

export default function RegistrarStudentList() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [search, setSearch] = useState("");
  const [selectedSection, setSelectedSection] = useState("All Section");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (error) {
      console.error("Unable to save student records:", error);
    }
  }, [students]);

  const sections = useMemo(
    () =>
      [...new Set(students.map((student) => student.section).filter(Boolean))].sort(),
    [students]
  );

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.lrn.includes(searchValue);

      const matchesSection =
        selectedSection === "All Section" ||
        student.section === selectedSection;

      const matchesGrade =
        selectedGrade === "All Grades" ||
        student.grade === selectedGrade;

      return matchesSearch && matchesSection && matchesGrade;
    });
  }, [students, search, selectedSection, selectedGrade]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / PAGE_SIZE)
  );

  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleRefresh = () => {
    setSearch("");
    setSelectedSection("All Section");
    setSelectedGrade("All Grades");
    setCurrentPage(1);
  };

  const handleDownload = (student) => {
    const headers = [
      "Student Name",
      "LRN",
      "Grade",
      "Section",
      "Birthday",
      "Sex",
      "Address",
      "Guardian",
      "Contact Number",
    ];

    const values = [
      student.name,
      student.lrn,
      student.grade,
      student.section,
      student.birthday || "",
      student.sex || "",
      student.address || "",
      student.guardian || "",
      student.contact || "",
    ];

    const csv = [headers, values]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${student.name.replace(/\s+/g, "_")}_record.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddStudent = () => {
    setForm(emptyForm);
    setFormError("");
    setShowAddModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "lrn"
          ? value.replace(/\D/g, "").slice(0, 12)
          : name === "contact"
            ? value.replace(/\D/g, "").slice(0, 12)
            : value,
    }));
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.lrn.trim() || !form.section.trim()) {
      setFormError("Please complete the student name, LRN, and section.");
      return;
    }

    if (form.lrn.length !== 12) {
      setFormError("LRN must contain exactly 12 digits.");
      return;
    }

    if (students.some((student) => student.lrn === form.lrn)) {
      setFormError("This LRN is already registered.");
      return;
    }

    const newStudent = {
      ...form,
      id: Date.now(),
      name: form.name.trim(),
      section: form.section.trim(),
      address: form.address.trim(),
      guardian: form.guardian.trim(),
      contact: form.contact.trim(),
    };

    setStudents((previous) => [newStudent, ...previous]);

    setSearch("");
    setSelectedSection("All Section");
    setSelectedGrade("All Grades");
    setCurrentPage(1);

    setShowAddModal(false);
    setForm(emptyForm);
  };

  return (
    <div className="min-h-screen w-full box-border bg-white font-['Poppins',sans-serif]">
      <RegistrarNavbar activePage="students" />

      {/* Main Layout */}
      <main className="flex min-h-screen w-full box-border justify-center bg-white px-3 pb-[25px] pt-[60px] md:ml-[195px] md:w-[calc(100%-195px)] md:px-6 md:pb-[30px] md:pt-3">
        <div className="w-full min-w-0 max-w-[1250px] md:w-[90%]">

          {/* Header */}
          <header className="mb-5 ml-[3px] md:ml-[17px]">
            <h1 className="m-0 text-[24px] font-bold leading-[1.35] text-[#080808] md:text-[29px]">
              Student List
            </h1>
            <p className="m-0 text-[15px] leading-[1.4] text-[#111111] md:text-[18px]">
              View and manage student records
            </p>
          </header>

          {/* Main Panel */}
          <section className="min-h-[660px] w-full box-border rounded-lg border border-[#6b9cff] bg-white p-2 md:px-3 md:pb-3 md:pt-[10px]">

            {/* Toolbar */}
            <div className="flex min-h-[78px] flex-wrap items-center justify-center gap-3 rounded-[7px] border border-[#6b9cff] px-3 py-3 md:justify-between md:gap-[18px] md:px-[22px]">

              {/* Search */}
              <div className="flex h-[39px] w-full min-w-0 items-center gap-2 rounded-[20px] border border-[#2d75d9] bg-[#f1f5fc] px-[13px] text-[#0056b3] md:w-[38%]">
                <Search size={17} className="shrink-0" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search student name or LRN"
                  className="w-full min-w-0 border-none bg-transparent text-[12px] text-[#222222] outline-none placeholder:text-[#0056b3]"
                />
              </div>

              {/* Section Filter */}
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[39px] min-w-[105px] flex-1 cursor-pointer rounded-[18px] border border-[#2d75d9] bg-white px-[10px] text-[11px] text-[#0056b3] outline-none md:w-[116px] md:flex-none md:px-[13px]"
              >
                <option value="All Section">All Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>

              {/* Grade Filter */}
              <select
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[39px] min-w-[105px] flex-1 cursor-pointer rounded-[18px] border border-[#2d75d9] bg-white px-[10px] text-[11px] text-[#0056b3] outline-none md:w-[116px] md:flex-none md:px-[13px]"
              >
                <option value="All Grades">All Grades</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>

              {/* Add Student */}
              <button
                type="button"
                onClick={handleAddStudent}
                className="flex h-[39px] min-w-[105px] flex-1 items-center justify-center gap-[7px] rounded-[18px] border border-[#1d64bd] bg-[#2d75d9] text-[12px] text-white transition hover:bg-[#185ebd] md:w-[116px] md:flex-none"
              >
                <Plus size={16} />
                Add Student
              </button>

            </div>

            {/* Student List Heading */}
            <div className="mb-[10px] mt-[17px] flex items-center justify-between gap-3 px-[5px]">
              <h2 className="m-0 text-[20px] font-bold text-[#2d75d9] md:text-[23px]">
                Students
              </h2>

              <button
                type="button"
                onClick={handleRefresh}
                className="flex h-[39px] w-[105px] shrink-0 items-center justify-center gap-[7px] rounded-[18px] border border-[#1d64bd] bg-[#2d75d9] text-[12px] text-white transition hover:bg-[#185ebd] md:w-[116px]"
              >
                <RefreshCw size={15} />
                Refresh
              </button>
            </div>

            {/* Student Table */}
            <div className="w-full overflow-x-auto rounded-b-[7px]">
              <table className="w-full min-w-[720px] table-fixed border-collapse bg-[#2d75d9] text-white">
                <thead>
                  <tr>
                    <th className="h-10 w-[6%] px-[10px] pl-[18px] text-left text-[12px] font-semibold">
                      #
                    </th>
                    <th className="h-10 w-[19%] px-[10px] text-center text-[12px] font-semibold">
                      Student Name
                    </th>
                    <th className="h-10 w-[19%] px-[10px] text-center text-[12px] font-semibold">
                      LRN
                    </th>
                    <th className="h-10 w-[27%] px-[10px] text-center text-[12px] font-semibold">
                      Grade &amp; Section
                    </th>
                    <th className="h-10 w-[29%] px-[10px] text-center text-[12px] font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {displayedStudents.length > 0 ? (
                    displayedStudents.map((student, index) => (
                      <tr
                        key={student.id}
                        className="bg-[#2d75d9] transition hover:bg-[#2469ca]"
                      >
                        <td className="h-[43px] px-[10px] pl-[18px] text-left align-middle text-[12px] font-medium">
                          {(currentPage - 1) * PAGE_SIZE + index + 1}
                        </td>

                        <td className="h-[43px] px-[10px] text-center align-middle text-[12px] font-medium">
                          {student.name}
                        </td>

                        <td className="h-[43px] px-[10px] text-center align-middle text-[12px] font-medium">
                          {student.lrn}
                        </td>

                        <td className="h-[43px] px-[10px] text-center align-middle text-[12px] font-medium">
                          {student.grade} - {student.section}
                        </td>

                        <td className="h-[43px] px-[10px] text-center align-middle">
                          <div className="flex items-center justify-center gap-2 md:gap-4">
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(student)}
                              title="View student"
                              aria-label={`View ${student.name}`}
                              className="flex h-[30px] w-[92px] items-center justify-center gap-[9px] rounded-[18px] bg-white text-[12px] text-[#0056b3] hover:bg-[#e5efff]"
                            >
                              <Eye size={15} />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDownload(student)}
                              title="Download student record"
                              aria-label={`Download ${student.name}'s record`}
                              className="flex h-[30px] w-[92px] items-center justify-center gap-[9px] rounded-[18px] bg-white text-[12px] text-[#0056b3] hover:bg-[#e5efff]"
                            >
                              <Download size={15} />
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="h-[100px] text-center text-[13px] text-white"
                      >
                        No student records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer and Pagination */}
            <div className="flex min-h-[39px] flex-wrap items-center justify-between gap-[10px] px-[5px] py-[7px] text-[11px] text-[#222222]">
              <p>
                Showing{" "}
                {filteredStudents.length === 0
                  ? 0
                  : (currentPage - 1) * PAGE_SIZE + 1}
                {" - "}
                {Math.min(currentPage * PAGE_SIZE, filteredStudents.length)}
                {" out of "}
                {filteredStudents.length} Students
              </p>

              <div className="flex items-center gap-[10px]">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  aria-label="Previous page"
                  className="flex h-[27px] w-[27px] items-center justify-center rounded-[5px] border border-[#2d75d9] bg-white text-[#2d75d9] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                </button>

                <span className="text-[#333333]">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  aria-label="Next page"
                  className="flex h-[27px] w-[27px] items-center justify-center rounded-[5px] border border-[#2d75d9] bg-white text-[#2d75d9] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

          </section>
        </div>
      </main>

      {/* Add Student Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-[18px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddModal(false);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-[430px] box-border overflow-y-auto rounded-[9px] bg-white p-[22px] shadow-xl">

            <div className="mb-[22px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 text-[#2d75d9]">
                  <UserPlus size={21} />
                </div>
                <h2 className="m-0 text-[19px] font-semibold text-[#111111]">
                  Add Student
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-[5px] text-[#555555] hover:bg-[#eeeeee]"
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <p className="mb-5 text-[12px] text-gray-500">
              Enter the student's information.
            </p>

            <form onSubmit={handleSubmitStudent}>
              {formError && (
                <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-[12px] text-red-600">
                  {formError}
                </p>
              )}

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Student Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter complete name"
                  maxLength={100}
                  required
                  className={inputClass}
                />
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Learner Reference Number (LRN) *
                </label>
                <input
                  name="lrn"
                  value={form.lrn}
                  onChange={handleFormChange}
                  placeholder="12-digit LRN"
                  inputMode="numeric"
                  maxLength={12}
                  required
                  className={inputClass}
                />
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Grade *
                </label>
                <select
                  name="grade"
                  value={form.grade}
                  onChange={handleFormChange}
                  className={inputClass}
                >
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Section *
                </label>
                <input
                  name="section"
                  value={form.section}
                  onChange={handleFormChange}
                  placeholder="Enter section"
                  maxLength={50}
                  required
                  className={inputClass}
                />
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Sex
                </label>
                <select
                  name="sex"
                  value={form.sex}
                  onChange={handleFormChange}
                  className={inputClass}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Guardian Name
                </label>
                <input
                  name="guardian"
                  value={form.guardian}
                  onChange={handleFormChange}
                  placeholder="Enter guardian name"
                  className={inputClass}
                />
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Contact Number
                </label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleFormChange}
                  placeholder="09XXXXXXXXX"
                  maxLength={12}
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>

              <div className="mb-[17px] flex flex-col gap-[7px]">
                <label className="text-[13px] font-medium text-[#333333]">
                  Address
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  placeholder="Enter complete address"
                  className={inputClass}
                />
              </div>

              <div className="mt-[22px] flex justify-end gap-[10px] border-t pt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-9 min-w-[95px] rounded-[5px] bg-[#eeeeee] px-[13px] text-[12px] text-[#333333] hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-9 min-w-[95px] rounded-[5px] bg-[#2d75d9] px-[13px] text-[12px] text-white hover:bg-[#185ebd]"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-[18px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedStudent(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-[430px] box-border overflow-y-auto rounded-[9px] bg-white p-[22px] shadow-xl">

            <div className="mb-[22px] flex items-center justify-between">
              <h2 className="m-0 text-[19px] font-semibold text-[#111111]">
                Student Information
              </h2>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="flex h-8 w-8 items-center justify-center rounded-[5px] text-[#555555] hover:bg-[#eeeeee]"
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex flex-col gap-[15px]">
              {[
                ["Student Name", selectedStudent.name],
                ["LRN", selectedStudent.lrn],
                ["Grade", selectedStudent.grade],
                ["Section", selectedStudent.section],
                ["Birthday", selectedStudent.birthday || "Not provided"],
                ["Sex", selectedStudent.sex || "Not provided"],
                ["Guardian", selectedStudent.guardian || "Not provided"],
                ["Contact Number", selectedStudent.contact || "Not provided"],
                ["Address", selectedStudent.address || "Not provided"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-[#eeeeee] pb-[10px]"
                >
                  <span className="text-[12px] text-[#777777]">
                    {label}
                  </span>
                  <strong className="break-words text-[14px] font-medium text-[#222222]">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-[22px] flex flex-wrap justify-end gap-[10px]">
              <button
                type="button"
                onClick={() => handleDownload(selectedStudent)}
                className="flex h-9 items-center justify-center gap-2 rounded-[5px] border border-[#2d75d9] px-3 text-[12px] text-[#0056b3] hover:bg-[#e5efff]"
              >
                <Download size={15} />
                Download Record
              </button>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="h-9 min-w-[95px] rounded-[5px] bg-[#2d75d9] px-[13px] text-[12px] text-white hover:bg-[#185ebd]"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
