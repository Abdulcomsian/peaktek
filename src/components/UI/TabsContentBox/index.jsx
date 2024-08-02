import { Fragment } from "react";

export default function TabsContentBox({ contentTitle, children, className }) {
  return (
    <Fragment>
      {contentTitle && (
        <h1 className="text-xl font-poppins font-medium text-black mb-4">
          {contentTitle}
        </h1>
      )}
      <div
        className={`bg-white rounded-2xl  w-full max-w-screen-xl ${className} `}
      >
        {children}
      </div>
    </Fragment>
  );
}
