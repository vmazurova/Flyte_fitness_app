import clsx from "clsx";
import { motion } from "framer-motion";
import { Marker } from "./Marker.jsx";

const Button = ({
  icon,
  children,
  href,
  containerClassName,
  onClick,
  markerFill,
}) => {
  const Inner = () => (
    <>
      <span className="relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden">
        {icon && (
          <img
            src={icon}
            alt="circle"
            className="size-10 mr-5 object-contain z-10"
          />
        )}

        <span className="relative z-2 font-poppins base-bold text-gray-300 uppercase">
          {children}
        </span>
      </span>
      <span className="glow-before glow-after" />
    </>
  );

  const MotionTag = href ? motion.a : motion.button; 

  return (
    <MotionTag
      className={clsx(
        "relative p-0.5 g5 rounded-2xl shadow-500 group",
        containerClassName
      )}
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{
        scale: 0.8,
        borderRadius: "100%",
      }}
    >
      <Inner />
    </MotionTag>
  );
};

export default Button;
