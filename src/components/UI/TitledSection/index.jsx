export default function TitledSection({
  title,
  titleClass = "",
  wrapperClass,
  children,
}) {
  return (
    <section className={`mb-4 ${wrapperClass}`}>
      {title && (
        <h2 className={`text-lg font-semibold text-black mb-2 ${titleClass}`}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
