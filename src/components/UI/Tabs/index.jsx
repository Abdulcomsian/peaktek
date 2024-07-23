export default function Tabs({ items, activeTab, onClick }) {
  return (
    <div
      className="flex p-2 mb-4 overflow-auto scrollbar-hidden"
      style={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}
    >
      {items.map((item) => (
        <div
          onClick={() => onClick(item?.id)}
          className={`icon-container cursor-pointer  border-b border-gray-200 px-4 py-2 min-w-fit ${
            activeTab === item.id
              ? "bg-bluish text-black border-indigo-600"
              : "text-black text-opacity-30"
          } hover:bg-bluish hover:text-black hover:border-indigo-600`}
          key={item?.id}
        >
          {item.icon}
          <span> {item.title}</span>
        </div>
      ))}
    </div>
  );
}
