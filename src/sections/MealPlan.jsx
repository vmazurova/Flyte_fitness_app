import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";

const MealPlan = () => {
  return (
    <section>
      <Element
        name="mealPlan"
        className="b2 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16"
      >
        <div className="container relative min-h-[600px]">
          {" "}
          <div className="absolute left-[calc(50%-1px)] top-[-50px] -z-1 h-full w-0.5 bg-s2 max-lg:hidden" />
          <div className="flex items-center">
            <div className="relative mr-6 flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
              <div className="mb-15">
                <p className="caption mb-5 max-md:mb-2.5 max-lg:h4 max-md:h5 z-3 relative mx-auto max-w-lg text-center max-sm:max-w-sm">
                  - JÍDELNÍČKY -
                </p>
                <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm">
                  Správně nastavená strava je klíč.
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Bez ohledu na tvůj životní styl,{" "}
                  <strong>sestavíme jídelníček</strong>, který{" "}
                  <strong className="mr-2 mb-5 max-md:mb-2.5 text-p3">
                    respektuje
                  </strong>
                  tvoje chuťové preference a nutriční potřeby. Jednoduchý,
                  efektivní a přizpůsobený tak, aby tě posunul blíže k tvým
                  cílům.
                </p>
                <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-2 py-6">
                  <li>
                    <strong>Personalizovaný</strong> přístup podle tvých
                    specifických potřeb
                  </li>
                  <li>
                    Podpora a motivace pro <strong>dlouhodobé výsledky</strong>
                  </li>
                  <li>Doporučené postupy pro zdravé a vyvážené stravování</li>
                  <li>Možnost úprav jídelníčku pro maximální flexibilitu</li>
                </ul>
              </div>

              <ul className="flex flex-wrap items-center gap-6">
                <Link
                  to="/auth/Registrace"
                  className="text-purple-400 hover:text-purple-500 font-semibold"
                >
                  <Button icon="/images/zap.svg">Chci se registrovat!</Button>
                </Link>
              </ul>
            </div>

            <div className="mb-10 max-md:hidden">
              <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 p-6">
                <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
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

export default MealPlan;
