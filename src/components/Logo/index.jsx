import logowhite from "../../assets/logo-white.svg";

const Logo = ({ className, varient }) => {
  // if(varient ="logo-main") return <img src={} className={}/>
  if (varient === "white") return <img src={logowhite} className={className} />;
  return <img src="logo-blue.png" className={className} />;
};

export default Logo;
