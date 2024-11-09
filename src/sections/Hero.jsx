import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Fitness aplikace
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Přívětivě jednoduché
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Překroč své limity s aplikací, která tě provede na cestě od snu k
              realitě!
            </p>

            <Link
              to="/auth/Registrace"
              className="text-purple-400 hover:text-purple-500 font-semibold"
            >
              <Button icon="/images/zap.svg">Vyzkoušet</Button>
            </Link>
          </div>

          <div className="absolute -top-32 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res">
            <img
              src="/images/hero.png"
              className="size-200 max-lg:h-auto"
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
