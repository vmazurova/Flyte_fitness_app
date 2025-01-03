import { testimonials } from "../constants/index.jsx";
import TestimonialItem from "../components/TestimonialItem.jsx";

const Testimonials = () => {
  const halfLength = Math.floor(testimonials.length / 2);

  return (
    <section
      className="relative z-2 py-24 md:py-28 lg:py-40 mb-10"
      name="testemonials"
    >
      <div className="container block lg:flex">
        <div className="testimonials_head-res relative z-2 mr-20 flex-300">
          <p className="caption mb-5 max-md:mb-2.5">Nevěříš nám?</p>
          <h3 className="h3 max-md:h5 text-p4">
            Podívej se, co říkají uživatelé:
          </h3>
        </div>

        <div className="testimonials_inner-after testimonials_inner-before relative -my-12 -mr-3 flex items-start max-lg:static max-md:block">
          <div className="testimonials_group-after flex-50">
            {testimonials.slice(0, halfLength).map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                item={testimonial}
                containerClassName="last:after:hidden last:after:max-md:block"
              />
            ))}
          </div>

          <div className="flex-50">
            {testimonials.slice(halfLength).map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                item={testimonial}
                containerClassName="last:after:hidden after:right-auto after:left-0 after:max-md:-left-4 md:px-12"
              />
            ))}
          </div>
          <ul className="mt-24 flex justify-center max-lg:hidden space-x-8">
            <li>
              <img
                src="/images/logos/ContoursLogo.png"
                width={200}
                height={200}
                alt="Ikona 1"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </li>
            <li>
              <img
                src="/images/logos/logo1.png"
                width={200}
                height={200}
                alt="Ikona 2"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </li>
            <li>
              <img
                src="/images/logos/gecp(1).png"
                width={200}
                height={200}
                alt="Ikona 3"
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul className="mt-40 flex justify-center max-lg:hidden space-x-8">
        <li>
          <img
            src="/images/logos/ContoursLogo.png"
            width={200}
            height={200}
            alt="Ikona 1"
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </li>
        <li>
          <img
            src="/images/logos/logo1.png"
            width={200}
            height={200}
            alt="Ikona 2"
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </li>
        <li>
          <img
            src="/images/logos/gecp(1).png"
            width={200}
            height={200}
            alt="Ikona 3"
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </li>
      </ul>
    </section>
  );
};

export default Testimonials;
