import logowhite from "../../assets/logo-white.svg";
import logoFullWhite from "../../assets/logo-white-full.svg";

const Logo = ({ className, varient }) => {
  if (varient === "white-main")
    return <img src={logoFullWhite} className={className} />;
  if (varient === "white") return <img src={logowhite} className={className} />;
  return <img src="logo-blue.png" className={className} />;
};

export default Logo;
