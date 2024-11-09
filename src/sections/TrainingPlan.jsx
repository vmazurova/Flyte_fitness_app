import { Element } from "react-scroll";
import Button from "../components/Button.jsx";

const TrainingPlan = () => {
  return (
    <section>
      <Element
        name="trainingPlans"
        className="b2 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16"
      >
        <div className="container">
          <div className="flex flex-row-reverse items-center gap-10">
            {" "}
            {/* Obrácené rozvržení s mezery */}
            {/* Textová část */}
            <div className="relative ml-6 max-w-lg text-left">
              <h2 className="text-4xl font-extrabold text-gradient mb-6">
                Tvůj Osobní Tréninkový Plán
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Na cestě k lepší fyzické kondici záleží na správném vedení. Naše
                tréninkové plány nejsou jenom o cvičení - jsou navrženy tak, aby
                podpořily tvůj progres a motivaci. S každým cvikem, každou sérií
                a každým opakováním se dostáváš blíž ke svému cíli.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Bez ohledu na tvou úroveň, vytvoříme plán, který respektuje
                tvoje schopnosti a časové možnosti. Flexibilní, efektivní a
                přizpůsobený přesně tobě.
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-2">
                <li>
                  {" "}
                  <strong>Individuální přístup</strong> podle tvých potřeb
                </li>
                <li> Sledování pokroku a motivace</li>
                <li> Doporučené techniky pro bezpečné cvičení</li>
                <li> Flexibilita a možnost úprav plánu</li>
              </ul>
              <Button
                icon="/images/zap.svg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Začni Svojí Cestu
              </Button>
            </div>
            <div className="mb-10 max-md:hidden">
              <div className="rounded-3xl relative w-[400px] lg:w-[600px] border-2 border-blue-300 p-4 shadow-lg">
                <div className="relative rounded-3xl bg-gray-100 px-6 pb-6 pt-14">
                  <img
                    src="/images/screen.jpg"
                    width={400}
                    height={350}
                    alt="Tréninkový plán"
                    className="rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ikony a loga na dolní části */}
          <ul className="mt-24 flex justify-center max-lg:hidden space-x-8">
            <li>
              <img
                src="/images/icon1.png"
                width={60}
                height={60}
                alt="Ikona 1"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </li>
            <li>
              <img
                src="/images/icon2.png"
                width={60}
                height={60}
                alt="Ikona 2"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </li>
            <li>
              <img
                src="/images/icon3.png"
                width={60}
                height={60}
                alt="Ikona 3"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </li>
          </ul>
        </div>
      </Element>
    </section>
  );
};

export default TrainingPlan;
