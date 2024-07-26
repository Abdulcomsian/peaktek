import styles from "./CustomerAgreement.module.css";
import { Input } from "@components";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row  md:justify-between md:items-center mb-4">
        <div className="flex items-center md:mb-0 mb-4 w-full mx-2">
          <span className="mr-2">I</span>{" "}
          <Input className={`${styles["custom-input"]} md:mr-2`} />
        </div>
        <span className="w-full md:mb-0 mb-4">
          the undersigned, hereby cancel this transaction as of{" "}
        </span>
        {/* <CustomDatePicker className={` w-full md:max-w-xs`} size="large" /> */}
      </div>
      <div>Customer Signature:</div>
    </>
  );
}
