import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { userData } from "../helpers.jsx";

const Hero = () => {
  const { username } = userData();
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeOut" }}
              className="caption small-2 uppercase text-p3"
            >
              Fitness aplikace
            </motion.div>

            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeOut" }}
              className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
            >
              Vitej {username}
            </motion.h1>

            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Překroč své limity s aplikací, která tě provede na cestě od snu k
              realitě!
            </p>

            <Link
              to="/LogOut"
              className="text-purple-400 hover:text-purple-500 font-semibold"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 40,
                  duration: 3.0,
                }}
              >
                <Button icon="/images/zap.svg">Odhlasit</Button>
              </motion.div>
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
