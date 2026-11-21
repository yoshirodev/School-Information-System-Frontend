
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        lastName: "",
        firstName: "",
        middleName: "",
        extensionName: "",

        // Step 3: Birth & Background Details
        sex: "",
        birthday: "",
        placeOfBirth: "",
    });

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

    // Update form fields
    const updateField = (name, value) => {
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

        if (!formData.middleName.trim()) {
            newErrors.middleName = "Middle name is required.";
        }

        // Extension name is optional.

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

    // Next button
    const handleNext = (e) => {
        e.preventDefault();

        switch (currentStep) {
            case 1:
                if (!validateBasicInfo()) return;
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 2:
                if (!validateNameInfo()) return;
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case 3:
                if (!validateBirthInfo()) return;
                //setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: "smooth" });
            default:
                break;
        }

        setErrors({});
        setStatus("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
            default:
                break;
        }
    };

    // Shared progress indicator
    const progressSteps = [
        "Personal Info",
        "Address",
        "Guardian",
        "Advanced Information",
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

    const progressStep = currentStep <= 3 ? 1 : currentStep - 2;
    
    return (
        <div className="relative bg-white min-h-screen w-full overflow-x-hidden">

            {/* Navbar */}
            <Navbar
                logo={nontLogo}
                purpose="Enrollment Registration"
            />

            {/* Background */}
            <div className="absolute inset-x-0 top-[109px] bottom-0 overflow-hidden">
                <img
                    src={bgmain}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Progress Indicator */}
            <div className="relative z-10 flex justify-center pt-[123px] px-4">
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
                SCREEN 1: LRN AND GRADE LEVEL
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
                SCREEN 2: NAME INFORMATION
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
                                            Middle Name *
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
                SCREEN 3: BACKGROUND INFORMATION
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
        </div>
    );
}
