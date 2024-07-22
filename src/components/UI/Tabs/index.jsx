export default function Tabs({ items, onClick }) {
  return (
    <div
      className="flex p-2 mb-4 overflow-auto scrollbar-hidden"
      style={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}
    >
      {items.map((item) => (
        <div
          key={item?.id}
          onClick={() => onClick(item?.id)}
          className="icon-container cursor-pointer text-black text-opacity-30 hover:bg-bluish hover:text-black border-b border-gray-200 hover:border-indigo-600 px-4 min-w-fit"
        >
          {item.icon}
          <span> {item.title}</span>
        </div>
      ))}
    </div>
  );
}
