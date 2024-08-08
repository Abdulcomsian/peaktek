import {
  AuthorizationForm,
  InspectionForm,
  IntroductionForm,
  PaymentScheduleForm,
  QuoteDetailsForm,
  Title,
  TitleForm,
} from "@components/Forms";
import { Fragment } from "react";

function renderSection(currTab) {
  switch (currTab) {
    case 2:
      return <TitleForm />;
    case 3:
      return <IntroductionForm />;
    case 4:
      return <InspectionForm />;
    case 5:
      return <QuoteDetailsForm />;
    case 6:
      return <AuthorizationForm />;
    case 7:
      return <PaymentScheduleForm />;
  }
}

export default function Tabs({
  collapsable = false,
  items,
  activeTab,
  onClick,
}) {
  if (collapsable)
    return (
      <Fragment>
        {items?.map((item) => (
          <div key={item.id}>
            <TabItem item={item} activeTab={activeTab} onClick={onClick} />
            {activeTab === item.id && renderSection(activeTab)}
          </div>
        ))}
      </Fragment>
    );

  return (
    <div
      className="flex p-2 mb-4 overflow-auto scrollbar-hidden "
      style={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}
    >
      {items.map((item) => (
        <TabItem
          key={item?.id}
          item={item}
          activeTab={activeTab}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

function TabItem({ item, activeTab, onClick }) {
  return (
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
  );
}
