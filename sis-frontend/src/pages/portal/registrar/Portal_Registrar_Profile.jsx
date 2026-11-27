
import { useState } from "react";
import {
  UserRound,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  BriefcaseBusiness,
  MapPin,
  X,
  UserCircle
} from "lucide-react";

import StudentNavbar from "../../../components/RegistrarNavbar";
import "../../../styles/Portal_Registrar_Profile.css";

const initialRegistrar = {
  fullName: "Regis Rodricodin",
  email: "regis.rodricodin@gmail.com",
  contact: "09029349321",
  authorization: "Admin",
  position: "Teacher I / Registrar",
  address: "Naga City, Calabanga, Camarines Sur",
};

function Portal_Registrar_Profile({
  registrar: initialData,
  onLogout,
  onNavigate,
}) {
  const [registrar, setRegistrar] = useState(
    initialData || initialRegistrar
  );

  const [editedRegistrar, setEditedRegistrar] = useState(registrar);
  const [showEditModal, setShowEditModal] = useState(false);

  const [errors, setErrors] = useState({});

  // Open edit modal
  const handleEdit = () => {
    setEditedRegistrar({ ...registrar });
    setErrors({});
    setShowEditModal(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedRegistrar((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!editedRegistrar.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!editedRegistrar.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedRegistrar.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!editedRegistrar.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^\d{10,15}$/.test(editedRegistrar.contact)) {
      newErrors.contact = "Enter a valid contact number.";
    }

    if (!editedRegistrar.authorization.trim()) {
      newErrors.authorization = "Authorization is required.";
    }

    if (!editedRegistrar.position.trim()) {
      newErrors.position = "Position is required.";
    }

    if (!editedRegistrar.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setRegistrar({ ...editedRegistrar });
    setShowEditModal(false);
  };

  // Reusable information item
  const ProfileInfo = ({ icon: Icon, label, value }) => (
    <div className="registrar-profile-info-item">
      <div className="registrar-profile-info-icon">
        <Icon size={42} strokeWidth={1.8} />
      </div>

      <div className="registrar-profile-info-text">
        <span>{label}</span>
        <p>{value || "Not provided"}</p>
      </div>
    </div>
  );

  return (
    <div className="registrar-profile-layout">

      {/* Sidebar */}
      <StudentNavbar
        activePage="Profile"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="registrar-profile-main">

        <header className="registrar-profile-header">
          <h1>Registrar Profile</h1>
          <p>View and manage your personal information</p>
        </header>

        {/* Personal Information Card */}
        <section className="registrar-personal-card">

          <div className="registrar-personal-card-header">
            <h2>Personal Information</h2>
          </div>

          <div className="registrar-personal-card-body">

            {/* Profile Avatar */}
            <div className="registrar-profile-avatar-section">
              <div className="registrar-welcome-avatar"><UserCircle size={76} strokeWidth={-1.15} /></div>

              <h2>
                Hello, {registrar.fullName.split(" ")[0]}!
              </h2>
            </div>

            <div className="registrar-profile-divider" />

            {/* Information Columns */}
            <div className="registrar-profile-information">

              <div className="registrar-profile-info-column">

                <ProfileInfo
                  icon={UserRound}
                  label="Teacher Name"
                  value={registrar.fullName}
                />

                <ProfileInfo
                  icon={Mail}
                  label="Work Email"
                  value={registrar.email}
                />

                <ProfileInfo
                  icon={Phone}
                  label="Contact"
                  value={registrar.contact}
                />

              </div>

              <div className="registrar-profile-info-column">

                <ProfileInfo
                  icon={ShieldCheck}
                  label="Authorization"
                  value={registrar.authorization}
                />

                <ProfileInfo
                  icon={BriefcaseBusiness}
                  label="Position Title"
                  value={registrar.position}
                />

                <ProfileInfo
                  icon={MapPin}
                  label="Address"
                  value={registrar.address}
                />

              </div>

            </div>
          </div>
        </section>

        {/* Edit Button */}
        <button
          type="button"
          className="registrar-profile-edit-button"
          onClick={handleEdit}
        >
          Edit Information
        </button>

      </main>

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="registrar-profile-modal-overlay"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="registrar-profile-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="registrar-edit-title"
          >

            {/* Modal Header */}
            <div className="registrar-profile-modal-header">

              <h2 id="registrar-edit-title">
                Edit Personal Information
              </h2>

              <button
                type="button"
                className="registrar-profile-modal-close"
                onClick={() => setShowEditModal(false)}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

            </div>

            {/* Edit Form */}
            <form onSubmit={handleSave} noValidate>

              {[
                {
                  name: "fullName",
                  label: "Teacher Name",
                  type: "text",
                },
                {
                  name: "email",
                  label: "Work Email",
                  type: "email",
                },
                {
                  name: "contact",
                  label: "Contact Number",
                  type: "tel",
                },
                {
                  name: "authorization",
                  label: "Authorization",
                  type: "text",
                },
                {
                  name: "position",
                  label: "Position Title",
                  type: "text",
                },
              ].map((field) => (
                <div
                  className="registrar-profile-form-group"
                  key={field.name}
                >
                  <label htmlFor={field.name}>
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={editedRegistrar[field.name]}
                    onChange={handleChange}
                    required
                  />

                  {errors[field.name] && (
                    <span className="registrar-profile-error">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}

              <div className="registrar-profile-form-group">
                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={editedRegistrar.address}
                  onChange={handleChange}
                  rows={2}
                  required
                />

                {errors.address && (
                  <span className="registrar-profile-error">
                    {errors.address}
                  </span>
                )}
              </div>

              {/* Modal Actions */}
              <div className="registrar-profile-modal-actions">

                <button
                  type="button"
                  className="registrar-profile-cancel-button"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="registrar-profile-save-button"
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

export default Portal_Registrar_Profile;
