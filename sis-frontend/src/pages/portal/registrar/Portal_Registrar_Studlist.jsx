
import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import RegistrarNavbar from "../../../components/RegistrarNavbar";

// Temporary frontend data.
// Replace this with your backend API when available.
const initialStudents = [];

const PAGE_SIZE = 10;

export default function RegistrarStudentList() {
  const [students, setStudents] = useState(initialStudents);

  const [search, setSearch] = useState("");
  const [selectedSection, setSelectedSection] = useState("All Section");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [currentPage, setCurrentPage] = useState(1);

  const sections = useMemo(
    () => [...new Set(students.map((student) => student.section))],
    [students]
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase().trim();

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
    // TODO: Fetch updated student records from your backend.
    setSearch("");
    setSelectedSection("All Section");
    setSelectedGrade("All Grades");
    setCurrentPage(1);
  };

  const handleView = (student) => {
    // TODO: Navigate to the student profile using the actual route.
    console.log("View student:", student);
  };

  const handleDownload = (student) => {
    // Temporary CSV download.
    const csv = [
      ["Student Name", "LRN", "Grade", "Section"],
      [
        student.name,
        student.lrn,
        student.grade,
        student.section,
      ],
    ]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${student.name.replace(/\s+/g, "_")}_record.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleAddStudent = () => {
    // TODO: Connect to your actual enrollment workflow.
    console.log("Open student registration");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <RegistrarNavbar activePage="subjects" />

      <main className="min-h-screen w-full px-4 pb-10 pt-8 md:ml-[180px] md:w-[calc(100%-180px)] md:px-8 lg:px-10">

        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-poppins text-[25px] leading-10 text-black">
              Student List
            </h1>

            <p className="font-inter text-sm text-gray-500">
              View and manage student records
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <section className="mt-10 rounded-lg border border-[#2B75D8] bg-white p-5">
          <div className="flex flex-wrap items-center gap-4">

            {/* Search */}
            <div className="relative min-w-[220px] flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0C4DA4]"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search student name or LRN"
                className="h-[50px] w-full rounded-[20px] border border-[#0C4DA4] bg-[#F1F5FC] pl-12 pr-4 font-inter text-sm text-[#0C4DA4] outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Section Filter */}
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentPage(1);
              }}
              className="h-[50px] min-w-[150px] rounded-[20px] border border-[#0C4DA4] bg-white px-4 font-inter text-sm text-[#0C4DA4] outline-none"
            >
              <option>All Section</option>

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
              className="h-[50px] min-w-[150px] rounded-[20px] border border-[#0C4DA4] bg-white px-4 font-inter text-sm text-[#0C4DA4] outline-none"
            >
              <option>All Grades</option>

              {["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map(
                (grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                )
              )}
            </select>

            {/* Add Student */}
            <button
              type="button"
              onClick={handleAddStudent}
              className="flex h-[50px] items-center justify-center gap-2 rounded-[20px] border border-[#0C4DA4] bg-[#2B75D8] px-5 font-inter text-sm text-white transition hover:bg-[#0C4DA4]"
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </section>

        {/* Student Table */}
        <section className="mt-6 overflow-hidden rounded-xl border border-[#2B75D8] bg-white">

          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="font-poppins text-2xl font-bold text-[#2B75D8]">
              Students
            </h2>

            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-lg border border-[#2B75D8] px-3 py-2 text-sm text-[#2B75D8] hover:bg-blue-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse font-inter text-sm">

              <thead className="bg-[#2B75D8] text-white">
                <tr>
                  <th className="px-6 py-5 text-left">#</th>
                  <th className="px-6 py-5 text-left">Student Name</th>
                  <th className="px-6 py-5 text-left">LRN</th>
                  <th className="px-6 py-5 text-left">Grade & Section</th>
                  <th className="px-6 py-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayedStudents.length > 0 ? (
                  displayedStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b border-blue-200 text-gray-800 hover:bg-blue-50"
                    >
                      <td className="px-6 py-4">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {student.name}
                      </td>

                      <td className="px-6 py-4">
                        {student.lrn}
                      </td>

                      <td className="px-6 py-4">
                        {student.grade} - {student.section}
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex justify-center gap-3">

                          <button
                            type="button"
                            onClick={() => handleView(student)}
                            title="View student"
                            aria-label={`View ${student.name}`}
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-[10px] border border-[#2B75D8] text-[#2B75D8] hover:bg-blue-100"
                          >
                            <Eye size={19} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownload(student)}
                            title="Download student record"
                            aria-label={`Download ${student.name}'s record`}
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-[10px] border border-[#2B75D8] text-[#2B75D8] hover:bg-blue-100"
                          >
                            <Download size={19} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-16 text-center text-gray-500"
                    >
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">

            <p className="text-sm text-gray-600">
              Showing{" "}
              {filteredStudents.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              {" - "}
              {Math.min(currentPage * PAGE_SIZE, filteredStudents.length)}
              {" out of "}
              {filteredStudents.length} Students
            </p>

            <div className="flex items-center gap-3">

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="rounded-lg border border-[#2B75D8] p-2 text-[#2B75D8] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={19} />
              </button>

              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="rounded-lg border border-[#2B75D8] p-2 text-[#2B75D8] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>

            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
