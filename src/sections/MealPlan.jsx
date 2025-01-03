import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MealPlan = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section>
      <Element
        name="mealPlan"
        className="b2 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16"
      >
        <div className="container relative min-h-[600px]">
          <div className="absolute left-[calc(50%-1px)] top-[-50px] -z-1 h-full w-0.5 bg-s2 max-lg:hidden" />
          <div className="flex items-center">
            <div className="relative mr-6 flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
              <div className="mb-15">
                <p className="caption mb-5 max-md:mb-2.5 max-lg:h4 max-md:h5 z-3 relative mx-auto max-w-lg text-center max-sm:max-w-sm">
                  - JÍDELNÍČKY -
                </p>
                <motion.h3
                  ref={ref}
                  initial={{ x: -100, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm"
                >
                  Správně nastavená strava je klíč.
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-300 mb-6"
                  initial={{ x: -100, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                  Bez ohledu na tvůj životní styl,{" "}
                  <strong>sestavíme jídelníček</strong>, který{" "}
                  <strong className="mr-2 mb-5 max-md:mb-2.5 text-p3">
                    respektuje
                  </strong>
                  tvoje chuťové preference a nutriční potřeby. Jednoduchý,
                  efektivní a přizpůsobený tak, aby tě posunul blíže k tvým
                  cílům.
                </motion.p>
                <motion.ul
                  className="list-disc pl-5 mb-6 text-gray-300 space-y-2 py-6"
                  initial={{ x: -100, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                  <li>
                    <strong>Personalizovaný</strong> přístup podle tvých
                    specifických potřeb
                  </li>
                  <li>
                    Podpora a motivace pro <strong>dlouhodobé výsledky</strong>
                  </li>
                  <li>Doporučené postupy pro zdravé a vyvážené stravování</li>
                  <li>Možnost úprav jídelníčku pro maximální flexibilitu</li>
                </motion.ul>
              </div>

              <motion.ul
                className="flex flex-wrap items-center gap-6"
                initial={{ x: -100, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                <Link
                  to="/auth/Registrace"
                  className="text-purple-400 hover:text-purple-500 font-semibold"
                >
                  <Button icon="/images/zap.svg">Chci se registrovat!</Button>
                </Link>
              </motion.ul>
            </div>

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 1.0, ease: "easeOut" }}
              className="mb-10 max-md:hidden"
            >
              <div className="rounded-40 relative w-[855px] border-2 border-s5 p-2">
                <div className="relative rounded-3xl bg-s1 px-5 pb-5 pt-5">
                  <img
                    src="/images/mealPlan2.png"
                    width={855}
                    height={655}
                    alt="screen"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default MealPlan;
