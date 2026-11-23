
import { useState } from "react";
import {
  FileUp,
  FileBadge,
  Award,
  FileCheck,
  X,
  History,
  Eye,
} from "lucide-react";

import StudentNavbar from "../../../components/StudentNavbar";
import "../../../styles/Portal_Student_Request.css";

const documentTypes = [
  {
    name: "Certified True Copy of Diploma",
    icon: FileUp,
  },
  {
    name: "Certificate of Enrollment",
    icon: FileBadge,
  },
  {
    name: "Certificate of Good Moral Character",
    icon: Award,
  },
  {
    name: "Form 137",
    icon: FileCheck,
  },
  {
    name: "Form 138",
    icon: FileCheck,
  },
];

const initialRequests = [
  {
    id: "R001",
    type: "CTC of Diploma",
    date: "10/06/2026",
    status: "Completed",
    purpose: "Personal use",
  },
  {
    id: "R002",
    type: "Certificate of Enrollment",
    date: "10/06/2026",
    status: "Cancelled",
    purpose: "School requirement",
  },
  {
    id: "R003",
    type: "Form 137",
    date: "10/06/2026",
    status: "Pending",
    purpose: "School transfer",
  },
  {
    id: "R004",
    type: "Certificate of Good Moral Character",
    date: "10/06/2026",
    status: "Completed",
    purpose: "Personal use",
  },
];

function PortalStudentRequest({ onLogout }) {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const openRequestModal = (document) => {
    setSelectedDocument(document);
    setPurpose("");
    setShowRequestModal(true);
  };

  const submitRequest = (e) => {
    e.preventDefault();

    const newRequest = {
      id: `R${String(
        Math.max(
          0,
          ...requests.map((request) =>
            Number(request.id.substring(1))
          )
        ) + 1
      ).padStart(3, "0")}`,
      type: selectedDocument.name,
      date: new Date().toLocaleDateString("en-US"),
      status: "Pending",
      purpose,
    };

    setRequests((prev) => [newRequest, ...prev]);
    setShowRequestModal(false);
    setSelectedDocument(null);
    setPurpose("");
  };

  const cancelRequest = (id) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: "Cancelled" }
          : request
      )
    );

    setShowDetails(false);
    setSelectedRequest(null);
  };

  const openDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const activeRequests = requests.filter(
    (request) => request.status !== "Cancelled"
  );

  const requestHistory = requests.filter(
    (request) => request.status === "Cancelled" || request.status === "Completed"
  );

  return (
    <div className="student-request-layout">
      <StudentNavbar
        activePage="request"
        onLogout={onLogout}
      />

      <main className="student-request-main">
        <header className="student-request-header">
          <h1>Document Request</h1>
          <p>School Year 2026-2027</p>
        </header>

        <section className="student-request-panel">
          {/* LEFT: Available Documents */}

          <div className="student-request-documents">
            {documentTypes.map((document) => {
              const Icon = document.icon;

              return (
                <div
                  className="student-request-document-card"
                  key={document.name}
                >
                  <Icon
                    className="student-request-document-icon"
                    size={49}
                    strokeWidth={1.7}
                  />

                  <p>{document.name}</p>

                  <button
                    type="button"
                    onClick={() => openRequestModal(document)}
                  >
                    Select
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Active Requests */}

          <div className="student-request-active">
            <h2>Active Request</h2>

            <div className="student-request-table-wrapper">
              <table className="student-request-table">
                <thead>
                  <tr>
                    <th>Request Type</th>
                    <th>Request ID</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {activeRequests.length > 0 ? (
                    activeRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.type}</td>
                        <td>{request.id}</td>
                        <td>{request.date}</td>
                        <td>
                          <span
                            className={`student-request-status student-request-status--${request.status.toLowerCase()}`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="student-request-action"
                            onClick={() => openDetails(request)}
                          >
                            View Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="student-request-empty">
                        No active requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="student-request-history-button-wrapper">
              <button
                type="button"
                className="student-request-history-button"
                onClick={() => setShowHistory(true)}
              >
                View Request History
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* NEW REQUEST MODAL */}

      {showRequestModal && selectedDocument && (
        <div
          className="student-request-modal-overlay"
          onClick={() => setShowRequestModal(false)}
        >
          <div
            className="student-request-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="student-request-modal-header">
              <h2>Request Document</h2>

              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={submitRequest}>
              <div className="student-request-form-group">
                <label>Document Type</label>
                <input
                  type="text"
                  value={selectedDocument.name}
                  readOnly
                />
              </div>

              <div className="student-request-form-group">
                <label>Purpose of Request</label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Enter the purpose of your request..."
                  rows="4"
                  required
                />
              </div>

              <div className="student-request-modal-actions">
                <button
                  type="button"
                  className="student-request-cancel-button"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="student-request-submit-button"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST DETAILS MODAL */}

      {showDetails && selectedRequest && (
        <div
          className="student-request-modal-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="student-request-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="student-request-modal-header">
              <h2>Request Details</h2>

              <button
                type="button"
                onClick={() => setShowDetails(false)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="student-request-details">
              <div>
                <span>Request ID</span>
                <strong>{selectedRequest.id}</strong>
              </div>

              <div>
                <span>Document Type</span>
                <strong>{selectedRequest.type}</strong>
              </div>

              <div>
                <span>Date Submitted</span>
                <strong>{selectedRequest.date}</strong>
              </div>

              <div>
                <span>Purpose</span>
                <strong>{selectedRequest.purpose}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedRequest.status}</strong>
              </div>
            </div>

            <div className="student-request-modal-actions">
              {selectedRequest.status === "Pending" && (
                <button
                  type="button"
                  className="student-request-cancel-button"
                  onClick={() => cancelRequest(selectedRequest.id)}
                >
                  Cancel Request
                </button>
              )}

              <button
                type="button"
                className="student-request-submit-button"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST HISTORY MODAL */}

      {showHistory && (
        <div
          className="student-request-modal-overlay"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="student-request-modal student-request-history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="student-request-modal-header">
              <h2>
                <History size={21} />
                Request History
              </h2>

              <button
                type="button"
                onClick={() => setShowHistory(false)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="student-request-history-list">
              {requestHistory.length > 0 ? (
                requestHistory.map((request) => (
                  <div
                    className="student-request-history-item"
                    key={request.id}
                  >
                    <div>
                      <strong>{request.type}</strong>
                      <span>
                        {request.id} · {request.date}
                      </span>
                    </div>

                    <span
                      className={`student-request-status student-request-status--${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setShowHistory(false);
                        openDetails(request);
                      }}
                      aria-label="View request"
                    >
                      <Eye size={17} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="student-request-empty-history">
                  No request history available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortalStudentRequest;
