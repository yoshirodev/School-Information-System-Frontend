
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import calendar from "../assets/landingimg/calendar_icon.png";
import checkmark from "../assets/landingimg/checkmark_icon.png";
import cloud from "../assets/landingimg/cloud_icon.png";
import document from "../assets/landingimg/document_icon.png";
import facebook from "../assets/landingimg/facebook_icon.png";
import finishflag from "../assets/landingimg/finishflag_icon.png";
import internet from "../assets/landingimg/Internet_icon.png";
import landscapebg from "../assets/landingimg/landscapebg_icon.png";
import openbook from "../assets/landingimg/openbook_icon.png";
import people from "../assets/landingimg/people_icon.png";
import schoollogo from "../assets/landingimg/schoollogo.png";
import star from "../assets/landingimg/star_logo.png";
import trophy from "../assets/landingimg/trophy_icon.png";
import youtube from "../assets/landingimg/youtube_icon.png";
import nontLogo from "../assets/nont_logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const goToEnrollment = () => {
    navigate("/enroll");
  };

  const quickLinks = [
    { label: "Admission", path: "/enroll" },
    { label: "Programs", path: "/programs" },
    { label: "About MMNHS", path: "/about" },
    { label: "Contact Us", path: "/contact" },
    { label: "Portal", path: "/login" },
  ];

  const benefits = [
    {
      icon: openbook,
      title: "Quality Education",
      description: "Get the best learning experience",
    },
    {
      icon: people,
      title: "Supportive Community",
      description: "Be part of a caring and encouraging school community",
    },
    {
      icon: trophy,
      title: "Academic Excellence",
      description: "Achieve your goals with us.",
    },
    {
      icon: star,
      title: "Bright Future",
      description: "Build a better tomorrow.",
    },
  ];

  const steps = [
    {
      icon: document,
      title: "Fill Out the Form",
      description: "Provide your personal information.",
    },
    {
      icon: cloud,
      title: "Upload Requirements",
      description: "Submit the necessary documents",
    },
    {
      icon: checkmark,
      title: "Review your Application",
      description: "Wait for confirmation from the school.",
    },
    {
      icon: finishflag,
      title: "Enrollment Complete!",
      description: "Get your enrollment confirmation.",
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">

      {/* HEADER */}
      <header className="relative z-20 bg-[#2B75D8] w-full min-h-[109px]">
        <div className="max-w-[1440px] mx-auto min-h-[109px] px-6 lg:px-[34px] flex flex-col lg:flex-row items-center justify-between gap-4 py-4">

          {/* SCHOOL LOGO */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-left"
            aria-label="Go to homepage"
          >
            <img
              src={schoollogo}
              className="w-[75px] h-[75px] object-contain"
              alt="Medroso-Mendoza National High School"
            />

            <span className="text-white font-inter text-base leading-6 max-w-[400px]">
              Medroso-Mendoza National High School Student Enrollment Portal
            </span>
          </button>

            <Navbar logo={nontLogo} purpose="" />
        </div>
      </header>

      <main>

        {/* HERO SECTION */}
        <section className="relative w-full h-[400px] overflow-hidden">

          <img
            src={landscapebg}
            className="absolute inset-0 w-full h-full object-cover"
            alt="School landscape"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 max-w-[1440px] mx-auto h-full px-6 lg:px-[114px] flex flex-col lg:flex-row justify-between items-start">

            {/* HERO TEXT */}
            <div className="pt-[19px]">
              <h1 className="text-white font-poppins text-3xl lg:text-4xl font-bold leading-9 max-w-[383px]">
                Welcome to
                <br />
                Medroso-Mendoza
                <br />
                National High school
              </h1>

              <p className="text-white font-poppins text-xl font-bold leading-9 mt-[27px]">
                Learn · Grow · Succeed
              </p>

              <p className="text-white font-poppins text-sm leading-[18px] max-w-[426px] mt-1">
                Begin your academic journey with us. Enroll now and be part
                of our growing community
              </p>

              <button
                type="button"
                onClick={goToEnrollment}
                className="mt-7 inline-flex justify-center items-center rounded-[10px] border border-[#2B75D8] bg-white w-[180px] h-11 text-[#2B75D8] font-poppins text-base font-bold hover:bg-blue-50 transition-colors"
              >
                Start Enrollment →
              </button>
            </div>

            {/* ENROLLMENT ANNOUNCEMENT */}
            <div className="hidden lg:block rounded-[10px] bg-white/90 w-[432px] h-[164px] mt-[45px] relative overflow-hidden">

              <div className="absolute left-[29px] top-[35px]">
                <img
                  src={document}
                  className="w-[51px] h-[50px] object-contain"
                  alt=""
                />
              </div>

              <h2 className="text-[#2B75D8] font-poppins text-xl font-bold leading-9 absolute left-[132px] top-6">
                Enrollment is Now Open!
              </h2>

              <p className="text-[#1458B2] font-poppins text-xs leading-[18px] absolute left-[132px] top-[57px]">
                For incoming Grade 7 and Transferees
                <br />
                for School Year 2027-2028
              </p>

              <div className="absolute left-[29px] top-[106px] w-[364px] h-px bg-[#2B75D8]" />

              <img
                src={calendar}
                className="w-5 h-6 absolute left-[29px] top-[124px]"
                alt=""
              />

              <p className="text-[#1458B2] font-poppins text-sm font-bold leading-[18px] absolute left-[66px] top-[115px]">
                Enrollment Period:
                <br />
                March 1 - May 31, 2027
              </p>
            </div>
          </div>
        </section>

        {/* WHY ENROLL */}
        <section className="max-w-[1276px] mx-auto mt-[35px] px-5">
          <div className="rounded-[10px] border border-[rgba(43,117,216,0.40)] bg-white min-h-[195px] py-5 px-4">

            <div className="flex items-center justify-center gap-4 mb-7">
              <div className="hidden md:block flex-1 h-px bg-[rgba(43,117,216,0.40)]" />

              <h2 className="text-[#1458B2] font-poppins text-xl font-bold leading-9 text-center whitespace-nowrap">
                Why Enroll at MMNHS?
              </h2>

              <div className="hidden md:block flex-1 h-px bg-[rgba(43,117,216,0.40)]" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={benefit.icon}
                    className="w-[50px] h-[50px] object-contain"
                    alt=""
                  />

                  <h3 className="text-[#1458B2] font-poppins text-sm font-bold leading-[18px] mt-2">
                    {benefit.title}
                  </h3>

                  <p className="text-[#1458B2] font-poppins text-[11px] leading-[18px] max-w-[177px] mt-2">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENROLLMENT PROCESS */}
        <section className="max-w-[1354px] mx-auto mt-8 px-5 pb-8">

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hidden md:block flex-1 h-px bg-[rgba(43,117,216,0.40)]" />

            <h2 className="text-[#1458B2] font-poppins text-xl font-bold leading-9 text-center">
              Enrollment Process
            </h2>

            <div className="hidden md:block flex-1 h-px bg-[rgba(43,117,216,0.40)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center"
              >
                {/* STEP NUMBER */}
                <div className="w-[27px] h-[27px] rounded-full bg-[#2B75D8] flex items-center justify-center text-white font-poppins text-sm font-bold relative z-10">
                  {index + 1}
                </div>

                {/* STEP CARD */}
                <div className="rounded-[15px] border border-[#2B75D8] bg-[rgba(43,117,216,0.15)] w-full max-w-[226px] min-h-[120px] mt-[-12px] pt-[27px] px-4 flex flex-col items-center text-center">

                  <img
                    src={step.icon}
                    className="w-[21px] h-[21px] object-contain"
                    alt=""
                  />

                  <h3 className="text-[#1458B2] font-poppins text-xs font-bold leading-[18px] mt-2">
                    {step.title}
                  </h3>

                  <p className="text-[#1458B2] font-poppins text-[11px] leading-[18px] mt-1 max-w-[140px]">
                    {step.description}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <span className="hidden lg:block absolute top-[55px] -right-5 text-[#2B75D8] text-sm font-bold">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* GET STARTED */}
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={goToEnrollment}
              className="rounded-[10px] bg-[#2B75D8] w-[186px] h-[33px] text-white font-poppins text-xs font-bold hover:bg-[#1458B2] transition-colors"
            >
              Get Started Now →
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#2B75D8] text-white w-full">

        <div className="max-w-[1440px] mx-auto px-6 py-5">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* SCHOOL INFORMATION */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={schoollogo}
                  className="w-[72px] h-[72px] object-contain"
                  alt="School logo"
                />

                <div>
                  <p className="font-inter text-[13px] font-bold leading-[14px]">
                    Medroso-Mendoza
                    <br />
                    National High School
                  </p>

                  <p className="font-poppins text-[10px] leading-[10px] mt-2">
                    Learn · Grow · Succeed
                  </p>
                </div>
              </div>

              <p className="font-poppins text-[10px] leading-[15px] mt-2 max-w-[210px]">
                Committed to providing quality education for a brighter future
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-inter text-[13px] font-bold mb-5">
                Quick Links
              </h3>

              <div className="grid grid-cols-2 gap-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => navigate(link.path)}
                    className="text-left font-poppins text-[10px] hover:underline"
                  >
                    &gt; {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div>
              <h3 className="font-inter text-[13px] font-bold mb-5">
                Connect With Us
              </h3>

              <div className="flex items-center gap-5">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <img src={facebook} className="w-[26px] h-6" alt="" />
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <img src={youtube} className="w-[26px] h-6" alt="" />
                </a>

                <a
                  href="https://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="School website"
                >
                  <img src={internet} className="w-[26px] h-6" alt="" />
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white mt-5 pt-4 text-center">
            <p className="font-poppins text-[10px] leading-[15px]">
              © 2026 Medroso-Mendoza National High School. All Rights reserved
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
