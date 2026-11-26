const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Admission", href: "/enroll" },
  { label: "Programs", href: "/programs" },
  { label: "About MMNHS", href: "/about" },
  { label: "Portal", href: "/login" },
];

export default function Navbar({ logo, purpose }) {
  return (
    <header className="absolute top-0 left-0 z-20 bg-[#2B75D8] w-full min-h-[109px] px-5 sm:px-[34px] py-4 flex flex-wrap items-center justify-between gap-4">

      {/* School Branding */}
      <div className="flex items-center gap-3 max-w-[667px]">

        <img
          src={logo}
          className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] object-contain shrink-0"
          alt="School Logo"
        />

        <p className="text-white font-inter text-sm sm:text-base leading-6">
          Medroso-Mendoza National High School <span className="font-semibold">{purpose}</span>
        </p>

      </div>

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className="flex flex-wrap items-center gap-5 sm:gap-8 text-[#F3F4F6] font-inter text-sm sm:text-base"
      >
        {navigationLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:underline transition"
          >
            {link.label}
          </a>
        ))}
      </nav>

    </header>
  );
}