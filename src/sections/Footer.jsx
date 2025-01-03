import { socials } from "../constants/index.jsx";

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-10" name="kontakt">
      <hr />
      <div className="mt-4 container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm opacity-70">
            Copyright © 2025, Flyte Fitness App <br /> Viktorie Mazurová
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
          <a
            href="#terms"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Podmínky použití
          </a>
          <div className="dot mt-2" />
          <a
            href="https://github.com/vmazurova/frontend-mat"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Maturitní projekt 2025
          </a>
          <div className="dot mt-2" />
          <a
            href="#privacy"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Ochrana osobních údajů
          </a>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <strong className="text-sm">Kontakt: </strong>
          <p className="text-sm">
            E-mail:{" "}
            <a
              href="mailto:kontakt@flyteapp.cz"
              className="text-purple-400 hover:text-purple-500"
            >
              kontakt@flyteapp.cz
            </a>
          </p>
          <p className="text-sm">Telefon: +420 123 456 789</p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
