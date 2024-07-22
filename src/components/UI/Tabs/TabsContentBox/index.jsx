export default function TabsContentBox({ contentTitle, children, className }) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 w-full max-w-screen-xl ${className}`}
    >
      {contentTitle && (
        <h1 className="text-xl font-poppins font-medium text-black mb-4">
          {contentTitle}
        </h1>
      )}
      {children}
    </div>
  );
}
