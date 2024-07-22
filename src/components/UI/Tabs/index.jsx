import { FileIcon, GalleryIcon, TextIcon } from "@components/UI";

export default function Tabs({ items }) {
  return (
    <div className="flex p-2 w-full max-w-xs mb-4">
      {items.map((item) => (
        <TabsItem item={item} />
      ))}
    </div>
  );
}

function TabsItem({ item }) {
  return (
    <div className="icon-container cursor-pointer text-black text-opacity-30 hover:bg-bluish hover:text-black border-b border-gray-200 hover:border-indigo-600 px-4">
      {item.icon}
      <span> {item.title}</span>
    </div>
  );
}
