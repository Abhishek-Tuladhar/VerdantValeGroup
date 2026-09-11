import logo from "../../assets/Images/logo.png";

export default function Logo({ className = "h-10 w-10" }) {
  return (
    <img
      src={logo}
      className={className}
      role="img"
      aria-label="Verdant Vale Group"
      alt="Verdant Vale Group"
    />
  );
}