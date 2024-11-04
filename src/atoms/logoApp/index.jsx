import PropTypes from "prop-types";

const LogoApp = ({ imgClass = "h-9", textClass = "text-3xl" }) => {
  return (
    <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <img src="/Logo.png" className={imgClass} alt="Flowbite Logo" />
        <span className={`self-center font-semibold whitespace-nowrap dark:text-white ${textClass}`}>SIMS PPOB</span>
    </div>
  );
};

LogoApp.propTypes = {
    imgClass: PropTypes.string,
    textClass: PropTypes.string,
  };

export default LogoApp;