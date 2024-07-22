export default function Header({ children, companyName, className }) {
  return (
    <header className={className}>
      <h1 className="text-2xl font-poppins font-medium">{companyName}</h1>
      {children}
    </header>
  );
}
