export default function Header({ children, companyName }) {
  return (
    <header>
      <h1 className="text-2xl font-medium">{companyName}</h1>
      {children}
    </header>
  );
}
