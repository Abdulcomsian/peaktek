import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function OnShowEditIcon({
  children,
  className,
  contentEditable,
}) {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const amountEl = useRef(null);

  const handleContentEditable = function () {
    console.log("click happend");
    if (isHover) {
      setIsEdit(true);
      amountEl.current.focus();
    } else {
      setIsEdit(false);
      amountEl.current.blur();
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`p-1 ${isHover ? "bg-slate-200" : ""} ${className}`}
    >
      <p contentEditable={isEdit} ref={amountEl}>
        {children}
      </p>
      {isHover && (
        <CiEdit
          size="20px"
          className="cursor-pointer"
          onClick={handleContentEditable}
        />
      )}
    </div>
  );
}
