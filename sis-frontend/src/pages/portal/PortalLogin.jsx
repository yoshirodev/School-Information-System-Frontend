
import { useState } from "react";
import { Link } from "react-router-dom";
import bgmain from "../../assets/bgmain.png";
import tLogo from "../../assets/t_logo.png";
import nontLogo from "../../assets/nont_logo.png";

export default function PortalLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginAs, setLoginAs] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!username.trim() || !password || !loginAs) {
            setMessage("Please complete all fields.");
            return;
        }

        if (onLogin) {
            try {
                await onLogin({ username, password, loginAs });
            } catch (error) {
                setMessage(error.message || "Login failed. Please try again.");
            }
        } else {
            console.log("Login credentials:", {
                username,
                password,
                loginAs,
            });

            setMessage("Login form is working! Connect your authentication API.");
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-white">

            {/* Background Image */}
            <div className="absolute inset-x-0 top-[109px] bottom-0 overflow-hidden">
                <img
                    src={bgmain}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Navigation Bar */}
            <header className="relative z-20 flex min-h-[109px] w-full flex-wrap items-center justify-between gap-4 bg-[#2B75D8] px-6 py-4 md:h-[109px] md:flex-nowrap md:px-[34px] md:py-[17px]">

                {/* School Logo and Name */}
                <div className="flex items-center gap-3">
                    <img
                        src={nontLogo}
                        alt="MMNHS Logo"
                        className="h-[65px] w-[65px] shrink-0 object-contain md:h-[75px] md:w-[75px]"
                    />

                    <p className="max-w-[430px] text-sm font-medium leading-6 text-white md:text-base">
                        Medroso-Mendoza National High School Student Enrollment Portal
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#F3F4F6] md:gap-x-7 md:text-base">

                    <Link
                        to="/enroll"
                        className="transition-colors hover:text-blue-200"
                    >
                        Admission
                    </Link>

                    <a
                        href="#programs"
                        className="transition-colors hover:text-blue-200"
                    >
                        Programs
                    </a>

                    <a
                        href="#blog"
                        className="transition-colors hover:text-blue-200"
                    >
                        MMNHS Blog
                    </a>

                    <a
                        href="#about"
                        className="transition-colors hover:text-blue-200"
                    >
                        About MMNHS
                    </a>

                    <Link
                        to="/login"
                        className="font-semibold text-white transition-colors hover:text-blue-200"
                    >
                        Portal
                    </Link>

                </nav>
            </header>

            {/* Login Card Container */}
            <main className="relative z-10 flex w-full justify-center px-4 pb-12 pt-[65px]">

                <div className="w-full max-w-[638px] overflow-hidden rounded-[10px] bg-white shadow-lg">

                    {/* Card Header */}
                    <div className="relative flex min-h-[86px] items-center justify-center gap-4 bg-[rgba(43,117,216,0.25)] px-4 py-3">

                        <img
                            src={tLogo}
                            alt="Medroso School Logo"
                            className="absolute left-4 h-[55px] w-[55px] object-contain md:left-[42px] md:h-[61px] md:w-[61px]"
                        />

                        <h1 className="text-center font-poppins text-xl font-semibold leading-9 text-[#2B75D8] sm:text-2xl md:text-[28px]">
                            MMNHS Portal Login
                        </h1>

                    </div>

                    {/* Login Form */}
                    <div className="flex justify-center px-6 pb-12 pt-10 sm:px-10">

                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full max-w-[451px] flex-col gap-7"
                        >

                            {/* Username */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="username"
                                    className="font-poppins text-[15px] font-bold text-[#2B75D8]"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    required
                                    className="h-[60px] w-full rounded-[10px] border border-[#2B75D8] bg-white px-4 font-poppins text-[15px] text-black outline-none transition-all placeholder:text-gray-400 focus:border-[#1D5FB5] focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="font-poppins text-[15px] font-bold text-[#2B75D8]"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="h-[60px] w-full rounded-[10px] border border-[#2B75D8] bg-white px-4 font-poppins text-[15px] text-black outline-none transition-all placeholder:text-gray-400 focus:border-[#1D5FB5] focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            {/* Login As */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="loginAs"
                                    className="font-poppins text-[15px] font-bold text-[#2B75D8]"
                                >
                                    Login As
                                </label>

                                <select
                                    id="loginAs"
                                    name="loginAs"
                                    value={loginAs}
                                    onChange={(e) => setLoginAs(e.target.value)}
                                    required
                                    className="h-[60px] w-full cursor-pointer appearance-none rounded-[10px] border border-[#2B75D8] bg-white px-4 font-poppins text-[15px] text-[#2B75D8] outline-none transition-all focus:border-[#1D5FB5] focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="" disabled>
                                        Select your account type
                                    </option>

                                    <option value="student">
                                        Student
                                    </option>

                                    <option value="parent">
                                        Teacher
                                    </option>

                                    <option value="teacher">
                                        Registrar Staff
                                    </option>

                                </select>
                            </div>

                            {/* Error / Status Message */}
                            {message && (
                                <p
                                    role="status"
                                    className="text-center text-sm text-[#2B75D8]"
                                >
                                    {message}
                                </p>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="mt-1 flex h-[50px] w-full items-center justify-center rounded-[15px] bg-[#2B75D8] font-poppins text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#1D5FB5] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                            >
                                Login
                            </button>

                        </form>

                    </div>
                </div>
            </main>

        </div>
    );
}
