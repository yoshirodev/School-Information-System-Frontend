
import { useMemo, useState } from "react";
import {
  Search,
  X,
  Eye,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import RegistrarNavbar from "../../../components/RegistrarNavbar";
import "../../../styles/Portal_Registrar_Req.css";

const initialRequests = [
  {
    id: "R001",
    type: "CTC of Diploma",
    name: "Rafael I. Pimpolio",
    date: "10/06/2026",
    status: "Completed",
    submittedBy: "Student",
    purpose: "For personal records",
    remarks: "Document is ready for release.",
  },
  {
    id: "R002",
    type: "Certificate of Enrollment",
    name: "Rafael I. Pimpolio",
    date: "10/06/2026",
    status: "Cancelled",
    submittedBy: "Student",
    purpose: "School requirement",
    remarks: "Request was cancelled.",
  },
  {
    id: "R003",
    type: "Form 137",
    name: "Rafael I. Pimpolio",
    date: "10/06/2026",
    status: "Pending",
    submittedBy: "Student",
    purpose: "School transfer",
    remarks: "Waiting for registrar review.",
  },
  {
    id: "R004",
    type: "Good Moral Certificate",
    name: "Rafael I. Pimpolio",
    date: "10/06/2026",
    status: "Completed",
    submittedBy: "Student",
    purpose: "Employment requirement",
    remarks: "Document is ready for release.",
  },
  {
    id: "R005",
    type: "Form 137",
    name: "Maria L. Santos",
    date: "10/07/2026",
    status: "Pending",
    submittedBy: "Student",
    purpose: "Scholarship application",
    remarks: "Waiting for verification.",
  },
  {
    id: "R006",
    type: "Certificate of Enrollment",
    name: "John D. Reyes",
    date: "10/08/2026",
    status: "Completed",
    submittedBy: "Student",
    purpose: "Personal records",
    remarks: "Released to the student.",
  },
  {
    id: "R007",
    type: "Form 137",
    name: "Angela M. Cruz",
    date: "10/09/2026",
    status: "Pending",
    submittedBy: "Student",
    purpose: "School transfer",
    remarks: "Waiting for document preparation.",
  },
  {
    id: "R008",
    type: "Good Moral Certificate",
    name: "Mark A. Dela Cruz",
    date: "10/10/2026",
    status: "Cancelled",
    submittedBy: "Student",
    purpose: "Personal records",
    remarks: "Request was withdrawn.",
  },
];

const statusOptions = ["All Statuses", "Pending", "Completed", "Cancelled"];

function StatusBadge({ status }) {
  const statusClass = status.toLowerCase();

  return (
    <span className={`request-status request-status--${statusClass}`}>
      {status === "Completed" && <CheckCircle2 size={15} />}
      {status === "Pending" && <AlertCircle size={15} />}
      {status === "Cancelled" && <XCircle size={15} />}
      {status}
    </span>
  );
}

export default function Portal_Registrar_Req() {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch = [
        request.id,
        request.type,
        request.name,
      ].some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus =
        statusFilter === "All Statuses" ||
        request.status === statusFilter;

      const matchesView = showHistory
        ? request.status === "Completed" ||
          request.status === "Cancelled"
        : request.status === "Pending";

      return matchesSearch && matchesStatus && matchesView;
    });
  }, [requests, searchTerm, statusFilter, showHistory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / rowsPerPage)
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const historyCount = requests.filter(
    (request) =>
      request.status === "Completed" ||
      request.status === "Cancelled"
  ).length;

  const handleViewChange = () => {
    setShowHistory((previous) => !previous);
    setCurrentPage(1);
    setSearchTerm("");
    setStatusFilter("All Statuses");
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedRequest) return;

    setRequests((previous) =>
      previous.map((request) =>
        request.id === selectedRequest.id
          ? { ...request, status: newStatus }
          : request
      )
    );

    setSelectedRequest((previous) => ({
      ...previous,
      status: newStatus,
    }));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="registrar-request-layout">
      <RegistrarNavbar activePage="document-request-management" />

      <main className="registrar-request-main">
        <header className="registrar-request-header">
          <div>
            <p className="registrar-request-eyebrow">
              REGISTRAR PORTAL
            </p>
            <h1>Document Request Manager</h1>
            <p className="registrar-request-subtitle">
              School Year 2026-2027
            </p>
          </div>
        </header>

        <section className="request-manager-card">
          <div className="request-manager-heading">
            <div>
              <h2>
                {showHistory ? "Request History" : "Active Requests"}
              </h2>
              <p>
                {showHistory
                  ? "Review completed and cancelled document requests."
                  : "Review and manage student document requests."}
              </p>
            </div>

            <button
              type="button"
              className="request-history-button"
              onClick={handleViewChange}
            >
              <Clock size={17} />
              {showHistory ? "View Active Requests" : "View Request History"}
            </button>
          </div>

          <div className="request-summary">
            <div className="request-summary-item">
              <span className="request-summary-icon pending">
                <Clock size={19} />
              </span>
              <div>
                <strong>{pendingCount}</strong>
                <span>Pending Requests</span>
              </div>
            </div>

            <div className="request-summary-item">
              <span className="request-summary-icon history">
                <FileText size={19} />
              </span>
              <div>
                <strong>{historyCount}</strong>
                <span>History Records</span>
              </div>
            </div>
          </div>

          <div className="request-toolbar">
            <div className="request-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search name, request type, or ID..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="request-status-filter"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter requests by status"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="request-table-wrapper">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Request Type</th>
                  <th>Name</th>
                  <th>Request ID</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="request-type-cell">
                        {request.type}
                      </td>
                      <td>{request.name}</td>
                      <td className="request-id-cell">
                        {request.id}
                      </td>
                      <td>{request.date}</td>
                      <td>
                        <StatusBadge status={request.status} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="request-manage-button"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye size={15} />
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="request-empty-state">
                      <FileText size={30} />
                      <strong>No requests found</strong>
                      <span>
                        Try changing your search or filter.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="request-table-footer">
            <span>
              Showing{" "}
              {filteredRequests.length === 0
                ? 0
                : (currentPage - 1) * rowsPerPage + 1}
              {" "}to{" "}
              {Math.min(currentPage * rowsPerPage, filteredRequests.length)}
              {" "}of {filteredRequests.length} requests
            </span>

            <div className="request-pagination">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {selectedRequest && (
        <div
          className="request-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRequest(null);
            }
          }}
        >
          <section
            className="request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-modal-title"
          >
            <div className="request-modal-header">
              <div>
                <p>REQUEST DETAILS</p>
                <h2 id="request-modal-title">
                  {selectedRequest.type}
                </h2>
              </div>

              <button
                type="button"
                className="request-modal-close"
                aria-label="Close modal"
                onClick={() => setSelectedRequest(null)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="request-modal-content">
              <div className="request-detail-row">
                <span>Request ID</span>
                <strong>{selectedRequest.id}</strong>
              </div>
              <div className="request-detail-row">
                <span>Student Name</span>
                <strong>{selectedRequest.name}</strong>
              </div>
              <div className="request-detail-row">
                <span>Date Submitted</span>
                <strong>{selectedRequest.date}</strong>
              </div>
              <div className="request-detail-row">
                <span>Submitted By</span>
                <strong>{selectedRequest.submittedBy}</strong>
              </div>
              <div className="request-detail-row">
                <span>Purpose</span>
                <strong>{selectedRequest.purpose}</strong>
              </div>
              <div className="request-detail-row">
                <span>Current Status</span>
                <StatusBadge status={selectedRequest.status} />
              </div>

              <div className="request-remarks">
                <span>Remarks</span>
                <p>{selectedRequest.remarks}</p>
              </div>
            </div>

            {selectedRequest.status === "Pending" && (
              <div className="request-modal-actions">
                <button
                  type="button"
                  className="request-cancel-button"
                  onClick={() => handleStatusChange("Cancelled")}
                >
                  Cancel Request
                </button>
                <button
                  type="button"
                  className="request-complete-button"
                  onClick={() => handleStatusChange("Completed")}
                >
                  Mark as Completed
                </button>
              </div>
            )}

            <div className="request-modal-bottom">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
