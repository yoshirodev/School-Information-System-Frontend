
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import bgmain from "../../assets/bgmain.png";
import tLogo from "../../assets/t_logo.png";
import nontLogo from "../../assets/nont_logo.png";

export default function EnrollRegis() {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));

        setErrors((prev) => ({
        ...prev,
        [name]: "",
        }));

        setSubmitted(false);
    };

    
    const validateForm = () => {
        const newErrors = {};

        const email = formData.email.trim();
        const phone = formData.phone.trim().replace(/[\s-]/g, "");

        // At least one contact method is required
        if (!email && !phone) {
            newErrors.email = "Please provide either an email address or phone number.";
            newErrors.phone = "Please provide either an email address or phone number.";
        } else {
            // Validate email only if provided
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = "Please enter a valid email address.";
            }

            // Validate phone only if provided
            if (phone && !/^(\+63|0)9\d{9}$/.test(phone)) {
                newErrors.phone = "Enter a valid Philippine mobile number.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // TODO: Connect to your enrollment API.
        console.log("Enrollment information:", formData);

        setSubmitted(true);
        navigate("/enrollment-main");
    };

    return (
        <div className="relative bg-white min-h-screen w-full overflow-x-hidden">

            {/* Reusable Navbar */}
            <Navbar logo={nontLogo} purpose="Enrollment Registration" />

            {/* Background Image */}
            <div className="absolute inset-x-0 top-[109px] bottom-0 overflow-hidden">
                <img
                    src={bgmain}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Enrollment Card */}
            <main className="relative z-10 flex justify-center px-4 pt-44 pb-12">

                <div className="bg-white rounded-[10px] w-full max-w-[638px] min-h-[632px] relative">

                {/* Card Header */}
                <div className="relative flex min-h-[86px] items-center justify-center gap-4 bg-[rgba(43,117,216,0.25)] px-4 py-3">

                    <img
                        src={tLogo}
                        alt="Medroso School Logo"
                        className="absolute left-4 h-[55px] w-[55px] object-contain md:left-[42px] md:h-[61px] md:w-[61px]"
                    />

                    <h1 className="text-center font-poppins text-xl font-semibold leading-9 text-[#2B75D8] sm:text-2xl md:text-[28px]">
                        MMNHS Enrollment Registration
                    </h1>

                </div>

                {/* Registration Form */}
                <div className="flex justify-center px-6 pb-12 pt-10 sm:px-10">

                    <form 
                        onSubmit={handleSubmit} noValidate
                        className="flex w-full max-w-[451px] flex-col gap-7" 
                    >

                        {/* Email */}
                        <div className="mb-8">

                            <label
                            htmlFor="email"
                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold leading-9"
                            >
                            Email
                            </label>

                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className="w-full h-[60px] rounded-[10px] border border-[#2B75D8] bg-white px-[15px] text-[15px] font-poppins text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                            />

                            {errors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                            )}

                        </div>

                        {/* Or */}
                        <p className="text-[#2B75D8] font-poppins text-[15px] font-bold leading-9 text-center mb-4">
                            Or
                        </p>

                        {/* Phone Number */}
                        <div className="mb-10">

                            <label
                            htmlFor="phone"
                            className="block text-[#2B75D8] font-poppins text-[15px] font-bold leading-9"
                            >
                            Phone Number
                            </label>

                            <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                            className="w-full h-[60px] rounded-[10px] border border-[#2B75D8] bg-white px-4 text-[15px] font-poppins text-black outline-none focus:ring-2 focus:ring-[#2B75D8]/30"
                            />

                            {errors.phone && (
                            <p id="phone-error" className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                            )}

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-[50px] rounded-[15px] bg-[#2B75D8] text-white font-poppins text-[15px] hover:bg-[#2164bd] active:scale-[0.99] transition"
                        >
                            Next
                        </button>
                        <p className="text-center text-gray-500 text-sm font-poppins">
                            Please provide at least one contact method: email address or phone number.
                        </p>

                        {submitted && (
                            <p
                            role="status"
                            className="text-green-600 text-sm text-center mt-4"
                            >
                            </p>
                        )}

                    </form>
                </div>
                </div>
            </main>
        </div>
    );
}
