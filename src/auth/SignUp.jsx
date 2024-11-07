import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <br />
            <br />
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.p2),theme(colors.gray.50),theme(colors.p3),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
              Create an account
            </h1>
          </div>
          {/* Contact form */}
          <form className="mx-auto max-w-[400px]">
            <div className="space-y-6">
              <div>
                <label
                  className="mb-2 block text-lg font-medium text-indigo-200/65"
                  htmlFor="name"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input w-full rounded-20 text-lg py-3"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-lg font-medium text-indigo-200/65"
                  htmlFor="company"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  type="text"
                  className="form-input w-full rounded-20 text-lg py-3"
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-lg font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full rounded-20 text-lg py-3"
                  placeholder="Your work email"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-lg font-medium text-indigo-200/65"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full rounded-20 text-lg py-3"
                  placeholder="Password (at least 10 characters)"
                  required
                />
              </div>
            </div>
            <div className="mt-8 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-p2 to-p1 bg-[length:100%_100%] bg-[bottom] text-white shadow-300 hover:bg-[length:100%_150%] rounded-20 text-lg py-3"
              >
                Register
              </button>
              <div className="flex items-center gap-3 text-center text-lg italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>
              <button
                type="button"
                className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] rounded-20 text-lg py-3"
              >
                Sign In with Google
              </button>
            </div>
          </form>
          {/* Bottom link */}
          <div className="mt-8 text-center text-lg text-indigo-200/65">
            Already have an account?{" "}
            <Link className="font-medium text-indigo-500" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
