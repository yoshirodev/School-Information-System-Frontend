
import { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  Folder,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileImage,
  X,
} from "lucide-react";

import RegistrarNavbar from "../../../components/RegistrarNavbar";
import "../../../styles/Portal_Registrar_Doc.css";

const initialUploads = [
  {
    id: 1,
    studentName: "Rafael Pimpolio",
    documentType: "Form 137",
    gradeSection: "Grade 9 - Bayani Agbayani",
    uploadedOn: "11/11/26 · 10:24 AM",
    file: null,
  },
  {
    id: 2,
    studentName: "Rafael Pimpolio",
    documentType: "Good Moral Certificate",
    gradeSection: "Grade 9 - Bayani Agbayani",
    uploadedOn: "11/11/26 · 10:24 AM",
    file: null,
  },
  {
    id: 3,
    studentName: "Rafael Pimpolio",
    documentType: "Certificate of Enrollment",
    gradeSection: "Grade 9 - Bayani Agbayani",
    uploadedOn: "11/11/26 · 10:24 AM",
    file: null,
  },
  {
    id: 4,
    studentName: "Rafael Pimpolio",
    documentType: "Form 137",
    gradeSection: "Grade 9 - Bayani Agbayani",
    uploadedOn: "11/11/26 · 10:24 AM",
    file: null,
  },
  {
    id: 5,
    studentName: "Rafael Pimpolio",
    documentType: "Form 137",
    gradeSection: "Grade 9 - Bayani Agbayani",
    uploadedOn: "11/11/26 · 10:24 AM",
    file: null,
  },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const ITEMS_PER_PAGE = 5;

export default function Portal_Registrar_Doc() {
  const fileInputRef = useRef(null);

  const [uploads, setUploads] = useState(initialUploads);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [previewUpload, setPreviewUpload] = useState(null);

  const totalPages = Math.max(
    1,
    Math.ceil(uploads.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleUploads = uploads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    return () => {
      uploads.forEach((upload) => {
        if (upload.file?.url) {
          URL.revokeObjectURL(upload.file.url);
        }
      });
    };
  }, []);

  const formatFileSize = (bytes) => {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validateFile = (file) => {
    setError("");

    if (!file) return false;

    const extension = file.name.split(".").pop()?.toLowerCase();
    const validExtension = ["jpg", "jpeg", "png"].includes(extension);
    const validType = ALLOWED_TYPES.includes(file.type);

    if (!validExtension || !validType) {
      setError("Invalid file format. Please select a JPG or PNG image.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. The maximum allowed size is 10 MB.");
      return false;
    }

    if (file.size === 0) {
      setError("This file is empty. Please choose another file.");
      return false;
    }

    setSelectedFile(file);
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      validateFile(file);
    }

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      validateFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please choose a file before uploading.");
      return;
    }

    const fileUrl = URL.createObjectURL(selectedFile);
    const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");

    const newUpload = {
      id: Date.now(),
      studentName: "Not assigned",
      documentType: fileName || "Uploaded Document",
      gradeSection: "—",
      uploadedOn: new Date().toLocaleString("en-PH", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      file: {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        url: fileUrl,
      },
    };

    setUploads((previous) => [newUpload, ...previous]);
    setSelectedFile(null);
    setCurrentPage(1);
    setError("");
  };

  const handleDelete = (upload) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${upload.documentType}"?`
    );

    if (!confirmed) return;

    if (upload.file?.url) {
      URL.revokeObjectURL(upload.file.url);
    }

    setUploads((previous) =>
      previous.filter((item) => item.id !== upload.id)
    );

    if (previewUpload?.id === upload.id) {
      setPreviewUpload(null);
    }
  };

  const handlePreview = (upload) => {
    if (!upload.file?.url) {
      window.alert("Preview is unavailable for this sample record.");
      return;
    }

    setPreviewUpload(upload);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <div className="registrar-document-layout">
      <RegistrarNavbar activePage="grades" />

      <main className="registrar-document-main">
        <div className="registrar-document-content">
          {/* Page Heading */}
          <header className="registrar-document-heading">
            <h1>Upload Document</h1>
            <p>Convert physical documents into digital copies</p>
          </header>

          {/* Upload Area */}
          <section
            className={`document-upload-box ${
              dragging ? "document-upload-box--dragging" : ""
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setDragging(false);
              }
            }}
            onDrop={handleDrop}
          >
            <UploadCloud
              className="document-upload-icon"
              strokeWidth={1.7}
            />

            <h2>Drag and drop your file here</h2>
            <p className="document-upload-subtitle">
              or click to browse files
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />

            {!selectedFile ? (
              <button
                type="button"
                className="document-choose-button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Folder size={19} />
                Choose File
              </button>
            ) : (
              <div className="document-selected-file">
                <FileImage size={20} />
                <div className="document-selected-details">
                  <strong>{selectedFile.name}</strong>
                  <span>{formatFileSize(selectedFile.size)}</span>
                </div>

                <button
                  type="button"
                  className="document-remove-selected"
                  onClick={clearSelectedFile}
                  aria-label="Remove selected file"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {selectedFile && (
              <button
                type="button"
                className="document-upload-submit"
                onClick={handleUpload}
              >
                Upload Document
              </button>
            )}

            <p className="document-upload-helper">
              Supported formats: JPG, PNG <span>●</span> Max File Size: 10MB
            </p>

            {error && (
              <p className="document-upload-error" role="alert">
                {error}
              </p>
            )}
          </section>

          {/* Recent Uploads */}
          <section className="recent-uploads-section">
            <h2>Recent Uploads</h2>

            <div className="recent-uploads-table-wrapper">
              <table className="recent-uploads-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Document Type</th>
                    <th>Grade &amp; Section</th>
                    <th>Uploaded On</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleUploads.length > 0 ? (
                    visibleUploads.map((upload, index) => (
                      <tr key={upload.id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{upload.studentName}</td>
                        <td>{upload.documentType}</td>
                        <td>{upload.gradeSection}</td>
                        <td>{upload.uploadedOn}</td>
                        <td>
                          <div className="document-row-actions">
                            <button
                              type="button"
                              className="document-action-button"
                              onClick={() => handlePreview(upload)}
                              aria-label={`Preview ${upload.documentType}`}
                              title="Preview document"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              type="button"
                              className="document-action-button document-delete-button"
                              onClick={() => handleDelete(upload)}
                              aria-label={`Delete ${upload.documentType}`}
                              title="Delete document"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="document-empty-state">
                        No uploaded documents found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="document-pagination">
              <p>
                Showing {uploads.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + ITEMS_PER_PAGE, uploads.length)} out of{" "}
                {uploads.length} uploads
              </p>

              <div className="document-pagination-controls">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    type="button"
                    key={index + 1}
                    className={
                      currentPage === index + 1 ? "active" : ""
                    }
                    onClick={() => setCurrentPage(index + 1)}
                    aria-label={`Page ${index + 1}`}
                    aria-current={
                      currentPage === index + 1 ? "page" : undefined
                    }
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Document Preview */}
      {previewUpload && (
        <div
          className="document-preview-overlay"
          onClick={() => setPreviewUpload(null)}
        >
          <div
            className="document-preview-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="document-preview-header">
              <div>
                <h2>Document Preview</h2>
                <p>{previewUpload.file.name}</p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewUpload(null)}
                aria-label="Close preview"
              >
                <X size={22} />
              </button>
            </div>

            <img
              src={previewUpload.file.url}
              alt={previewUpload.documentType}
            />

            <div className="document-preview-footer">
              <span>
                {formatFileSize(previewUpload.file.size)}
              </span>
              <a
                href={previewUpload.file.url}
                target="_blank"
                rel="noreferrer"
              >
                Open original
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
