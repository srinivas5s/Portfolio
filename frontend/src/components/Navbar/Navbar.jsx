import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (e, label, href) => {
    e.preventDefault();
    setActiveLink(label);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Google Font + animation styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .nav-animate { animation: slideDown 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .menu-animate { animation: fadeIn 0.28s ease both; }

        .nav-underline { position: relative; padding-bottom: 2px; }
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #C85A2E;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-underline:hover::after,
        .nav-underline.is-active::after { width: 100%; }

        .ham-bar { transition: transform 0.3s ease, opacity 0.3s ease; }
      `}</style>

      {/* ── Header ── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? "py-3 bg-[#F7F4EF]/90 backdrop-blur-xl shadow-sm border-b border-[#C85A2E]/10"
            : "py-5 bg-transparent"
          }
        `}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, "Home", "#home")}
            className="text-xl tracking-tight text-[#1A1612] select-none"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            dev<span className="text-[#C85A2E]">.</span>folio
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNav(e, label, href)}
                className={`
                  nav-underline text-sm font-medium tracking-wide
                  transition-colors duration-200
                  ${activeLink === label
                    ? "text-[#C85A2E] is-active"
                    : "text-[#1A1612] hover:text-[#C85A2E]"}
                `}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "Contact", "#contact")}
            className="
              hidden md:inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              bg-[#1A1612] text-white text-sm font-medium tracking-wide
              transition-all duration-200
              hover:bg-[#C85A2E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C85A2E]/30
            "
          >
            Hire Me <span className="opacity-60 text-xs">→</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.25 p-2 relative z-60"
          >
            <span
              className="ham-bar block h-0.5 w-6 bg-[#1A1612] rounded-full"
              style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}
            />
            <span
              className="ham-bar block h-0.5 w-6 bg-[#1A1612] rounded-full"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="ham-bar block h-0.5 w-6 bg-[#1A1612] rounded-full"
              style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Fullscreen Menu ── */}
      {menuOpen && (
        <div className="menu-animate fixed inset-0 z-40 bg-[#F7F4EF] flex flex-col items-center justify-center gap-7 md:hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#C85A2E]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#7A9E87]/10 blur-3xl pointer-events-none" />

          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNav(e, label, href)}
              className="
                relative text-3xl text-[#1A1612] tracking-tight
                hover:text-[#C85A2E] transition-colors duration-200
              "
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {activeLink === label && (
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C85A2E]" />
              )}
              {label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNav(e, "Contact", "#contact")}
            className="
              mt-4 px-8 py-3 rounded-md
              bg-[#1A1612] text-white text-sm font-medium tracking-wide
              hover:bg-[#C85A2E] transition-colors duration-200
            "
          >
            Hire Me →
          </a>
        </div>
      )}
    </>
  );
}