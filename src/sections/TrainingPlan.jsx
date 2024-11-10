import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
const TrainingPlan = () => {
  return (
    <section>
      <Element
        name="trainingPlan"
        className="b2 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16"
      >
        <div className="container relative">
          {/* Přidání obrázků na pozadí */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/bg-outlines.svg"
              width={960}
              height={380}
              alt="outline"
              className="absolute top-0 left-0 opacity-25"
            />
            <img
              src="/images/bg-outlines-fill.png"
              width={960}
              height={380}
              alt="outline fill"
              className="absolute inset-0 opacity-5 mix-blend-soft-light"
            />
          </div>

          <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm">
            Tvůj osobní trénink na míru
          </h3>

          <div className="relative z-2 flex flex-row-reverse items-center gap-10">
            <div className="relative ml-6 max-w-lg text-left">
              <p className="text-lg text-gray-400 mb-6">
                Na cestě k lepší <strong>fyzické kondici</strong> záleží na
                správném vedení.
              </p>
              <p className="text-lg text-gray-400 mb-6">
                Bez ohledu na tvou úroveň, vytvoříme plán, který respektuje
                tvoje schopnosti a časové možnosti. Flexibilní, efektivní a
                přizpůsobený přesně tobě.
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-2 py-6">
                <li>
                  <strong>Individuální přístup</strong> podle tvých potřeb
                </li>
                <li>Sledování pokroku a motivace</li>
                <li>
                  <strong>Doporučené techniky pro bezpečné cvičení</strong>
                </li>
                <li>Flexibilita a možnost úprav plánu</li>
              </ul>
              <Link
                to="/auth/Registrace"
                className="text-purple-400 hover:text-purple-500 font-semibold"
              >
                <Button
                  icon="/images/zap.svg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Chci to vyzkoušet!
                </Button>
              </Link>
            </div>

            <div className="mb-10 max-md:hidden -ml-20">
              <div className="rounded-40 relative w-[855px] border-2 border-s5 p-2">
                <div className="relative rounded-3xl bg-s1 px-5 pb-5 pt-5">
                  <img
                    src="/images/screen.jpg"
                    width={855}
                    height={655}
                    alt="screen"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default TrainingPlan;
