import React from "react";
import Spotlight from "./Spotlight";
import WorflowImg01 from "../images/workflow-01.png";
import WorflowImg02 from "../images/workflow-02.png";
import WorflowImg03 from "../images/workflow-03.png";

export default function Features() {
  return (
    <section name="features">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-20">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r from-transparent to-p1 after:h-px after:w-8 after:bg-gradient-to-l from-transparent to-p2/50">
              <span className="inline-flex bg-gradient-to-r from-p2 to-p1 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl">
                VŠE CO POTŘEBUJEŠ NA MÍRU
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#C4CBF5,#8D36FF,#F4F4F5,#A35CFF,#C4CBF5)] bg-[length:200%_auto] bg-clip-text text-transparent text-2xl font-semibold md:text-4xl">
              Sleduj svůj progres
            </h2>
            <br />
            <p className="text-base sm:text-lg text-p4/65">
              Jednoduché a elegantní rozhraní, které ti umožní okamžitě začít
              pracovat na svých fitness cílech. Aplikace se snadno přizpůsobí
              tvému osobnímu tréninkovému plánu, jídelníčku i kurzům, a poskytne
              ti vše potřebné pro dosažení lepších výsledků.
            </p>
          </div>

          <Spotlight className="group mx-auto grid max-w-xs sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 items-start gap-6">
            <a
              className="group relative h-full overflow-hidden rounded-2xl bg-s2 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-p2 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-p1 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:before:opacity-100"
              href="#0"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-s3 after:absolute after:inset-0 after:bg-gradient-to-br from-s1 via-s2 to-s1">
                <img
                  className="inline-flex w-full sm:w-3/4 lg:w-auto"
                  src={WorflowImg01}
                  alt="Workflow 01"
                />
                <div className="p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3">
                    <span className="btn-sm relative rounded-full bg-s4 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-gradient-to-r from-p2 to-p1 bg-clip-text text-transparent">
                        Jídelníčky na míru
                      </span>
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-p4/65">
                    Pomocí Flyte ti tvůj trenér vytvoří jídelníček na míru,
                    podle kterého se budeš řídit.
                  </p>
                </div>
              </div>
            </a>

            {/* Card 2 */}
            <a
              className="group relative h-full overflow-hidden rounded-2xl bg-s2 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-p2 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-p1 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:before:opacity-100"
              href="#0"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-s3 after:absolute after:inset-0 after:bg-gradient-to-br from-s1 via-s2 to-s1">
                <img
                  className="inline-flex w-full sm:w-3/4 lg:w-auto"
                  src={WorflowImg02}
                  alt="Workflow 02"
                />
                <div className="p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3">
                    <span className="btn-sm relative rounded-full bg-s4 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
                        Tréninky na míru
                      </span>
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-p4/65">
                    Trénink dělaný přímo na určitou partii těla, který si můžeš
                    podle svých potřeb poupravit!
                  </p>
                </div>
              </div>
            </a>

            {/* Card 3 */}
            <a
              className="group relative h-full overflow-hidden rounded-2xl bg-s2 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:before:opacity-100"
              href="#0"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-s3 after:absolute after:inset-0 after:bg-gradient-to-br from-s1 via-s2 to-s1">
                <img
                  className="inline-flex w-full sm:w-3/4 lg:w-auto"
                  src={WorflowImg03}
                  alt="Workflow 03"
                />
                <div className="p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3">
                    <span className="btn-sm relative rounded-full bg-s4 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-gradient-to-r from-p2 to-p1 bg-clip-text text-transparent">
                        Přihlaš se na kurz
                      </span>
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-p4/65">
                    Přihlaš se na nejrůznější kurzy, které naše fitko nabízí a
                    vyzkoušej novou verzi silového tréninku!
                  </p>
                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
