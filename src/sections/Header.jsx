import { Link as LinkScroll } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);

      const scrollY = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollY / documentHeight) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NavLink = ({ title, to }) => (
    <LinkScroll
      onClick={() => setIsOpen(false)}
      to={to}
      offset={-100}
      spy
      smooth
      duration={500}
      activeClass="nav-active"
      className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
    >
      {title}
    </LinkScroll>
  );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-500 max-lg:py-3",
        hasScrolled ? "py-4  backdrop-blur-[8px]" : "py-8"
      )}
    >
      <div
        className={clsx(
          "container flex items-center max-lg:px-5",
          hasScrolled ? "h-12" : "h-16"
        )}
      >
        <Link to="/" className="lg:hidden flex-1 cursor-pointer z-2">
          <motion.img
            src="/images/flyte_bile_pop.webp"
            width={hasScrolled ? 85 : 115}
            height={hasScrolled ? 45 : 55}
            alt="logo"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
            <nav className="max-lg:relative max-lg:z-2 max-lg:my-auto">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="nav-li">
                  <NavLink title="Funkce" to="features" />
                  <div className="dot" />
                  <NavLink title="Cena" to="pricing" />
                  <div className="dot" />
                  <NavLink title="Kontakt" to="kontakt" />
                </li>

                <li className="nav-logo">
                  <LinkScroll
                    to="hero"
                    offset={-250}
                    spy
                    smooth
                    duration={500}
                    className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                  >
                    <motion.img
                      src="/images/flyte_bile_pop.png"
                      width={hasScrolled ? 85 : 110}
                      height={hasScrolled ? 35 : 50}
                      alt="logo"
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                  </LinkScroll>
                </li>

                <li className="nav-li">
                  <NavLink title="Jídelníčky" to="mealPlan" />
                  <div className="dot" />
                  <NavLink title="Tréninky" to="trainingPlan" />
                  <div className="dot" />
                  <NavLink title="Časté dotazy" to="faq" />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <button
          className="lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <img
            src={`../images/${isOpen ? "close" : "magic"}.svg`}
            alt="magic"
            className="size-1/2 object-contain"
          />
        </button>
      </div>

      <motion.div
        className="h-[2px] bg-white fixed top-[74px] left-0 z-40"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
      />
    </header>
  );
};

export default Header;
