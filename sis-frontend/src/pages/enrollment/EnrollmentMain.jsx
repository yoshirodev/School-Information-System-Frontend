
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    jhsSections,
    shsSections,
    getJhsSubjects,
} from "../../data/jhsEnrollmentData";
import { shsEnrollmentData } from "../../data/shsEnrollmentData";

import Navbar from "../../components/Navbar";
import bgmain from "../../assets/bgmain.png";
import nontLogo from "../../assets/nont_logo.png";

export default function EnrollmentMain() {
    const navigate = useNavigate();

    // Current screen inside the enrollment form
    const [currentStep, setCurrentStep] = useState(1);

    // All enrollment information is stored here
    const [formData, setFormData] = useState({
        lrn: "",
        gradeLevel: "",

        // Enrollment assignment
        assignedSectionId: "",

        lastName: "",
        firstName: "",
        middleName: "",
        extensionName: "",

        // Step 3: Birth & Background Details
        sex: "",
        birthday: "",
        placeOfBirth: "",

        // Step 4: Address Details
        houseNoStreet: "",
        sitioStreet: "",
        zipCode: "",
        barangay: "",
        province: "",
        municipalityCity: "",

        // Step 5: Parent / Guardian Information
        fatherLastName: "",
        fatherFirstName: "",
        fatherMiddleName: "",
        fatherContactNumber: "",
        fatherUnknown: false,
        fatherDeceased: false,

        motherLastName: "",
        motherFirstName: "",
        motherMiddleName: "",
        motherContactNumber: "",
        motherUnknown: false,
        motherDeceased: false,

        guardianLastName: "",
        guardianFirstName: "",
        guardianMiddleName: "",
        guardianContactNumber: "",
        guardianDeceased: false,

        // Father's Address
        fatherHouseNoStreet: "",
        fatherSitioStreet: "",
        fatherZipCode: "",
        fatherBarangay: "",
        fatherProvince: "",
        fatherMunicipalityCity: "",

        // Mother's Address
        motherHouseNoStreet: "",
        motherSitioStreet: "",
        motherZipCode: "",
        motherBarangay: "",
        motherProvince: "",
        motherMunicipalityCity: "",

        // Legal Guardian's Address (Optional)
        guardianHouseNoStreet: "",
        guardianSitioStreet: "",
        guardianZipCode: "",
        guardianBarangay: "",
        guardianProvince: "",
        guardianMunicipalityCity: "",

        // Step 9: Advanced Information (All Optional)
        psaBirthCertificateNo: "",
        motherTongue: "",
        isIndigenous: "",
        indigenousSpecification: "",
        isFourPsBeneficiary: "",
        fourPsHouseholdId: "",

        // Step 10: Disability Information (Optional)
        isLearnerWithDisability: "",
        disabilityTypes: [],

        // Step 11: Previous School Information (Optional)
        lastGradeLevelCompleted: "",
        lastSchoolYearCompleted: "",
        lastSchoolAttended: "",
        schoolId: "",

        // Step 12: Consent
        preferredLearningModalities: [],
        consentToDataProcessing: "",

        // Senior High School Enrollment
        shsSelectedElectives: [],
    });

    // SHS elective selection popup
    const [isShsModalOpen, setIsShsModalOpen] = useState(false);
    const [activeShsCluster, setActiveShsCluster] = useState("");
    const [activeShsTrack, setActiveShsTrack] = useState("academic");

    // Step 14: Document Upload
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const gradeLevels = [
        { value: "7", label: "Grade 7" },
        { value: "8", label: "Grade 8" },
        { value: "9", label: "Grade 9" },
        { value: "10", label: "Grade 10" },
        { value: "11", label: "Grade 11" },
        { value: "12", label: "Grade 12" },
    ];

    const isJuniorHigh = (gradeLevel) => {
        return ["7", "8", "9", "10"].includes(gradeLevel);
    };

    const isSeniorHigh = (gradeLevel) => {
        return ["11", "12"].includes(gradeLevel);
    };

    // Hard-coded barangays for Calabanga, Camarines Sur.
    const barangays = [
        "Balatasan", "Balombon", "Balongay", "Belen", "Bigaas", "Binaliw",
        "Binanuaanan Grande", "Binanuaanan Pequeño", "Bonot-Santa Rosa",
        "Burabod", "Cabanbanan", "Cagsao", "Camuning", "Comaguingking",
        "Del Carmen", "Dominorog", "Fabrica", "Harobay", "La Purisima",
        "Lugsad", "Manguiring", "Pagatpat", "Paolbo", "Pinada",
        "Punta Tarawal", "Quinale", "Sabang", "Salvacion-Baybay",
        "San Antonio", "San Antonio Poblacion", "San Bernardino",
        "San Francisco", "San Isidro", "San Lucas", "San Miguel",
        "San Pablo", "San Roque", "San Vicente", "Santa Cruz Poblacion",
        "Santa Cruz Ratay", "Santa Isabel", "Santa Salud", "Santo Domingo",
        "Santo Niño", "Siba-o", "Sibobo", "Sogod", "Tomagodtod",
    ];
    const MAX_NAME_LENGTH = 50;
    const MAX_ADDRESS_LENGTH = 100;
    const MAX_CONTACT_DIGITS = 12;

    // Update form fields
    const updateField = (name, value) => {
        if (typeof value === "string") {
            if (name === "lrn") value = value.replace(/\D/g, "").slice(0, 12);
            else if (name.toLowerCase().includes("zipcode")) value = value.replace(/\D/g, "").slice(0, 4);
            else if (name.toLowerCase().includes("contactnumber")) value = value.replace(/\D/g, "").slice(0, MAX_CONTACT_DIGITS);
            else if (["lastName", "firstName", "middleName", "extensionName"].includes(name) || /Name$/.test(name)) value = value.slice(0, MAX_NAME_LENGTH);
            else if (/Street$|placeOfBirth|province|municipalityCity|motherTongue/.test(name)) value = value.slice(0, MAX_ADDRESS_LENGTH);
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setStatus("");
    };

    const handleUnknownParent = (prefix, checked) => {
        setFormData((prev) => ({
            ...prev,
            [`${prefix}Unknown`]: checked,

            // Clear the fields when the parent is marked as unknown
            [`${prefix}LastName`]: checked ? "" : prev[`${prefix}LastName`],
            [`${prefix}FirstName`]: checked ? "" : prev[`${prefix}FirstName`],
            [`${prefix}MiddleName`]: checked ? "" : prev[`${prefix}MiddleName`],
            [`${prefix}ContactNumber`]: checked ? "" : prev[`${prefix}ContactNumber`],
            [`${prefix}Deceased`]: checked ? false : prev[`${prefix}Deceased`],
        }));

        setErrors((prev) => {
            const updated = { ...prev };

            ["LastName", "FirstName", "MiddleName", "ContactNumber"].forEach((field) => {
                delete updated[`${prefix}${field}`];
            });

            return updated;
        });

        setStatus("");
    };

    // Validate the first screen
    const validateBasicInfo = () => {
        const newErrors = {};

        const lrn = formData.lrn.trim();

        if (!lrn) {
            newErrors.lrn = "Learner Reference Number is required.";
        } else if (!/^\d{12}$/.test(lrn)) {
            newErrors.lrn = "LRN must contain exactly 12 digits.";
        }

        if (!formData.gradeLevel) {
            newErrors.gradeLevel = "Please select a grade level.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Validate the name screen
    const validateNameInfo = () => {
        const newErrors = {};

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required.";
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        // Middle name and extension name are optional.

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateBirthInfo = () => {
        const newErrors = {};

        if (!formData.sex) {
            newErrors.sex = "Please select your sex.";
        }

        if (!formData.birthday) {
            newErrors.birthday = "Birthday is required.";
        } else {
            const birthDate = new Date(`${formData.birthday}T00:00:00`);
            const today = new Date();

            if (Number.isNaN(birthDate.getTime())) {
                newErrors.birthday = "Please enter a valid birthday.";
            } else if (birthDate > today) {
                newErrors.birthday = "Birthday cannot be in the future.";
            }
        }

        if (!formData.placeOfBirth.trim()) {
            newErrors.placeOfBirth = "Place of birth is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateAddressInfo = () => {
        const newErrors = {};

        if (!formData.houseNoStreet.trim()) {
            newErrors.houseNoStreet = "House number / street is required.";
        }

        if (!formData.sitioStreet.trim()) {
            newErrors.sitioStreet = "Sitio / street name is required.";
        }

        if (!formData.zipCode.trim()) {
            newErrors.zipCode = "ZIP code is required.";
        } else if (!/^\d{4}$/.test(formData.zipCode)) {
            newErrors.zipCode = "Please enter a valid 4-digit ZIP code.";
        }

        if (!formData.barangay.trim()) {
            newErrors.barangay = "Barangay is required.";
        }

        if (!formData.province.trim()) {
            newErrors.province = "Province is required.";
        }

        if (!formData.municipalityCity.trim()) {
            newErrors.municipalityCity = "Municipality / City is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateGuardianInfo = () => {
        const newErrors = {};

        const validateParent = (prefix, label) => {
            // Skip a parent marked as unknown
            if (formData[`${prefix}Unknown`]) return;

            const lastName = formData[`${prefix}LastName`].trim();
            const firstName = formData[`${prefix}FirstName`].trim();
            const contact = formData[`${prefix}ContactNumber`].trim();

            if (!lastName) {
                newErrors[`${prefix}LastName`] =
                    `${label}'s last name is required.`;
            }

            if (!firstName) {
                newErrors[`${prefix}FirstName`] =
                    `${label}'s first name is required.`;
            }

            // Contact number is optional if deceased
            if (!formData[`${prefix}Deceased`]) {
                if (!contact) {
                    newErrors[`${prefix}ContactNumber`] =
                        `${label}'s contact number is required.`;
                } else if (!/^(09\d{9}|639\d{9})$/.test(contact)) {
                    newErrors[`${prefix}ContactNumber`] =
                        "Use 09XXXXXXXXX or 639XXXXXXXXX.";
                }
            } else if (
                contact &&
                !/^(09\d{9}|639\d{9})$/.test(contact)
            ) {
                newErrors[`${prefix}ContactNumber`] =
                    "Use 09XXXXXXXXX or 639XXXXXXXXX.";
            }
        };

        validateParent("father", "Father");
        validateParent("mother", "Mother");

        // Guardian is required when both parents are unavailable
        const guardianRequired =
            (formData.fatherUnknown || formData.fatherDeceased) &&
            (formData.motherUnknown || formData.motherDeceased);

        const guardianLastName = formData.guardianLastName.trim();
        const guardianFirstName = formData.guardianFirstName.trim();
        const guardianContact = formData.guardianContactNumber.trim();

        const guardianHasAny =
            guardianLastName || guardianFirstName || guardianContact;

        if (guardianRequired || guardianHasAny) {
            if (!guardianLastName) {
                newErrors.guardianLastName =
                    "Legal guardian's last name is required.";
            }

            if (!guardianFirstName) {
                newErrors.guardianFirstName =
                    "Legal guardian's first name is required.";
            }

            if (!guardianContact) {
                newErrors.guardianContactNumber =
                    "Legal guardian's contact number is required.";
            } else if (!/^(09\d{9}|639\d{9})$/.test(guardianContact)) {
                newErrors.guardianContactNumber =
                    "Use 09XXXXXXXXX or 639XXXXXXXXX.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAddress = (prefix, required) => {
        const fields = [
            `${prefix}HouseNoStreet`,
            `${prefix}SitioStreet`,
            `${prefix}ZipCode`,
            `${prefix}Barangay`,
            `${prefix}Province`,
            `${prefix}MunicipalityCity`,
        ];

        const hasAnyValue = fields.some(
            (field) => formData[field]?.trim()
        );

        // Optional address: allow the entire section to remain empty.
        if (!required && !hasAnyValue) {
            return true;
        }

        const newErrors = {};

        fields.forEach((field) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = "This field is required.";
            }
        });

        // Keep any existing ZIP code format validation here.
        // For example, if your current validation checks for a 4-digit
        // Philippine ZIP code, retain that same rule.

        setErrors((prev) => ({
            ...prev,
            ...newErrors,
        }));

        return Object.keys(newErrors).length === 0;
    };

    const validateFatherAddress = () => {
        if (formData.fatherUnknown || formData.fatherDeceased) return true;
        const newErrors = {};
        const requiredFields = {
            fatherHouseNoStreet: "House No. / Street",
            fatherSitioStreet: "Sitio / Street Name",
            fatherZipCode: "ZIP Code",
            fatherBarangay: "Barangay",
            fatherProvince: "Province",
            fatherMunicipalityCity: "Municipality / City",
        };

        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!formData[field]?.trim()) newErrors[field] = `${label} is required.`;
        });
        if (formData.fatherZipCode.trim() && !/^\d{4}$/.test(formData.fatherZipCode)) {
            newErrors.fatherZipCode = "ZIP code must contain exactly 4 digits.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateMotherAddress = () => {
        if (formData.motherUnknown || formData.motherDeceased) return true;
        const newErrors = {};
        const requiredFields = {
            motherHouseNoStreet: "House No. / Street",
            motherSitioStreet: "Sitio / Street Name",
            motherZipCode: "ZIP Code",
            motherBarangay: "Barangay",
            motherProvince: "Province",
            motherMunicipalityCity: "Municipality / City",
        };

        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!formData[field]?.trim()) newErrors[field] = `${label} is required.`;
        });
        if (formData.motherZipCode.trim() && !/^\d{4}$/.test(formData.motherZipCode)) {
            newErrors.motherZipCode = "ZIP code must contain exactly 4 digits.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateGuardianAddress = () => {
        const newErrors = {};

        const fields = {
            guardianHouseNoStreet: "House No. / Street",
            guardianSitioStreet: "Sitio / Street Name",
            guardianZipCode: "ZIP Code",
            guardianBarangay: "Barangay",
            guardianProvince: "Province",
            guardianMunicipalityCity: "Municipality / City",
        };

        // Guardian address is required only when BOTH parents
        // are unknown or deceased.
        const fatherUnavailable =
            formData.fatherUnknown || formData.fatherDeceased;

        const motherUnavailable =
            formData.motherUnknown || formData.motherDeceased;

        const guardianAddressRequired =
            fatherUnavailable && motherUnavailable;

        // Check whether the user entered anything in the guardian address.
        const hasAnyValue = Object.keys(fields).some(
            (field) => formData[field]?.trim()
        );

        // If optional and completely empty, allow the user to continue.
        if (!guardianAddressRequired && !hasAnyValue) {
            setErrors({});
            return true;
        }

        // Validate all fields when required or when partially completed.
        Object.entries(fields).forEach(([field, label]) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = `${label} is required.`;
            }
        });

        // Validate ZIP code format.
        if (
            formData.guardianZipCode.trim() &&
            !/^\d{4}$/.test(formData.guardianZipCode)
        ) {
            newErrors.guardianZipCode =
                "ZIP code must contain exactly 4 digits.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Get the clusters based on the selected SHS track
    const getSelectedShsClusters = () => {
        return [
            ...shsEnrollmentData.tracks.academic.clusters.map((cluster) => ({
                ...cluster,
                trackId: "academic",
                trackName: "Academic Track",
            })),

            ...shsEnrollmentData.tracks.techPro.clusters.map((cluster) => ({
                ...cluster,
                trackId: "techPro",
                trackName: "Technical-Professional Track",
            })),
        ];
    };

    // Check whether an elective is already selected
    const isShsElectiveSelected = (clusterId, subject) => {
        return formData.shsSelectedElectives.some(
            (item) =>
                item.clusterId === clusterId &&
                item.subject === subject
        );
    };
    // Add or remove an elective
    const toggleShsElective = (clusterId, subject) => {
        setFormData((prev) => {
            const alreadySelected = prev.shsSelectedElectives.some(
                (item) =>
                    item.clusterId === clusterId &&
                    item.subject === subject
            );

            return {
                ...prev,
                shsSelectedElectives: alreadySelected
                    ? prev.shsSelectedElectives.filter(
                        (item) =>
                            !(
                                item.clusterId === clusterId &&
                                item.subject === subject
                            )
                    )
                    : [
                        ...prev.shsSelectedElectives,
                        { clusterId, subject },
                    ],
            };
        });

        setErrors((prev) => ({
            ...prev,
            shsSelectedElectives: "",
        }));
    };

    // Validate the SHS enrollment selection
    const validateShsSelection = () => {
        const newErrors = {};

        if (formData.shsSelectedElectives.length < 2) {
            newErrors.shsSelectedElectives =
                "Please select at least 2 elective subjects.";
        }

        setErrors((prev) => ({
            ...prev,
            shsSelectedElectives: newErrors.shsSelectedElectives || "",
        }));

        return Object.keys(newErrors).length === 0;
    };

    const handleShsTrackChange = (trackId) => {
        setActiveShsTrack(trackId);

        const firstCluster = getSelectedShsClusters().find(
            (cluster) => cluster.trackId === trackId
        );

        if (firstCluster) {
            setActiveShsCluster(firstCluster.id);
        }

        setIsShsModalOpen(true);
    };

    // Next button
    const handleNext = (e) => {
        e.preventDefault();

        switch (currentStep) {
            case 1:
                //if (!validateBasicInfo()) return;
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 2:
                //if (!validateNameInfo()) return;
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 3:
                //if (!validateBirthInfo()) return;
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 4:
                //if (!validateAddressInfo()) return;
                setCurrentStep(5);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 5: {
                //if (!validateGuardianInfo()) return;

                const fatherUnavailable =
                    formData.fatherUnknown || formData.fatherDeceased;

                const motherUnavailable =
                    formData.motherUnknown || formData.motherDeceased;

                if (fatherUnavailable) {
                    setCurrentStep(motherUnavailable ? 8 : 7);
                } else {
                    setCurrentStep(6);
                }

                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            }
            case 6: {
                //if (!validateFatherAddress()) return;

                const motherUnavailable =
                    formData.motherUnknown || formData.motherDeceased;

                setCurrentStep(motherUnavailable ? 8 : 7);

                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            }
            case 7:
                //if (!validateMotherAddress()) return;

                setCurrentStep(8);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 8:
                //if (!validateGuardianAddress()) return;
                setCurrentStep(9);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 9:
                setCurrentStep(10);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 10:
                setCurrentStep(11);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 11:
                setCurrentStep(12);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 12:
                if (!formData.consentToDataProcessing) {
                    setStatus("Please select Yes or No for the consent statement.");
                    return;
                }
                setCurrentStep(13);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 13:
                setCurrentStep(14);
                setStatus("");
                setErrors({});
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 14: {
                if (isJuniorHigh(formData.gradeLevel)) {
                    const sectionId =
                        formData.assignedSectionId ||
                        assignLeastPopulatedSection(formData.gradeLevel);

                    if (!sectionId) {
                        setStatus(
                            "Unable to assign a section. Please contact the registrar."
                        );
                        return;
                    }

                    setFormData((prev) => ({
                        ...prev,
                        assignedSectionId: sectionId,
                    }));

                    setCurrentStep(15);
                } else if (isSeniorHigh(formData.gradeLevel)) {
                    setCurrentStep(16);
                } else {
                    setStatus("Invalid grade level selected.");
                    return;
                }

                break;
            }
            case 15:
                // JHS enrollment page → final submission
                setCurrentStep(17);
                setStatus("");
                setErrors({});
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 16:
                // Validate SHS track and elective selections
                if (!validateShsSelection()) return;

                setCurrentStep(17);
                setStatus("");
                setErrors({});
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 17: {
                // Final submission for both JHS and SHS.
                const existing = JSON.parse(
                    localStorage.getItem("enrollmentApplications") || "[]"
                );

                const application = {
                    ...formData,
                    age: calculateAge(formData.birthday),
                    applicationId: `ENR-${Date.now()}`,
                    submittedAt: new Date().toISOString(),
                    applicationStatus: "Pending",

                    // Frontend-only file information
                    uploadedDocuments: uploadedFiles.map((file) => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                    })),
                };

                localStorage.setItem(
                    "enrollmentApplications",
                    JSON.stringify([...existing, application])
                );

                localStorage.setItem(
                    "latestEnrollmentApplication",
                    JSON.stringify(application)
                );
                return;
            }
            default:
                break;
        }

        setErrors({});
        setStatus("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const assignLeastPopulatedSection = (gradeLevel) => {
        const availableSections = jhsSections[gradeLevel];

        if (!availableSections) return "";

        const applications = JSON.parse(
            localStorage.getItem("enrollmentApplications") || "[]"
        );

        const sectionCounts = availableSections.map((section) => {
            const count = applications.filter(
                (application) =>
                    application.gradeLevel === gradeLevel &&
                    application.assignedSectionId === section.id
            ).length;

            return {
                ...section,
                studentCount: count,
            };
        });

        // Find the section with the fewest students.
        // If tied, the first section in the array is selected.
        sectionCounts.sort(
            (a, b) => a.studentCount - b.studentCount
        );

        return sectionCounts[0].id;
    };

    const assignedJhsSection = jhsSections[formData.gradeLevel]
        ?.find(
            (section) =>
                section.id === formData.assignedSectionId
        );

    const jhsSubjects = getJhsSubjects(formData.gradeLevel);

    // Back button
    const handleBack = () => {
        switch (currentStep) {
            case 1:
                navigate("/enroll");
                break;
            case 2:
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 3:
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 4:
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 5:
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 6:
                setCurrentStep(5);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 7: {
                const fatherUnavailable =
                    formData.fatherUnknown || formData.fatherDeceased;

                setCurrentStep(fatherUnavailable ? 5 : 6);

                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            }
            case 8: {
                const fatherUnavailable =
                    formData.fatherUnknown || formData.fatherDeceased;

                const motherUnavailable =
                    formData.motherUnknown || formData.motherDeceased;

                if (!motherUnavailable) {
                    setCurrentStep(7);
                } else if (!fatherUnavailable) {
                    setCurrentStep(6);
                } else {
                    setCurrentStep(5);
                }

                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            }
            case 9:
                setCurrentStep(8);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 10:
                setCurrentStep(9);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 11:
                setCurrentStep(10);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 12:
                setCurrentStep(11);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 13:
                setCurrentStep(12);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 14:
                setCurrentStep(13);
                setStatus("");
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 15:
                setCurrentStep(14);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 16:
                setCurrentStep(14);
                break;

            case 17:
                if (isJuniorHigh(formData.gradeLevel)) {
                    setCurrentStep(15);
                } else if (isSeniorHigh(formData.gradeLevel)) {
                    setCurrentStep(16);
                }
                break;
            default:
                break;
        }
    };

    // Shared progress indicator
    const progressSteps = [
        "Personal Info",
        "Documents",
        "Subject",
        "Confirmation",
    ];

    const calculateAge = (birthday) => {
        if (!birthday) return "";

        const birthDate = new Date(`${birthday}T00:00:00`);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const birthdayNotReached =
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
                today.getDate() < birthDate.getDate());

        if (birthdayNotReached) {
            age--;
        }

        return age >= 0 ? age : "";
    };

    const toggleDisabilityType = (type) => {
        setFormData((prev) => {
            const isSelected = prev.disabilityTypes.includes(type);

            return {
                ...prev,
                disabilityTypes: isSelected
                    ? prev.disabilityTypes.filter((item) => item !== type)
                    : [...prev.disabilityTypes, type],
            };
        });

        setStatus("");
    };

    // Handle file selection and drag-and-drop
    const handleFileUpload = (files) => {
        const selectedFiles = Array.from(files);
        const validFiles = [];
        const rejectedFiles = [];

        selectedFiles.forEach((file) => {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                rejectedFiles.push(`${file.name}: Only JPG and PNG files are allowed.`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                rejectedFiles.push(`${file.name}: File exceeds the 10MB limit.`);
                return;
            }

            // Prevent duplicate files
            const alreadyExists = uploadedFiles.some(
                (existingFile) =>
                    existingFile.name === file.name &&
                    existingFile.size === file.size &&
                    existingFile.lastModified === file.lastModified
            );

            if (!alreadyExists) {
                validFiles.push(file);
            }
        });

        setUploadedFiles((prev) => [...prev, ...validFiles]);

        if (rejectedFiles.length > 0) {
            setStatus(rejectedFiles.join(" "));
        } else {
            setStatus("");
        }
    };

    // File browser
    const handleFileSelect = (e) => {
        handleFileUpload(e.target.files);
        e.target.value = "";
    };

    // Drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        handleFileUpload(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // Remove uploaded file
    const removeUploadedFile = (index) => {
        setUploadedFiles((prev) =>
            prev.filter((_, fileIndex) => fileIndex !== index)
        );

        setStatus("");
    };

    // porgress calculation for the progress bar, since the first 3 steps are considered as one step in the progress bar
    // Progress calculation
    const progressStep =
        currentStep <= 13 ? 1 :
        currentStep === 14 ? 2 :
        currentStep === 15 || currentStep === 16 ? 3 :
        4;
            
    return (
        <div className="relative bg-white min-h-screen w-full overflow-x-hidden">



            {/* Background */}
            <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden">
                <img
                    src={bgmain}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Progress Indicator */}
            <div className="relative z-10 flex justify-center pt-[15px] px-4">
                <div className="bg-white rounded-[20px] w-full max-w-[379px] min-h-[75px] px-5 py-3">

                    <div className="grid grid-cols-4 gap-2">
                        {progressSteps.map((step, index) => {
                            const active = index + 1 <= progressStep;
                            const current = index + 1 === progressStep;

                            return (
                                <div
                                    key={step}
                                    className="flex flex-col items-center gap-1 text-center"
                                    aria-current={current ? "step" : undefined}
                                >
                                    <div
                                        className={`w-9 h-[34px] rounded-full flex items-center justify-center text-xl font-poppins ${
                                            active
                                                ? "bg-[#2B75D8] text-white"
                                                : "bg-gray-100 text-[#2B75D8]"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>

                                    <span className="text-[8px] sm:text-[9px] font-poppins text-black leading-tight">
                                        {step}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        className="mt-2 h-[3px] bg-gray-200 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-label="Personal Information section"
                        aria-valuenow={1}
                        aria-valuemin={1}
                        aria-valuemax={4}
                    >
                        <div
                            className="h-full bg-[#2B75D8] rounded-full transition-all duration-300"
                            style={{ width: `${(progressStep / 4) * 100}%` }}
                        />
                    </div>

                </div>
            </div>

            {/* ==============================
                SCREEN 1: PART 1 LRN AND GRADE LEVEL
            ============================== */}

            {currentStep === 1 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[725px] min-h-[639px] px-5 sm:px-10 lg:px-[69px] py-[26px]">

                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-[125px]">
                            Learner Information I - Basic Information
                        </h1>

                        <form onSubmit={handleNext} noValidate>

                            <div className="flex flex-col gap-[50px]">

                                {/* Learner Reference Number */}
                                <div className="w-full">

                                    <label
                                        htmlFor="lrn"
                                        className="block text-[#2B75D8] font-poppins text-base font-bold leading-6 mb-2"
                                    >
                                        Learner Reference Number
                                    </label>

                                    <input
                                        id="lrn"
                                        name="lrn"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="off"
                                        maxLength={12}
                                        value={formData.lrn}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 12);

                                            updateField("lrn", value);
                                        }}
                                        placeholder="Enter your 12-digit LRN"
                                        aria-invalid={!!errors.lrn}
                                        className="w-full h-[60px] rounded-[10px] border border-[#2B75D8] bg-white px-4 font-poppins text-base text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                    />

                                    {errors.lrn && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.lrn}
                                        </p>
                                    )}

                                </div>

                                {/* Grade Level */}
                                <div className="w-full">

                                    <label
                                        htmlFor="gradeLevel"
                                        className="block text-[#2B75D8] font-poppins text-base font-bold leading-6 mb-2"
                                    >
                                        Grade Level to Enroll
                                    </label>

                                    <select
                                        id="gradeLevel"
                                        name="gradeLevel"
                                        value={formData.gradeLevel}
                                        onChange={(e) =>
                                            updateField("gradeLevel", e.target.value)
                                        }
                                        aria-invalid={!!errors.gradeLevel}
                                        className="w-full h-[60px] rounded-[10px] border border-[#2B75D8] bg-[rgba(43,117,216,0.25)] px-4 font-poppins text-base font-semibold text-[#2B75D8] outline-none focus:ring-2 focus:ring-[#2B75D8]/30 cursor-pointer"
                                    >
                                        <option value="" disabled>
                                            --- Select ---
                                        </option>

                                        {gradeLevels.map((grade) => (
                                            <option
                                                key={grade.value}
                                                value={grade.value}
                                                className="bg-white text-black"
                                            >
                                                {grade.label}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.gradeLevel && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.gradeLevel}
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-[26px] mt-[50px]">

                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-full sm:w-[258px] h-[58px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                >
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                                        <path
                                            d="M18.488 8.651H1M8.651 1L1 8.651L8.651 16.302"
                                            stroke="#2B75D8"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    className="w-full sm:w-[279px] h-[58px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                >
                                    Next

                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                                        <path
                                            d="M1 8.651H18.488M10.837 16.302L18.488 8.651L10.837 1"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                            </div>

                        </form>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 2: PART 1 NAME INFORMATION
            ============================== */}

            {currentStep === 2 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information I - Basic Information
                            <span className="block text-base sm:text-lg font-normal">
                                Please provide your personal details as they appear on your official documents.
                            </span>
                        </h1>

                        {/* Name Section */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5">
                                <h2 className="text-[#2B75D8] font-poppins text-2xl sm:text-3xl font-bold">
                                    Name
                                </h2>
                            </div>

                            {/* Name Fields */}
                            <form onSubmit={handleNext} noValidate className="p-6 sm:p-10">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                                    {/* Last Name */}
                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Last Name *
                                        </label>

                                        <input
                                            id="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) =>
                                                updateField("lastName", e.target.value)
                                            }
                                            placeholder="Enter last name"
                                            aria-invalid={!!errors.lastName}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-[13px] font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>

                                    {/* First Name */}
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            First Name *
                                        </label>

                                        <input
                                            id="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) =>
                                                updateField("firstName", e.target.value)
                                            }
                                            placeholder="Enter first name"
                                            aria-invalid={!!errors.firstName}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-[13px] font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Middle Name */}
                                    <div>
                                        <label
                                            htmlFor="middleName"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Middle Name (Optional)
                                        </label>

                                        <input
                                            id="middleName"
                                            type="text"
                                            value={formData.middleName}
                                            onChange={(e) =>
                                                updateField("middleName", e.target.value)
                                            }
                                            placeholder="Enter middle name"
                                            aria-invalid={!!errors.middleName}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-[13px] font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.middleName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.middleName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Extension Name */}
                                    <div>
                                        <label
                                            htmlFor="extensionName"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Extension Name
                                        </label>

                                        <input
                                            id="extensionName"
                                            type="text"
                                            value={formData.extensionName}
                                            onChange={(e) =>
                                                updateField("extensionName", e.target.value)
                                            }
                                            placeholder="Enter extension name (optional)"
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-[13px] font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                </div>

                                {/* Status */}
                                {status && (
                                    <p role="status" className="text-center text-sm text-[#2B75D8] mt-5">
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 3: PART 1 BACKGROUND INFORMATION
            ============================== */}

            {currentStep === 3 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information I - Basic Information

                            <span className="block text-base sm:text-lg font-normal">
                                Please provide your personal details as they appear on your official documents.
                            </span>
                        </h1>

                        {/* Birth & Background Form */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5">
                                <h2 className="text-[#2B75D8] font-poppins text-2xl sm:text-3xl font-bold">
                                    Birth & Background Details
                                </h2>
                            </div>

                            {/* Form Fields */}
                            <form onSubmit={handleNext} noValidate className="p-6 sm:p-10">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                                    {/* Sex */}
                                    <div>
                                        <label
                                            htmlFor="sex"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Sex
                                        </label>

                                        <select
                                            id="sex"
                                            name="sex"
                                            value={formData.sex}
                                            onChange={(e) => updateField("sex", e.target.value)}
                                            aria-invalid={!!errors.sex}
                                            className="w-full h-[49px] rounded-[10px] border border-[#2B75D8] bg-[rgba(43,117,216,0.25)] px-4 font-poppins text-base font-semibold text-[#2B75D8] outline-none focus:ring-2 focus:ring-[#2B75D8]/30 cursor-pointer"
                                        >
                                            <option value="" disabled>
                                                --- Select ---
                                            </option>

                                            <option value="Male" className="bg-white text-black">
                                                Male
                                            </option>

                                            <option value="Female" className="bg-white text-black">
                                                Female
                                            </option>
                                        </select>

                                        {errors.sex && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.sex}
                                            </p>
                                        )}
                                    </div>

                                    {/* Birthday */}
                                    <div>
                                        <label
                                            htmlFor="birthday"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Birthday
                                        </label>

                                        <input
                                            id="birthday"
                                            name="birthday"
                                            type="date"
                                            value={formData.birthday}
                                            max={new Date().toLocaleDateString("en-CA")}
                                            onChange={(e) => updateField("birthday", e.target.value)}
                                            aria-invalid={!!errors.birthday}
                                            className="w-full h-[49px] rounded-[10px] border border-[#2B75D8] bg-[rgba(43,117,216,0.25)] px-4 font-poppins text-base font-semibold text-[#2B75D8] outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.birthday && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.birthday}
                                            </p>
                                        )}
                                    </div>

                                    {/* Place of Birth */}
                                    <div>
                                        <label
                                            htmlFor="placeOfBirth"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Place of Birth
                                        </label>

                                        <input
                                            id="placeOfBirth"
                                            name="placeOfBirth"
                                            type="text"
                                            value={formData.placeOfBirth}
                                            onChange={(e) =>
                                                updateField("placeOfBirth", e.target.value)
                                            }
                                            placeholder="Enter Place of Birth"
                                            aria-invalid={!!errors.placeOfBirth}
                                            className="w-full h-[51px] rounded-[10px] border border-[#2B75D8] bg-white px-[13px] font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.placeOfBirth && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.placeOfBirth}
                                            </p>
                                        )}
                                    </div>

                                    {/* Age */}
                                    <div>
                                        <label
                                            htmlFor="age"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Age
                                        </label>

                                        <input
                                            id="age"
                                            name="age"
                                            type="text"
                                            value={
                                                formData.birthday
                                                    ? calculateAge(formData.birthday)
                                                    : ""
                                            }
                                            placeholder="Automatically calculated"
                                            readOnly
                                            className="w-full h-[51px] rounded-[10px] border border-[#2B75D8] bg-gray-50 px-[13px] font-poppins text-[15px] text-black outline-none"
                                        />

                                        <p className="text-gray-400 text-xs mt-1">
                                            Automatically calculated from birthday.
                                        </p>
                                    </div>

                                </div>

                                {/* Status */}
                                {status && (
                                    <p
                                        role="status"
                                        className="text-center text-sm text-[#2B75D8] mt-5"
                                    >
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            )}

            
            {/* ==============================
                SCREEN 4: PART 2 ADDRESS INFORMATION
            ============================== */}

            {currentStep === 4 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information II - Address

                            <span className="block text-base sm:text-lg font-normal">
                                Please provide your personal details as they appear on your official documents.
                            </span>
                        </h1>

                        {/* Address Form Box */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5 min-h-[86px] flex items-center">
                                <h2 className="text-[#2B75D8] font-poppins text-2xl sm:text-3xl font-bold">
                                    Address
                                </h2>
                            </div>

                            {/* Address Fields */}
                            <form
                                onSubmit={handleNext}
                                noValidate
                                className="p-6 sm:p-10"
                            >

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-6">

                                    {/* House No. / Street */}
                                    <div>
                                        <label
                                            htmlFor="houseNoStreet"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            House No. / Street
                                        </label>

                                        <input
                                            id="houseNoStreet"
                                            type="text"
                                            value={formData.houseNoStreet}
                                            onChange={(e) =>
                                                updateField("houseNoStreet", e.target.value)
                                            }
                                            placeholder="Enter house no. / street"
                                            aria-invalid={!!errors.houseNoStreet}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.houseNoStreet && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.houseNoStreet}
                                            </p>
                                        )}
                                    </div>

                                    {/* Sitio / Street Name */}
                                    <div>
                                        <label
                                            htmlFor="sitioStreet"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Sitio / Street Name
                                        </label>

                                        <input
                                            id="sitioStreet"
                                            type="text"
                                            value={formData.sitioStreet}
                                            onChange={(e) =>
                                                updateField("sitioStreet", e.target.value)
                                            }
                                            placeholder="Enter sitio / street name"
                                            aria-invalid={!!errors.sitioStreet}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.sitioStreet && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.sitioStreet}
                                            </p>
                                        )}
                                    </div>

                                    {/* ZIP Code */}
                                    <div>
                                        <label
                                            htmlFor="zipCode"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            ZIP Code
                                        </label>

                                        <input
                                            id="zipCode"
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={4}
                                            value={formData.zipCode}
                                            onChange={(e) =>
                                                updateField(
                                                    "zipCode",
                                                    e.target.value.replace(/\D/g, "").slice(0, 4)
                                                )
                                            }
                                            placeholder="Enter ZIP code"
                                            aria-invalid={!!errors.zipCode}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.zipCode && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.zipCode}
                                            </p>
                                        )}
                                    </div>

                                    {/* Barangay */}
                                    <div>
                                        <label
                                            htmlFor="barangay"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Barangay
                                        </label>

                                        <select
                                            id="barangay"
                                            name="barangay"
                                            value={formData.barangay}
                                            onChange={(e) => updateField("barangay", e.target.value)}
                                            aria-invalid={!!errors.barangay}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        >
                                            <option value="">--- Select Barangay ---</option>
                                            {barangays.map((barangay) => <option key={barangay} value={barangay}>{barangay}</option>)}
                                        </select>

                                        {errors.barangay && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.barangay}
                                            </p>
                                        )}
                                    </div>

                                    {/* Province */}
                                    <div>
                                        <label
                                            htmlFor="province"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Province
                                        </label>

                                        <input
                                            id="province"
                                            type="text"
                                            value={formData.province}
                                            onChange={(e) =>
                                                updateField("province", e.target.value)
                                            }
                                            placeholder="Enter province"
                                            aria-invalid={!!errors.province}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.province && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.province}
                                            </p>
                                        )}
                                    </div>

                                    {/* Municipality / City */}
                                    <div>
                                        <label
                                            htmlFor="municipalityCity"
                                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                        >
                                            Municipality / City
                                        </label>

                                        <input
                                            id="municipalityCity"
                                            type="text"
                                            value={formData.municipalityCity}
                                            onChange={(e) =>
                                                updateField("municipalityCity", e.target.value)
                                            }
                                            placeholder="Enter municipality / city"
                                            aria-invalid={!!errors.municipalityCity}
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />

                                        {errors.municipalityCity && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.municipalityCity}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* Status */}
                                {status && (
                                    <p
                                        role="status"
                                        className="text-center text-sm text-[#2B75D8] mt-5"
                                    >
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 5: PART 3 PARENT / GUARDIAN INFORMATION
            ============================== */}

            {currentStep === 5 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information III - Guardian Information

                            <span className="block text-base sm:text-lg font-normal">
                                Please provide your parent's or guardian's information as it appears on their official documents.
                            </span>
                        </h1>

                        {/* Guardian Form Box */}
                        <div className="w-full max-w-[1285px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5 min-h-[86px] flex items-center">
                                <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-bold">
                                    Parent's/Guardian's Information
                                </h2>
                            </div>

                            <form
                                onSubmit={handleNext}
                                noValidate
                                className="p-6 sm:p-8 lg:p-10"
                            >

                                {[
                                    {
                                        title: "Father's Name",
                                        prefix: "father",
                                    },
                                    {
                                        title: "Mother's Name",
                                        prefix: "mother",
                                    },
                                    {
                                        title:
                                            (formData.fatherUnknown || formData.fatherDeceased) &&
                                            (formData.motherUnknown || formData.motherDeceased)
                                                ? "Legal Guardian's Name (Required)"
                                                : "Legal Guardian's Name (Optional)",
                                        prefix: "guardian",
                                    },
                                ].map((person) => (
                                    <section
                                        key={person.prefix}
                                        className="mb-9 last:mb-0"
                                    >

                                        {/* Person heading and deceased checkbox */}
                                        <div className="flex flex-wrap items-center gap-4 mb-4">

                                            <h3 className="text-[#2B75D8] font-poppins text-[15px] font-bold">
                                                {person.title}
                                            </h3>
                                            {person.prefix !== "guardian" && (
                                                <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData[`${person.prefix}Deceased`]}
                                                        onChange={(e) =>
                                                            updateField(
                                                                `${person.prefix}Deceased`,
                                                                e.target.checked
                                                            )
                                                        }
                                                        disabled={formData[`${person.prefix}Unknown`]}
                                                        className="w-4 h-4 accent-[#2B75D8] cursor-pointer"
                                                    />
                                                    Deceased
                                                </label>
                                            )}
                                            {person.prefix !== "guardian" && (
                                                <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData[`${person.prefix}Unknown`]}
                                                        onChange={(e) =>
                                                            handleUnknownParent(person.prefix, e.target.checked)
                                                        }
                                                        className="w-4 h-4 accent-[#2B75D8] cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                    />

                                                    I don't know this parent's name
                                                </label>
                                            )}

                                        </div>

                                        {/* Input Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">

                                            {/* Last Name */}
                                            <div>
                                                <label
                                                    htmlFor={`${person.prefix}LastName`}
                                                    className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                                >
                                                    Last Name *
                                                </label>

                                                <input
                                                    id={`${person.prefix}LastName`}
                                                    type="text"
                                                    value={formData[`${person.prefix}LastName`]}
                                                    onChange={(e) =>
                                                        updateField(
                                                            `${person.prefix}LastName`,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter last name"
                                                    aria-invalid={!!errors[`${person.prefix}LastName`]}
                                                    disabled={
                                                        person.prefix !== "guardian" &&
                                                        formData[`${person.prefix}Unknown`]
                                                    }
                                                    className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                />

                                                {errors[`${person.prefix}LastName`] && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors[`${person.prefix}LastName`]}
                                                    </p>
                                                )}
                                            </div>

                                            {/* First Name */}
                                            <div>
                                                <label
                                                    htmlFor={`${person.prefix}FirstName`}
                                                    className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                                >
                                                    First Name *
                                                </label>

                                                <input
                                                    id={`${person.prefix}FirstName`}
                                                    type="text"
                                                    value={formData[`${person.prefix}FirstName`]}
                                                    onChange={(e) =>
                                                        updateField(
                                                            `${person.prefix}FirstName`,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter first name"
                                                    aria-invalid={!!errors[`${person.prefix}FirstName`]}
                                                    disabled={
                                                        person.prefix !== "guardian" &&
                                                        formData[`${person.prefix}Unknown`]
                                                    }
                                                    className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                />

                                                {errors[`${person.prefix}FirstName`] && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors[`${person.prefix}FirstName`]}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Middle Name */}
                                            <div>
                                                <label
                                                    htmlFor={`${person.prefix}MiddleName`}
                                                    className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                                >
                                                    Middle Name
                                                </label>

                                                <input
                                                    id={`${person.prefix}MiddleName`}
                                                    type="text"
                                                    value={formData[`${person.prefix}MiddleName`]}
                                                    onChange={(e) =>
                                                        updateField(
                                                            `${person.prefix}MiddleName`,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter middle name"
                                                    disabled={
                                                        person.prefix !== "guardian" &&
                                                        formData[`${person.prefix}Unknown`]
                                                    }
                                                    className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            {/* Contact Number */}
                                            <div>
                                                <label
                                                    htmlFor={`${person.prefix}ContactNumber`}
                                                    className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                                >
                                                    Contact Number *
                                                </label>

                                                <input
                                                    id={`${person.prefix}ContactNumber`}
                                                    type="tel"
                                                    inputMode="numeric"
                                                    maxLength={12}
                                                    value={formData[`${person.prefix}ContactNumber`]}
                                                    onChange={(e) =>
                                                        updateField(
                                                            `${person.prefix}ContactNumber`,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter contact number"
                                                    aria-invalid={!!errors[`${person.prefix}ContactNumber`]}
                                                    disabled={
                                                        person.prefix !== "guardian" &&
                                                        formData[`${person.prefix}Unknown`]
                                                    }
                                                    className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                />

                                                {errors[`${person.prefix}ContactNumber`] && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors[`${person.prefix}ContactNumber`]}
                                                    </p>
                                                )}
                                            </div>

                                        </div>

                                    </section>
                                ))}

                                {/* Status */}
                                {status && (
                                    <p
                                        role="status"
                                        className="text-center text-sm text-[#2B75D8] mt-5"
                                    >
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 6: PART 3 PARENT / GUARDIAN ADDRESS INFORMATION
            ============================== */}

            {currentStep === 6 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information III - Guardian Information

                            <span className="block text-base sm:text-lg font-normal">
                                Please provide the father's complete address information.
                            </span>
                        </h1>

                        {/* Father's Address Form Box */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5 min-h-[86px] flex items-center">
                                <h2 className="text-[#2B75D8] font-poppins text-2xl sm:text-3xl font-bold">
                                    Father's Address
                                </h2>
                            </div>

                            {/* Address Fields */}
                            <form
                                onSubmit={handleNext}
                                noValidate
                                className="p-6 sm:p-10"
                            >

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-6">

                                    {[
                                        {
                                            name: "fatherHouseNoStreet",
                                            label: "House No. / Street",
                                            placeholder: "Enter house no. / street",
                                        },
                                        {
                                            name: "fatherSitioStreet",
                                            label: "Sitio / Street Name",
                                            placeholder: "Enter sitio / street name",
                                        },
                                        {
                                            name: "fatherZipCode",
                                            label: "ZIP Code",
                                            placeholder: "Enter ZIP code",
                                        },
                                        {
                                            name: "fatherBarangay",
                                            label: "Barangay",
                                            placeholder: "Enter barangay",
                                        },
                                        {
                                            name: "fatherProvince",
                                            label: "Province",
                                            placeholder: "Enter province",
                                            className: "sm:col-span-1 lg:col-span-2",
                                        },
                                        {
                                            name: "fatherMunicipalityCity",
                                            label: "Municipality / City",
                                            placeholder: "Enter municipality / city",
                                        }
                                    ].map((field) => (
                                        <div
                                            key={field.name}
                                            className={field.className || ""}
                                        >
                                            <label
                                                htmlFor={field.name}
                                                className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                            >
                                                {field.label}
                                            </label>

                                            {field.name.toLowerCase().includes("barangay") ? (
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onChange={(e) => updateField(field.name, e.target.value)}
                                                    aria-invalid={!!errors[field.name]}
                                                    className={`w-full h-[50px] rounded-[10px] border bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 ${
                                                        errors[field.name] ? "border-red-500" : "border-[#2B75D8]"
                                                    }`}
                                                >
                                                    <option value="">--- Select Barangay ---</option>
                                                    {barangays.map((barangay) => <option key={barangay} value={barangay}>{barangay}</option>)}
                                                </select>
                                            ) : (
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    inputMode={field.name.toLowerCase().includes("zipcode") ? "numeric" : undefined}
                                                    maxLength={field.name.toLowerCase().includes("zipcode") ? 4 : MAX_ADDRESS_LENGTH}
                                                    value={formData[field.name] || ""}
                                                    onChange={(e) => updateField(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    aria-invalid={!!errors[field.name]}
                                                    className={`w-full h-[50px] rounded-[10px] border bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 ${
                                                        errors[field.name] ? "border-red-500" : "border-[#2B75D8]"
                                                    }`}
                                                />
                                            )}

                                            {errors[field.name] && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors[field.name]}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                </div>

                                {/* Status */}
                                {status && (
                                    <p
                                        role="status"
                                        className="text-center text-sm text-[#2B75D8] mt-5"
                                    >
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 7: PART 3 PARENT / GUARDIAN ADDRESS INFORMATION
            ============================== */}

            {currentStep === 7 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">
                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information III - Guardian Information

                            <span className="block text-base sm:text-lg font-normal">
                                Please provide the mother's complete address information.
                            </span>
                        </h1>

                        {/* Mother's Address Form Box */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5 min-h-[86px] flex items-center">
                                <h2 className="text-[#2B75D8] font-poppins text-2xl sm:text-3xl font-bold">
                                    Mother's Address
                                </h2>
                            </div>

                            <form onSubmit={handleNext} noValidate className="p-6 sm:p-10">

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-6">
                                    {[
                                        {
                                            name: "motherHouseNoStreet",
                                            label: "House No. / Street",
                                            placeholder: "Enter house no. / street",
                                        },
                                        {
                                            name: "motherSitioStreet",
                                            label: "Sitio / Street Name",
                                            placeholder: "Enter sitio / street name",
                                        },
                                        {
                                            name: "motherZipCode",
                                            label: "ZIP Code",
                                            placeholder: "Enter ZIP code",
                                        },
                                        {
                                            name: "motherBarangay",
                                            label: "Barangay",
                                            placeholder: "Enter barangay",
                                        },
                                        {
                                            name: "motherProvince",
                                            label: "Province",
                                            placeholder: "Enter province",
                                            className: "sm:col-span-1 lg:col-span-2",
                                        },
                                        {
                                            name: "motherMunicipalityCity",
                                            label: "Municipality / City",
                                            placeholder: "Enter municipality / city",
                                        }
                                    ].map((field) => (
                                        <div key={field.name} className={field.className || ""}>
                                            <label
                                                htmlFor={field.name}
                                                className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                            >
                                                {field.label}
                                            </label>

                                            {field.name.toLowerCase().includes("barangay") ? (
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onChange={(e) => updateField(field.name, e.target.value)}
                                                    aria-invalid={!!errors[field.name]}
                                                    className={`w-full h-[50px] rounded-[10px] border bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 ${
                                                        errors[field.name] ? "border-red-500" : "border-[#2B75D8]"
                                                    }`}
                                                >
                                                    <option value="">--- Select Barangay ---</option>
                                                    {barangays.map((barangay) => <option key={barangay} value={barangay}>{barangay}</option>)}
                                                </select>
                                            ) : (
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    inputMode={field.name.toLowerCase().includes("zipcode") ? "numeric" : undefined}
                                                    maxLength={field.name.toLowerCase().includes("zipcode") ? 4 : MAX_ADDRESS_LENGTH}
                                                    value={formData[field.name] || ""}
                                                    onChange={(e) => updateField(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    aria-invalid={!!errors[field.name]}
                                                    className={`w-full h-[50px] rounded-[10px] border bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 ${
                                                        errors[field.name] ? "border-red-500" : "border-[#2B75D8]"
                                                    }`}
                                                />
                                            )}

                                            {errors[field.name] && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors[field.name]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {status && (
                                    <p role="status" className="text-center text-sm text-[#2B75D8] mt-5">
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            )}
            
            {/* ==============================
                SCREEN 8: PART 3 PARENT / GUARDIAN ADDRESS INFORMATION
            ============================== */}

            {currentStep === 8 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">
                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information III - Guardian Information

                            <span className="block text-base sm:text-lg font-normal">
                                Please provide the legal guardian's address information.
                            </span>
                        </h1>

                        {/* Legal Guardian's Address */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] px-6 py-5 min-h-[86px] flex items-center">
                                <h2 className="text-[#2B75D8] font-poppins text-2xl sm:text-3xl font-bold">
                                    Legal Guardian's Address
                                </h2>
                            </div>

                            <form
                                onSubmit={handleNext}
                                noValidate
                                className="p-6 sm:p-10"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-6">

                                    {[
                                        {
                                            name: "guardianHouseNoStreet",
                                            label: "House No. / Street",
                                            placeholder: "Enter house no. / street",
                                        },
                                        {
                                            name: "guardianSitioStreet",
                                            label: "Sitio / Street Name",
                                            placeholder: "Enter sitio / street name",
                                        },
                                        {
                                            name: "guardianZipCode",
                                            label: "ZIP Code",
                                            placeholder: "Enter ZIP code",
                                        },
                                        {
                                            name: "guardianBarangay",
                                            label: "Barangay",
                                            placeholder: "Enter barangay",
                                        },
                                        {
                                            name: "guardianProvince",
                                            label: "Province",
                                            placeholder: "Enter province",
                                            className: "sm:col-span-1 lg:col-span-2",
                                        },
                                        {
                                            name: "guardianMunicipalityCity",
                                            label: "Municipality / City",
                                            placeholder: "Enter municipality / city",
                                        }
                                    ].map((field) => (
                                        <div
                                            key={field.name}
                                            className={field.className || ""}
                                        >
                                            <label
                                                htmlFor={field.name}
                                                className="block text-[#2B75D8] font-poppins text-[15px] font-bold mb-2"
                                            >
                                                {field.label}
                                            </label>

                                            {field.name.toLowerCase().includes("barangay") ? (
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onChange={(e) => updateField(field.name, e.target.value)}
                                                    aria-invalid={!!errors[field.name]}
                                                    className={`w-full h-[50px] rounded-[10px] border bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 ${
                                                        errors[field.name] ? "border-red-500" : "border-[#2B75D8]" 
                                                    }`}
                                                >
                                                    <option value="">--- Select Barangay ---</option>
                                                    {barangays.map((barangay) => <option key={barangay} value={barangay}>{barangay}</option>)}
                                                </select>
                                            ) : (
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    inputMode={field.name.toLowerCase().includes("zipcode") ? "numeric" : undefined}
                                                    maxLength={field.name.toLowerCase().includes("zipcode") ? 4 : MAX_ADDRESS_LENGTH}
                                                    value={formData[field.name] || ""}
                                                    onChange={(e) => updateField(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    aria-invalid={!!errors[field.name]}
                                                    className={`w-full h-[50px] rounded-[10px] border bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 ${
                                                        errors[field.name] ? "border-red-500" : "border-[#2B75D8]"
                                                    }`}
                                                />
                                            )} {errors[field.name] && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors[field.name]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 9: PART 4 ADVANCE INFORMATION
            ============================== */}

            {currentStep === 9 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information IV - Advanced Information
                        </h1>

                        {/* Advanced Information Form */}
                        <div className="w-full max-w-[725px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden bg-white">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] min-h-[85px] flex items-center px-6 sm:px-10">
                                <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-3xl font-bold">
                                    Advanced Information - (Optional)
                                </h2>
                            </div>

                            <form
                                onSubmit={handleNext}
                                noValidate
                                className="p-6 sm:px-[35px] sm:py-5"
                            >

                                {/* PSA Birth Certificate + Mother Tongue */}
                                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5 mb-5">

                                    <div>
                                        <label
                                            htmlFor="psaBirthCertificateNo"
                                            className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                        >
                                            PSA Birth Certificate No. (If Available Upon Registration)
                                        </label>

                                        <input
                                            id="psaBirthCertificateNo"
                                            name="psaBirthCertificateNo"
                                            type="text"
                                            value={formData.psaBirthCertificateNo}
                                            onChange={(e) =>
                                                updateField("psaBirthCertificateNo", e.target.value)
                                            }
                                            placeholder="Enter PSA Birth Certificate No."
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="motherTongue"
                                            className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                        >
                                            Mother Tongue
                                        </label>

                                        <input
                                            id="motherTongue"
                                            name="motherTongue"
                                            type="text"
                                            value={formData.motherTongue}
                                            onChange={(e) =>
                                                updateField("motherTongue", e.target.value)
                                            }
                                            placeholder="Enter Mother Tongue"
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                </div>

                                {/* Indigenous Peoples Information */}
                                <div className="mb-6">

                                    <label className="block text-[#2B75D8] font-poppins text-[15px] mb-3">
                                        Belonging to any Indigenous Peoples (IP) Community / Indigenous Cultural Community?
                                    </label>

                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-4">

                                        {[
                                            { value: "yes", label: "Yes" },
                                            { value: "no", label: "No" },
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[15px] cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="isIndigenous"
                                                    value={option.value}
                                                    checked={formData.isIndigenous === option.value}
                                                    onChange={(e) => {
                                                        updateField("isIndigenous", e.target.value);

                                                        if (e.target.value === "no") {
                                                            updateField("indigenousSpecification", "");
                                                        }
                                                    }}
                                                    className="w-4 h-4 accent-[#2B75D8]"
                                                />
                                                {option.label}
                                            </label>
                                        ))}

                                    </div>

                                    <label
                                        htmlFor="indigenousSpecification"
                                        className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                    >
                                        If Yes, Please Specify:
                                    </label>

                                    <input
                                        id="indigenousSpecification"
                                        name="indigenousSpecification"
                                        type="text"
                                        value={formData.indigenousSpecification}
                                        onChange={(e) =>
                                            updateField("indigenousSpecification", e.target.value)
                                        }
                                        placeholder="Enter Indigenous Peoples community"
                                        disabled={formData.isIndigenous !== "yes"}
                                        className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />

                                </div>

                                {/* 4Ps Beneficiary Information */}
                                <div className="mb-2">

                                    <label className="block text-[#2B75D8] font-poppins text-[15px] mb-3">
                                        Is Your Family a beneficiary of 4Ps?
                                    </label>

                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-4">

                                        {[
                                            { value: "yes", label: "Yes" },
                                            { value: "no", label: "No" },
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[15px] cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="isFourPsBeneficiary"
                                                    value={option.value}
                                                    checked={formData.isFourPsBeneficiary === option.value}
                                                    onChange={(e) => {
                                                        updateField("isFourPsBeneficiary", e.target.value);

                                                        if (e.target.value === "no") {
                                                            updateField("fourPsHouseholdId", "");
                                                        }
                                                    }}
                                                    className="w-4 h-4 accent-[#2B75D8]"
                                                />
                                                {option.label}
                                            </label>
                                        ))}

                                    </div>

                                    <label
                                        htmlFor="fourPsHouseholdId"
                                        className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                    >
                                        If Yes, write the 4Ps Household ID Number below
                                    </label>

                                    <input
                                        id="fourPsHouseholdId"
                                        name="fourPsHouseholdId"
                                        type="text"
                                        value={formData.fourPsHouseholdId}
                                        onChange={(e) =>
                                            updateField("fourPsHouseholdId", e.target.value)
                                        }
                                        placeholder="Enter 4Ps Household ID number"
                                        disabled={formData.isFourPsBeneficiary !== "yes"}
                                        className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />

                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 10: PART 4 ADVANCE INFORMATION
            ============================== */}

            {currentStep === 10 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">
                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Page Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information IV - Advanced Information
                        </h1>

                        {/* Disability Information Card */}
                        <div className="w-full max-w-[1000px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden bg-white">

                            {/* Card Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] min-h-[85px] flex items-center px-6 sm:px-10">
                                <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-3xl font-bold">
                                    Advanced Information - (Optional)
                                </h2>
                            </div>

                            <form onSubmit={handleNext} noValidate className="px-6 sm:px-[35px] py-6">

                                {/* Yes / No Question */}
                                <div className="mb-7">
                                    <p className="text-[#2B75D8] font-poppins text-[15px] mb-3">
                                        Is the Child a Learner with Disability?
                                    </p>

                                    <div className="flex items-center gap-8">
                                        {[
                                            { value: "yes", label: "Yes" },
                                            { value: "no", label: "No" },
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[15px] cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="isLearnerWithDisability"
                                                    value={option.value}
                                                    checked={
                                                        formData.isLearnerWithDisability === option.value
                                                    }
                                                    onChange={(e) => {
                                                        const value = e.target.value;

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            isLearnerWithDisability: value,
                                                            disabilityTypes:
                                                                value === "no"
                                                                    ? []
                                                                    : prev.disabilityTypes,
                                                        }));

                                                        setStatus("");
                                                    }}
                                                    className="w-4 h-4 accent-[#2B75D8]"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Disability Options */}
                                <fieldset
                                    disabled={formData.isLearnerWithDisability !== "yes"}
                                    className="disabled:opacity-50"
                                >
                                    <legend className="text-[#2B75D8] font-poppins text-[13px] mb-5">
                                        If Yes, Specify the type of disability:
                                    </legend>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6">

                                        {/* Column 1 */}
                                        <div className="space-y-4">

                                            <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.disabilityTypes.includes("Visual Impairment")}
                                                    onChange={() => toggleDisabilityType("Visual Impairment")}
                                                    className="w-3.5 h-4 accent-[#2B75D8]"
                                                />
                                                Visual Impairment
                                            </label>

                                            <div className="pl-5 space-y-3">
                                                <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.disabilityTypes.includes("Blind")}
                                                        onChange={() => toggleDisabilityType("Blind")}
                                                        className="w-3.5 h-4 accent-[#2B75D8]"
                                                    />
                                                    a. blind
                                                </label>

                                                <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.disabilityTypes.includes("Low Vision")}
                                                        onChange={() => toggleDisabilityType("Low Vision")}
                                                        className="w-3.5 h-4 accent-[#2B75D8]"
                                                    />
                                                    b. low vision
                                                </label>
                                            </div>

                                            <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.disabilityTypes.includes("Multiple Disorder")}
                                                    onChange={() => toggleDisabilityType("Multiple Disorder")}
                                                    className="w-3.5 h-4 accent-[#2B75D8]"
                                                />
                                                Multiple Disorder
                                            </label>
                                        </div>

                                        {/* Column 2 */}
                                        <div className="space-y-4">

                                            {[
                                                "Hearing Impairment",
                                                "Autism Spectrum Disorder",
                                                "Speech Language Disorder",
                                            ].map((type) => (
                                                <label
                                                    key={type}
                                                    className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.disabilityTypes.includes(type)}
                                                        onChange={() => toggleDisabilityType(type)}
                                                        className="w-3.5 h-4 accent-[#2B75D8] shrink-0"
                                                    />
                                                    {type}
                                                </label>
                                            ))}
                                        </div>

                                        {/* Column 3 */}
                                        <div className="space-y-4">

                                            {[
                                                "Learning Disability",
                                                "Emotional-Behavioral Disorder",
                                                "Cerebral Palsy",
                                            ].map((type) => (
                                                <label
                                                    key={type}
                                                    className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.disabilityTypes.includes(type)}
                                                        onChange={() => toggleDisabilityType(type)}
                                                        className="w-3.5 h-4 accent-[#2B75D8] shrink-0"
                                                    />
                                                    {type}
                                                </label>
                                            ))}
                                        </div>

                                        {/* Column 4 */}
                                        <div className="space-y-4">

                                            {[
                                                "Intellectual Disability",
                                                "Orthopedic/Physical Handicap",
                                                "Special Health Problem/Chronic Disease",
                                            ].map((type) => (
                                                <label
                                                    key={type}
                                                    className="flex items-start gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.disabilityTypes.includes(type)}
                                                        onChange={() => toggleDisabilityType(type)}
                                                        className="w-3.5 h-4 accent-[#2B75D8] shrink-0 mt-0.5"
                                                    />
                                                    {type}
                                                </label>
                                            ))}

                                            <div className="pl-5">
                                                <label className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.disabilityTypes.includes("Cancer")}
                                                        onChange={() => toggleDisabilityType("Cancer")}
                                                        className="w-3.5 h-4 accent-[#2B75D8]"
                                                    />
                                                    a. Cancer
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next
                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 11: PART 4 ADVANCE INFORMATION
            ============================== */}

            {currentStep === 11 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        {/* Page Heading */}
                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information IV - Advanced Information
                        </h1>

                        {/* Main Form Card */}
                        <div className="w-full max-w-[1040px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden bg-white">

                            {/* Section Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] min-h-[57px] flex items-center px-4">
                                <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-[25px] font-bold">
                                    Advanced Information - (Optional)
                                </h2>
                            </div>

                            <form
                                onSubmit={handleNext}
                                noValidate
                                className="px-5 sm:px-[30px] py-6 sm:py-5"
                            >

                                {/* Returning Learners */}
                                <h3 className="text-[#2B75D8] font-poppins text-[14px] sm:text-[15px] font-bold mb-5 text-center">
                                    For Returning Learner (Balik-Aral) and Those Who will Transfer/Move In
                                </h3>

                                {/* Previous School Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

                                    {/* Last Grade Level Completed */}
                                    <div>
                                        <label
                                            htmlFor="lastGradeLevelCompleted"
                                            className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                        >
                                            Last Grade Level Completed
                                        </label>

                                        <input
                                            id="lastGradeLevelCompleted"
                                            name="lastGradeLevelCompleted"
                                            type="text"
                                            value={formData.lastGradeLevelCompleted}
                                            onChange={(e) =>
                                                updateField("lastGradeLevelCompleted", e.target.value)
                                            }
                                            placeholder="Enter grade level completed"
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                    {/* Last School Year Completed */}
                                    <div>
                                        <label
                                            htmlFor="lastSchoolYearCompleted"
                                            className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                        >
                                            Last School Year Completed
                                        </label>

                                        <input
                                            id="lastSchoolYearCompleted"
                                            name="lastSchoolYearCompleted"
                                            type="text"
                                            value={formData.lastSchoolYearCompleted}
                                            onChange={(e) =>
                                                updateField("lastSchoolYearCompleted", e.target.value)
                                            }
                                            placeholder="e.g. 2024-2025"
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                    {/* Last School Attended */}
                                    <div>
                                        <label
                                            htmlFor="lastSchoolAttended"
                                            className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                        >
                                            Last School Attended
                                        </label>

                                        <input
                                            id="lastSchoolAttended"
                                            name="lastSchoolAttended"
                                            type="text"
                                            value={formData.lastSchoolAttended}
                                            onChange={(e) =>
                                                updateField("lastSchoolAttended", e.target.value)
                                            }
                                            placeholder="Enter last school attended"
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                    {/* School ID */}
                                    <div>
                                        <label
                                            htmlFor="schoolId"
                                            className="block text-[#2B75D8] font-poppins text-[15px] mb-2"
                                        >
                                            School ID
                                        </label>

                                        <input
                                            id="schoolId"
                                            name="schoolId"
                                            type="text"
                                            value={formData.schoolId}
                                            onChange={(e) =>
                                                updateField("schoolId", e.target.value)
                                            }
                                            placeholder="Enter school ID"
                                            className="w-full h-[50px] rounded-[10px] border border-[#2B75D8] bg-white px-3 font-poppins text-[15px] text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                                        />
                                    </div>

                                </div>

                                {/* Status Message */}
                                {status && (
                                    <p
                                        role="status"
                                        className="mt-5 text-center text-sm text-[#2B75D8] font-poppins"
                                    >
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    {/* Back */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        Back
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next

                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 12: PART 4 ADVANCE INFORMATION
            ============================== */}

            {currentStep === 12 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">
                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[639px] px-5 sm:px-8 py-[26px]">

                        <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold leading-9 mb-8">
                            Learner Information IV - Advanced Information
                        </h1>

                        <div className="w-full max-w-[1046px] mx-auto border border-[#2B75D8] rounded-[15px] overflow-hidden bg-white">

                            {/* Card Header */}
                            <div className="bg-[rgba(43,117,216,0.25)] min-h-[57px] flex items-center px-4">
                                <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-[25px] font-bold">
                                    Consent
                                </h2>
                            </div>

                            <div className="p-4 sm:p-[17px]">

                                {/* Learning Modality Preferences */}
                                <div className="border border-[#2B75D8] p-4 sm:px-5 sm:py-3">

                                    <h3 className="text-[#2B75D8] font-poppins text-sm font-bold leading-6 mb-1">
                                        If school will implement other distance learning modalities aside from face-to-face instruction, what would you prefer for your child?
                                    </h3>

                                    <p className="text-[#2B75D8] font-poppins text-[13px] mb-5">
                                        Choose all that Apply:
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">

                                        {[
                                            "Modular (Print)",
                                            "Modular (Digital)",
                                            "Online",
                                            "Educational Television",
                                            "Radio-Based Instruction",
                                            "Homeschooling",
                                            "Blended",
                                        ].map((modality) => (
                                            <label
                                                key={modality}
                                                className="flex items-center gap-3 text-[#2B75D8] font-poppins text-[13px] cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={(
                                                        formData.preferredLearningModalities || []
                                                    ).includes(modality)}
                                                    onChange={(e) => {
                                                        const current =
                                                            formData.preferredLearningModalities || [];

                                                        const updated = e.target.checked
                                                            ? [...current, modality]
                                                            : current.filter(
                                                                (item) => item !== modality
                                                            );

                                                        updateField(
                                                            "preferredLearningModalities",
                                                            updated
                                                        );
                                                    }}
                                                    className="w-4 h-4 accent-[#2B75D8] shrink-0"
                                                />

                                                {modality}
                                            </label>
                                        ))}

                                    </div>
                                </div>

                                {/* Certification Statement */}
                                <div className="max-w-[850px] mx-auto mt-10 text-center">

                                    <p className="text-[#2B75D8] font-poppins text-[13px] font-bold leading-7">
                                        I hereby certify that the above information given are true and correct to the best of my knowledge and I allow the Department of Education to use my child’s details to create and/or update his/her learner profile in the Learner Information System. The information herein shall be treated as confidential in compliance with the Data Privacy Act of 2012.
                                    </p>

                                </div>

                                {/* Consent Choice */}
                                <fieldset className="mt-7">
                                    <legend className="sr-only">
                                        Consent confirmation
                                    </legend>

                                    <div className="flex justify-center items-center gap-12">

                                        {[
                                            { value: "Yes", label: "Yes" },
                                            { value: "No", label: "No" },
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-[#2B75D8] font-poppins text-[13px] cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="consentToDataProcessing"
                                                    value={option.value}
                                                    checked={
                                                        formData.consentToDataProcessing ===
                                                        option.value
                                                    }
                                                    onChange={(e) =>
                                                        updateField(
                                                            "consentToDataProcessing",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-4 h-4 accent-[#2B75D8]"
                                                />

                                                {option.label}
                                            </label>
                                        ))}

                                    </div>
                                </fieldset>

                                {/* Validation Message */}
                                {status && (
                                    <p
                                        role="status"
                                        className="mt-5 text-center text-sm text-[#2B75D8] font-poppins"
                                    >
                                        {status}
                                    </p>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                                    >
                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M17 8H1M8 1L1 8L8 15"
                                                stroke="#2B75D8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                                    >
                                        Next
                                        <svg
                                            width="18"
                                            height="16"
                                            viewBox="0 0 18 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M1 8H17M10 1L17 8L10 15"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 13: PART 5 CONFIRMATION AND SUBMISSION
            ============================== */}

            {currentStep === 13 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">
                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[704px] px-5 sm:px-8 py-[26px]">

                        {/* Page Heading */}
                        <div className="flex justify-center items-center gap-3 mb-8">
                            <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-bold">
                                Confirm your Information
                            </h1>

                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    d="M15 0C6.71591 0 0 6.71591 0 15C0 23.2841 6.71591 30 15 30C23.2841 30 30 23.2841 30 15C30 6.71591 23.2841 0 15 0ZM21.5018 12.4636L13.5436 17.7532L10.5095 14.7177"
                                    fill="#2B75D8"
                                />
                                <path
                                    d="M8.6 15.7L13.5 20.6L21.5 11"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* Information Cards */}
                        <div className="max-w-[1260px] mx-auto space-y-8">

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                <section className="border border-[#2B75D8] rounded-[15px] overflow-hidden">

                                    <div className="bg-[rgba(43,117,216,0.25)] px-6 py-4">
                                        <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-[25px] font-semibold">
                                            Basic Information
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 p-6">

                                        {[
                                            ["LRN", formData.lrn],
                                            ["Birthday", formData.birthday],
                                            ["Last Name", formData.lastName],
                                            ["Sex", formData.sex],
                                            ["First Name", formData.firstName],
                                            ["Place of Birth", formData.placeOfBirth],
                                            ["Middle Name", formData.middleName],
                                            ["Mother Tongue", formData.motherTongue],
                                            ["Ext. Name", formData.extensionName],
                                            ["Grade Level to Enroll", formData.gradeLevel],
                                        ].map(([label, value]) => (
                                            <div key={label}>
                                                <p className="text-[#2B75D8] font-inter text-sm mb-1">
                                                    {label}
                                                </p>

                                                <p className="text-[#2B75D8] font-inter text-base font-bold break-words">
                                                    {value || "—"}
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </section>

                                {/* Address */}
                                <section className="border border-[#2B75D8] rounded-[15px] overflow-hidden">

                                    <div className="bg-[rgba(43,117,216,0.25)] px-6 py-4">
                                        <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-[25px] font-semibold">
                                            Address
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 p-6">

                                        {[
                                            ["House No. / Street", formData.houseNoStreet],
                                            ["Subdivision / Barangay", formData.sitioStreet],
                                            ["Province", formData.province],
                                            ["Municipality / City", formData.municipalityCity],
                                            ["Zip Code", formData.zipCode],
                                        ].map(([label, value]) => (
                                            <div key={label}>
                                                <p className="text-[#2B75D8] font-inter text-sm mb-1">
                                                    {label}
                                                </p>

                                                <p className="text-[#2B75D8] font-inter text-base font-bold break-words">
                                                    {value || "—"}
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </section>

                            </div>

                            {/* Parent / Guardian Information */}
                            <section className="border border-[#2B75D8] rounded-[15px] overflow-hidden">

                                <div className="bg-[rgba(43,117,216,0.25)] px-6 py-4">
                                    <h2 className="text-[#2B75D8] font-poppins text-xl sm:text-[25px] font-semibold">
                                        Parent’s / Guardian Information
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">

                                    {/* Father */}
                                    <div>
                                        <h3 className="text-[#2B75D8] font-inter text-lg font-bold mb-4">
                                            Father’s Name
                                        </h3>

                                        {[
                                            ["Last Name", formData.fatherLastName],
                                            ["First Name", formData.fatherFirstName],
                                            ["Middle Name", formData.fatherMiddleName],
                                            ["Contact Number", formData.fatherContactNumber],
                                        ].map(([label, value]) => (
                                            <div key={label} className="mb-3">
                                                <p className="text-[#2B75D8] font-inter text-sm">
                                                    {label}:
                                                </p>
                                                <p className="text-[#2B75D8] font-inter text-base font-bold break-words">
                                                    {value || "—"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mother */}
                                    <div>
                                        <h3 className="text-[#2B75D8] font-inter text-lg font-bold mb-4">
                                            Mother’s Maiden Name
                                        </h3>

                                        {[
                                            ["Last Name", formData.motherLastName],
                                            ["First Name", formData.motherFirstName],
                                            ["Middle Name", formData.motherMiddleName],
                                            ["Contact Number", formData.motherContactNumber],
                                        ].map(([label, value]) => (
                                            <div key={label} className="mb-3">
                                                <p className="text-[#2B75D8] font-inter text-sm">
                                                    {label}:
                                                </p>
                                                <p className="text-[#2B75D8] font-inter text-base font-bold break-words">
                                                    {value || "—"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Legal Guardian */}
                                    <div>
                                        <h3 className="text-[#2B75D8] font-inter text-lg font-bold mb-4">
                                            Legal Guardian’s Name
                                        </h3>

                                        {[
                                            ["Last Name", formData.guardianLastName],
                                            ["First Name", formData.guardianFirstName],
                                            ["Middle Name", formData.guardianMiddleName],
                                            ["Contact Number", formData.guardianContactNumber],
                                        ].map(([label, value]) => (
                                            <div key={label} className="mb-3">
                                                <p className="text-[#2B75D8] font-inter text-sm">
                                                    {label}:
                                                </p>
                                                <p className="text-[#2B75D8] font-inter text-base font-bold break-words">
                                                    {value || "—"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </section>

                        </div>

                        {/* Status Message */}
                        {status && (
                            <p
                                role="status"
                                className="mt-5 text-center text-sm text-[#2B75D8] font-poppins"
                            >
                                {status}
                            </p>
                        )}

                        {/* Navigation */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-10">

                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                            >
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                    <path
                                        d="M17 8H1M8 1L1 8L8 15"
                                        stroke="#2B75D8"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] active:scale-[0.99] transition"
                            >
                                Next
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                    <path
                                        d="M1 8H17M10 1L17 8L10 15"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                        </div>

                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 14: PART 6 UPLOADING DOCUMENT
            ============================== */}

            {currentStep === 14 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] min-h-[704px] px-5 sm:px-8 py-[26px] relative">

                        {/* Page Heading */}
                        <p className="text-[#2B75D8] font-inter text-base leading-6 mb-8">
                            Uploading Document (You can still proceed with the enrollment without your personal document)
                        </p>

                        {/* Upload Container */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`w-full max-w-[1121px] min-h-[321px] mx-auto rounded-[10px] border border-dashed flex flex-col items-center justify-center px-4 py-8 transition ${
                                isDragging
                                    ? "border-[#2B75D8] bg-blue-50"
                                    : "border-[#2B75D8] bg-white"
                            }`}
                        >

                            {/* Upload Icon */}
                            <svg
                                width="150"
                                height="150"
                                viewBox="0 0 150 166"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[150px] h-[150px] mb-2"
                            >
                                <path
                                    d="M75 0C62.6273 0.0387986 50.6764 4.50127 41.3063 12.5813C34.125 18.7688 28.9219 26.8312 27.5812 34.9219C11.8687 38.3906 0 52.0781 0 68.6062C0 87.8063 16.0125 103.125 35.4469 103.125H70.3125V53.5031L50.1938 73.6312C49.3136 74.5114 48.1198 75.0059 46.875 75.0059C45.6302 75.0059 44.4364 74.5114 43.5562 73.6312C42.6761 72.7511 42.1816 71.5573 42.1816 70.3125C42.1816 69.0677 42.6761 67.8739 43.5562 66.9938L71.6813 38.8687C72.1167 38.4322 72.6339 38.0859 73.2034 37.8496C73.7729 37.6133 74.3834 37.4916 75 37.4916C75.6166 37.4916 76.2271 37.6133 76.7966 37.8496C77.3661 38.0859 77.8833 38.4322 78.3187 38.8687L106.444 66.9938C107.324 67.8739 107.818 69.0677 107.818 70.3125C107.818 71.5573 107.324 72.7511 106.444 73.6312C105.564 74.5114 104.37 75.0059 103.125 75.0059C101.88 75.0059 100.686 74.5114 99.8063 73.6312L79.6875 53.5031V103.125H118.95C135.956 103.125 150 89.7188 150 72.8719C150 57.5344 138.356 45.0375 123.431 42.9281C121.153 18.7406 100.219 0 75 0ZM70.3125 135.938V103.125H79.6875V135.938C79.6875 137.181 79.1936 138.373 78.3146 139.252C77.4355 140.131 76.2432 140.625 75 140.625C73.7568 140.625 72.5645 140.131 71.6854 139.252C70.8064 138.373 70.3125 137.181 70.3125 135.938Z"
                                    fill="#2B75D8"
                                />
                            </svg>

                            <h2 className="text-black font-poppins text-xl sm:text-[25px] text-center">
                                Drag and drop your file here
                            </h2>

                            <p className="text-black font-poppins text-sm sm:text-[17px] mt-1">
                                or click to browse files
                            </p>

                            {/* File Browser */}
                            <label className="mt-4 cursor-pointer rounded-[10px] bg-[#2B75D8] w-[150px] h-10 flex items-center justify-center gap-2 text-white font-poppins text-[15px] hover:bg-[#2164bd] transition">

                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M22 19V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H13.236C12.8645 6.99999 12.5004 6.89651 12.1844 6.70116C11.8684 6.50581 11.6131 6.22631 11.447 5.894L10.553 4.106C10.3869 3.77353 10.1314 3.49394 9.8152 3.29858C9.49902 3.10322 9.13466 2.99983 8.763 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                Choose File

                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                                    multiple
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>

                            <p className="text-black font-poppins text-[10px] mt-3 text-center">
                                Supported formats: JPG, PNG ● Max File Size: 10MB per file
                            </p>

                        </div>

                        {/* Uploaded Files */}
                        {uploadedFiles.length > 0 && (
                            <div className="max-w-[1121px] mx-auto mt-6">

                                <h3 className="text-[#2B75D8] font-poppins text-base font-semibold mb-3">
                                    Selected Documents ({uploadedFiles.length})
                                </h3>

                                <div className="space-y-3">

                                    {uploadedFiles.map((file, index) => (
                                        <div
                                            key={`${file.name}-${file.lastModified}-${index}`}
                                            className="flex items-center justify-between gap-3 border border-gray-200 rounded-lg p-3"
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-poppins text-gray-800 break-all">
                                                    {file.name}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeUploadedFile(index)}
                                                className="text-red-500 hover:text-red-700 text-sm font-poppins shrink-0"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        )}

                        {/* Status Message */}
                        {status && (
                            <p
                                role="alert"
                                className="text-red-500 text-sm text-center mt-4 font-poppins"
                            >
                                {status}
                            </p>
                        )}

                        {/* Required Documents */}
                        <p className="text-[#2B75D8] font-poppins text-base sm:text-xl text-center mt-8">
                            PSA Birth Certificate, Report Card SF9, ID Picture
                        </p>

                        {/* Navigation */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-[26px] mt-8">

                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
                            >
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                    <path
                                        d="M17 8H1M8 1L1 8L8 15"
                                        stroke="#2B75D8"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] flex items-center justify-center gap-3 hover:bg-[#2164bd] transition"
                            >
                                Next

                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                    <path
                                        d="M1 8H17M10 1L17 8L10 15"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                        </div>

                    </div>
                </main>
            )}

            {/* ==============================
                SCREEN 15: JUNIOR HIGH SCHOOL ENROLLMENT
            ============================== */}

            {currentStep === 15 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1366px] px-5 sm:px-10 py-8">

                        {/* PAGE HEADER */}
                        <div className="mb-8">
                            <p className="text-[#2B75D8] font-poppins text-sm font-medium mb-2">
                                JUNIOR HIGH SCHOOL
                            </p>

                            <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold">
                                Enrollment Information
                            </h1>

                            <p className="text-gray-500 font-poppins text-sm mt-2">
                                Review your assigned section, prescribed subjects,
                                and class schedule.
                            </p>
                        </div>

                        {/* STUDENT INFORMATION */}
                        <section className="border border-gray-200 rounded-xl p-5 mb-7">

                            <h2 className="text-gray-800 font-poppins font-semibold text-lg mb-5">
                                Student Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                                <div>
                                    <p className="text-gray-500 text-xs font-poppins mb-1">
                                        Learner Reference Number
                                    </p>
                                    <p className="text-gray-800 font-poppins font-medium">
                                        {formData.lrn || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-xs font-poppins mb-1">
                                        Student Name
                                    </p>
                                    <p className="text-gray-800 font-poppins font-medium">
                                        {[
                                            formData.firstName,
                                            formData.middleName,
                                            formData.lastName,
                                            formData.extensionName,
                                        ].filter(Boolean).join(" ") || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-xs font-poppins mb-1">
                                        Grade Level
                                    </p>
                                    <p className="text-gray-800 font-poppins font-medium">
                                        Grade {formData.gradeLevel}
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* SECTION ASSIGNMENT */}
                        <section className="border border-gray-200 rounded-xl p-5 mb-7">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                                <div>
                                    <h2 className="text-gray-800 font-poppins font-semibold text-lg">
                                        Section Assignment
                                    </h2>

                                    <p className="text-gray-500 font-poppins text-sm mt-1">
                                        Your section is automatically assigned based
                                        on available section population.
                                    </p>
                                </div>

                                <span className="self-start bg-blue-50 text-[#2B75D8] rounded-full px-4 py-2 text-xs font-poppins font-semibold">
                                    Automatically Assigned
                                </span>

                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="bg-blue-50 rounded-lg p-5">

                                    <p className="text-gray-500 font-poppins text-sm mb-2">
                                        Assigned Section
                                    </p>

                                    <h3 className="text-[#2B75D8] text-2xl font-poppins font-bold">
                                        {assignedJhsSection?.name || "No section assigned"}
                                    </h3>

                                </div>

                                <div className="bg-gray-50 rounded-lg p-5">

                                    <p className="text-gray-500 font-poppins text-sm mb-2">
                                        Section Adviser
                                    </p>

                                    <h3 className="text-gray-800 text-lg font-poppins font-semibold">
                                        {assignedJhsSection?.adviser || "Unassigned"}
                                    </h3>

                                </div>

                            </div>

                        </section>

                        {/* PRESCRIBED SUBJECTS */}
                        <section className="mb-8">

                            <div className="mb-4">
                                <h2 className="text-gray-800 font-poppins font-semibold text-lg">
                                    Prescribed Subjects
                                </h2>

                                <p className="text-gray-500 font-poppins text-sm mt-1">
                                    Learning areas assigned to Grade {formData.gradeLevel}.
                                </p>
                            </div>

                            <div className="overflow-x-auto border border-gray-200 rounded-xl">

                                <table className="w-full min-w-[650px] text-left">

                                    <thead className="bg-blue-50">
                                        <tr>
                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                No.
                                            </th>

                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                Subject / Learning Area
                                            </th>

                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                Subject Teacher
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {jhsSubjects.map((subject, index) => (
                                            <tr
                                                key={subject.id}
                                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                                            >
                                                <td className="px-5 py-4 text-gray-600 font-poppins text-sm">
                                                    {index + 1}
                                                </td>

                                                <td className="px-5 py-4 text-gray-800 font-poppins text-sm font-medium">
                                                    {subject.name}
                                                </td>

                                                <td className="px-5 py-4 text-gray-500 font-poppins text-sm">
                                                    {subject.teacher}
                                                </td>
                                            </tr>
                                        ))}

                                        {jhsSubjects.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="px-5 py-8 text-center text-gray-500 font-poppins text-sm"
                                                >
                                                    No subjects available for this grade level.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>

                            </div>

                        </section>

                        {/* CLASS SCHEDULE */}
                        <section className="mb-8">

                            <div className="mb-4">
                                <h2 className="text-gray-800 font-poppins font-semibold text-lg">
                                    Class Schedule
                                </h2>
                            </div>

                            <div className="overflow-x-auto border border-gray-200 rounded-xl">

                                <table className="w-full min-w-[650px] text-left">

                                    <thead className="bg-blue-50">
                                        <tr>
                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                Subject
                                            </th>

                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                Day
                                            </th>

                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                Time
                                            </th>

                                            <th className="px-5 py-4 text-[#2B75D8] font-poppins text-sm font-semibold">
                                                Teacher
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {jhsSubjects.map((subject) => (
                                            <tr
                                                key={subject.id}
                                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                                            >
                                                <td className="px-5 py-4 text-gray-800 font-poppins text-sm font-medium">
                                                    {subject.name}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600 font-poppins text-sm">
                                                    {subject.day}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600 font-poppins text-sm">
                                                    {subject.time}
                                                </td>

                                                <td className="px-5 py-4 text-gray-500 font-poppins text-sm">
                                                    {subject.teacher}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>

                        </section>

                        {/* INFORMATION NOTE */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">

                            <p className="text-[#2B75D8] font-poppins font-semibold text-sm mb-1">
                                Important Information
                            </p>

                            <p className="text-gray-600 font-poppins text-sm leading-6">
                                Your assigned section and learning areas are displayed
                                for enrollment reference. Subject teachers and official
                                class schedules may still be updated by the school
                                administration.
                            </p>

                        </div>

                        {/* NAVIGATION */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">

                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] hover:bg-blue-50 transition"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] hover:bg-[#2164bd] transition"
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </main>
            )}

            {/* ==============================
                SCREEN 16: SENIOR HIGH SCHOOL ENROLLMENT
            ============================== */}

            {currentStep === 16 && (
                <main className="relative z-10 flex justify-center px-4 pt-[21px] pb-12">

                    <div className="bg-white rounded-[10px] w-full max-w-[1100px] px-5 sm:px-10 py-8">

                        {/* HEADER */}
                        <div className="mb-8">
                            <p className="text-[#2B75D8] font-poppins text-sm font-medium mb-2">
                                SENIOR HIGH SCHOOL
                            </p>

                            <h1 className="text-[#2B75D8] font-poppins text-xl sm:text-[28px] font-semibold">
                                Enrollment Information
                            </h1>

                            <p className="text-gray-500 font-poppins text-sm mt-2">
                                Strengthened Senior High School Curriculum
                                {" "}· School Year 2026–2027
                            </p>
                        </div>

                        {/* STUDENT INFORMATION */}
                        <section className="border border-gray-200 rounded-xl p-5 mb-7">

                            <h2 className="text-gray-800 font-poppins font-semibold text-lg mb-5">
                                Student Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                                <div>
                                    <p className="text-gray-500 text-xs font-poppins mb-1">
                                        Learner Reference Number
                                    </p>
                                    <p className="text-gray-800 font-poppins font-medium">
                                        {formData.lrn || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-xs font-poppins mb-1">
                                        Student Name
                                    </p>
                                    <p className="text-gray-800 font-poppins font-medium">
                                        {[
                                            formData.firstName,
                                            formData.middleName,
                                            formData.lastName,
                                            formData.extensionName,
                                        ].filter(Boolean).join(" ") || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-xs font-poppins mb-1">
                                        Grade Level
                                    </p>
                                    <p className="text-gray-800 font-poppins font-medium">
                                        Grade {formData.gradeLevel}
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* CORE SUBJECTS */}
                        <section className="border border-gray-200 rounded-xl p-5 mb-7">

                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-gray-800 font-poppins font-semibold text-lg">
                                        Core Subjects
                                    </h2>
                                    <p className="text-gray-500 font-poppins text-sm mt-1">
                                        These subjects are automatically included.
                                    </p>
                                </div>

                                <span className="bg-blue-50 text-[#2B75D8] rounded-full px-3 py-2 text-xs font-poppins font-semibold">
                                    6 Subjects
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {shsEnrollmentData.coreSubjects.map((subject, index) => (
                                    <div
                                        key={subject}
                                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                                    >
                                        <span className="w-7 h-7 shrink-0 rounded-full bg-blue-100 text-[#2B75D8] flex items-center justify-center text-xs font-semibold">
                                            {index + 1}
                                        </span>

                                        <span className="text-gray-700 font-poppins text-sm">
                                            {subject}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </section>

                        {/* TRACK SELECTION */}
                        <section className="mb-7">

                            <h2 className="text-gray-800 font-poppins font-semibold text-lg mb-2">
                                Select Your SHS Track
                            </h2>

                            <p className="text-gray-500 font-poppins text-sm mb-5">
                                Choose a track to explore its available elective clusters.
                                You can select electives from both tracks.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* ACADEMIC TRACK */}
                                <button
                                    type="button"
                                    onClick={() => handleShsTrackChange("academic")}
                                    className="text-left border-2 border-gray-200 rounded-xl p-5 transition hover:border-[#2B75D8] hover:bg-blue-50"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-gray-800 font-poppins font-semibold text-lg">
                                            Academic Track
                                        </h3>

                                        <span className={` ${
                                            formData.shsTrack === "academic"
                                                ? "border-[#2B75D8]"
                                                : "border-gray-300"
                                        }`}>
                                            {formData.shsTrack === "academic" && (
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#2B75D8]" />
                                            )}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 font-poppins text-sm">
                                        Focuses on academic learning through
                                        different subject clusters.
                                    </p>
                                </button>

                                {/* TECH-PRO TRACK */}
                                <button
                                    type="button"
                                    onClick={() => handleShsTrackChange("techPro")}
                                    className="text-left border-2 border-gray-200 rounded-xl p-5 transition hover:border-[#2B75D8] hover:bg-blue-50"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-gray-800 font-poppins font-semibold text-lg">
                                            Technical-Professional Track
                                        </h3>

                                        <span className={`${
                                            formData.shsTrack === "techPro"
                                                ? "border-[#2B75D8]"
                                                : "border-gray-300"
                                        }`}>
                                            {formData.shsTrack === "techPro" && (
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#2B75D8]" />
                                            )}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 font-poppins text-sm">
                                        Focuses on technical and professional
                                        subject clusters.
                                    </p>
                                </button>

                            </div>
                        </section>

                        {/* ELECTIVE SELECTION */}
                        <section className="border border-gray-200 rounded-xl p-5 mb-7">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                <div>
                                    <h2 className="text-gray-800 font-poppins font-semibold text-lg">
                                        Elective Subjects
                                    </h2>

                                    <p className="text-gray-500 font-poppins text-sm mt-1">
                                        Select at least 2 electives from your preferred subject clusters.
                                    </p>
                                </div>

                                <span className="bg-blue-50 text-[#2B75D8] rounded-full px-4 py-2 text-xs font-poppins font-semibold self-start">
                                    {formData.shsSelectedElectives.length} Selected
                                </span>

                            </div>

                            {/* SELECTED ELECTIVES SUMMARY */}
                            {formData.shsSelectedElectives.length > 0 && (
                                <div className="mt-6 space-y-4">

                                    {getSelectedShsClusters().map((cluster) => {

                                        const clusterSelections =
                                            formData.shsSelectedElectives.filter(
                                                (item) => item.clusterId === cluster.id
                                            );

                                        if (clusterSelections.length === 0) return null;

                                        return (
                                            <div
                                                key={cluster.id}
                                                className="border border-gray-200 rounded-lg p-4"
                                            >

                                                {/* TRACK NAME */}
                                                <p className="text-gray-400 font-poppins text-xs mb-1">
                                                    {cluster.trackName}
                                                </p>

                                                {/* CLUSTER NAME */}
                                                <h3 className="text-[#2B75D8] font-poppins font-semibold text-sm mb-3">
                                                    {cluster.name}
                                                </h3>

                                                {/* SELECTED SUBJECTS */}
                                                <div className="space-y-2">

                                                    {clusterSelections.map((item) => (
                                                        <div
                                                            key={`${item.clusterId}-${item.subject}`}
                                                            className="flex items-center justify-between gap-3"
                                                        >

                                                            <span className="text-gray-700 text-sm font-poppins">
                                                                {item.subject}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleShsElective(
                                                                        item.clusterId,
                                                                        item.subject
                                                                    )
                                                                }
                                                                className="text-red-500 text-xs font-poppins hover:underline shrink-0"
                                                            >
                                                                Remove
                                                            </button>

                                                        </div>
                                                    ))}

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>
                            )}

                            {errors.shsSelectedElectives && (
                                <p className="text-red-500 text-sm font-poppins mt-3">
                                    {errors.shsSelectedElectives}
                                </p>
                            )}

                            <div className="bg-blue-50 rounded-lg p-4 mt-5">
                                <p className="text-[#2B75D8] font-poppins text-sm font-semibold mb-1">
                                    Selection Requirements
                                </p>

                                <p className="text-gray-600 font-poppins text-xs leading-5">
                                    Select at least 2 elective subjects. You may combine subjects
                                    from Academic and Technical-Professional tracks or choose
                                    all your electives from the same track.
                                </p>
                            </div>

                        </section>

                        {/* NAVIGATION */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">

                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] border border-[#2B75D8] bg-white text-[#2B75D8] font-poppins text-[15px] hover:bg-blue-50 transition"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full sm:w-[250px] h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] hover:bg-[#2164bd] transition"
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </main>
            )}

            {/* ==============================
                SHS ELECTIVE SELECTION MODAL
            ============================== */}

            {currentStep === 16 && isShsModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-3 py-5 sm:px-6"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsShsModalOpen(false);
                        }
                    }}
                >

                    <div
                        className="bg-white w-full max-w-[900px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="shs-modal-title"
                    >

                        {/* MODAL HEADER */}
                        <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-gray-200">

                            <div>
                                <h2
                                    id="shs-modal-title"
                                    className="text-[#2B75D8] font-poppins font-semibold text-lg sm:text-xl"
                                >
                                    Select Elective Subjects
                                </h2>

                                <p className="text-gray-500 font-poppins text-xs sm:text-sm mt-1">
                                    Choose subjects from different clusters.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsShsModalOpen(false)}
                                className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-xl"
                                aria-label="Close elective selection"
                            >
                                ×
                            </button>

                        </div>

                        {/* MODAL CONTENT */}
                        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

                            {/* CLUSTER NAVIGATION */}
                            <aside className="md:w-[260px] shrink-0 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4">

                                <p className="text-gray-500 text-xs font-poppins font-semibold uppercase mb-3">
                                    Available Clusters
                                </p>

                                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-1">

                                    {getSelectedShsClusters()
                                        .filter((cluster) => cluster.trackId === activeShsTrack)
                                        .map((cluster) => {
                                        const count =
                                            formData.shsSelectedElectives.filter(
                                                (item) => item.clusterId === cluster.id
                                            ).length;

                                        return (
                                            <button
                                                key={cluster.id}
                                                type="button"
                                                onClick={() =>
                                                    setActiveShsCluster(cluster.id)
                                                }
                                                className={`shrink-0 md:w-full text-left rounded-lg p-3 transition ${
                                                    activeShsCluster === cluster.id
                                                        ? "bg-[#2B75D8] text-white"
                                                        : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                                                }`}
                                            >
                                                <span className="block text-[10px] font-poppins opacity-75 mb-1">
                                                    {cluster.trackName}
                                                </span>

                                                <span className="block text-xs sm:text-sm font-poppins font-semibold">
                                                    {cluster.name}
                                                </span>

                                                <span className={`block text-[11px] font-poppins mt-1 ${
                                                    activeShsCluster === cluster.id
                                                        ? "text-blue-100"
                                                        : "text-gray-400"
                                                }`}>
                                                    {count} selected
                                                </span>
                                            </button>
                                        );
                                    })}

                                </div>

                            </aside>

                            {/* SUBJECT LIST */}
                            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6">

                                    {getSelectedShsClusters()
                                        .filter(
                                            (cluster) =>
                                                cluster.trackId === activeShsTrack &&
                                                cluster.id === activeShsCluster
                                        )
                                        .map((cluster) => (
                                        <div key={cluster.id}>

                                            <div className="mb-5">
                                                <h3 className="text-gray-800 font-poppins font-semibold text-lg">
                                                    {cluster.name}
                                                </h3>

                                                <p className="text-gray-500 font-poppins text-xs mt-1">
                                                    Select all the subjects you want from this cluster.
                                                </p>
                                            </div>

                                            <div className="space-y-2">

                                                {cluster.electives.map((subject) => {
                                                    const selected =
                                                        isShsElectiveSelected(
                                                            cluster.id,
                                                            subject
                                                        );

                                                    return (
                                                        <label
                                                            key={subject}
                                                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                                                                selected
                                                                    ? "border-[#2B75D8] bg-blue-50"
                                                                    : "border-gray-200 hover:bg-gray-50"
                                                            }`}
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                checked={selected}
                                                                onChange={() =>
                                                                    toggleShsElective(
                                                                        cluster.id,
                                                                        subject
                                                                    )
                                                                }
                                                                className="w-4 h-4 mt-1 accent-[#2B75D8] shrink-0"
                                                            />

                                                            <span className="text-gray-700 font-poppins text-sm">
                                                                {subject}
                                                            </span>

                                                        </label>
                                                    );
                                                })}

                                            </div>

                                        </div>
                                    ))}

                            </div>

                        </div>

                        {/* MODAL FOOTER */}
                        <div className="border-t border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div>
                                <p className="text-gray-800 font-poppins font-semibold text-sm">
                                    {formData.shsSelectedElectives.length} electives selected
                                </p>

                                <p className="text-gray-500 font-poppins text-xs mt-1">
                                    You can combine electives from different tracks.
                                </p>
                            </div>

                            <div className="flex gap-3">

                                <button
                                    type="button"
                                    onClick={() => setIsShsModalOpen(false)}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-poppins text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    disabled={formData.shsSelectedElectives.length < 2}
                                    onClick={() => {
                                        setIsShsModalOpen(false);
                                        setErrors((prev) => ({
                                            ...prev,
                                            shsSelectedElectives: "",
                                        }));
                                    }}
                                    className="px-5 py-2.5 rounded-lg bg-[#2B75D8] text-white font-poppins text-sm font-semibold hover:bg-[#2164bd] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                >
                                    Confirm Electives
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}


        </div>
    );
}
