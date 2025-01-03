import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Spotlight from "./Spotlight";
import WorflowImg01 from "../images/workflow-01.png";
import WorflowImg02 from "../images/workflow-02.png";
import WorflowImg03 from "../images/workflow-03.png";

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} name="features">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r from-transparent to-p1 after:h-px after:w-8 after:bg-gradient-to-l from-transparent to-p2/50">
              <span className="inline-flex bg-gradient-to-r from-p2 to-p1 bg-clip-text text-transparent">
                VŠE CO POTŘEBUJEŠ NA MÍRU
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#C4CBF5,#8D36FF,#F4F4F5,#A35CFF,#C4CBF5)] bg-[length:200%_auto] bg-clip-text text-transparent text-3xl font-semibold md:text-4xl">
              Sleduj svůj progres
            </h2>
            <br />
            <p className="text-lg text-white">
              Jednoduché a elegantní rozhraní, které ti umožní okamžitě začít
              pracovat na svých fitness cílech. Aplikace se snadno přizpůsobí
              tvému osobnímu tréninkovému plánu, jídelníčku i kurzům, a poskytne
              ti vše potřebné pro dosažení lepších výsledků.
            </p>
          </div>

          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            <motion.a
              initial={{ x: -200, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
              className="group relative h-full overflow-hidden rounded-2xl bg-s2 p-px"
              href="#0"
            >
              <div className="relative z-10 h-full overflow-hidden rounded-[inherit] bg-s1/50">
                <img
                  className="inline-flex opacity-70"
                  src={WorflowImg01}
                  width={350}
                  height={288}
                  alt="Workflow 01"
                />
                <div className="p-6 z-20">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-p2 px-2.5 py-0.5 text-xs font-normal text-white">
                      Jídelníčky na míru
                    </span>
                  </div>
                  <p className="text-white">
                    Pomocí Flyte ti tvůj trenér vytvoří jídelníček na míru,
                    podle kterého se budeš řídit.
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.a
              initial={{ x: 0, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
              className="group relative h-full overflow-hidden rounded-2xl bg-s2 p-px"
              href="#0"
            >
              <div className="relative z-10 h-full overflow-hidden rounded-[inherit] bg-s1/50">
                <img
                  className="inline-flex opacity-70"
                  src={WorflowImg02}
                  width={350}
                  height={288}
                  alt="Workflow 02"
                />
                <div className="p-6 z-20">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-p2 px-2.5 py-0.5 text-xs font-normal text-white">
                      Tréninky na míru
                    </span>
                  </div>
                  <p className="text-white">
                    Trénink dělaný přímo na určitou partii těla, který si můžeš
                    podle svých potřeb poupravit!
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.a
              initial={{ x: 200, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
              className="group relative h-full overflow-hidden rounded-2xl bg-s2 p-px"
              href="#0"
            >
              <div className="relative z-10 h-full overflow-hidden rounded-[inherit] bg-s1/50">
                <img
                  className="inline-flex opacity-70"
                  src={WorflowImg03}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                />
                <div className="p-6 z-20">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-p2 px-2.5 py-0.5 text-xs font-normal text-white">
                      Přihlaš se na kurz
                    </span>
                  </div>
                  <p className="text-white">
                    Přihlaš se na nejrůznější kurzy, které naše fitko nabízí a
                    vyzkoušej novou verzi silového tréninku!
                  </p>
                </div>
              </div>
            </motion.a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
