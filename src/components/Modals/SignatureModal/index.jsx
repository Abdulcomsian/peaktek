import { Modal } from "antd";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureModal({
  open,
  onCancel,
  onOk = false,
  onSubmit,
  isSubmitting,
}) {
  const signatureRef = useRef();

  // Function to clear the signature canvas
  const clearSignature = () => {
    signatureRef.current.clear();
  };

  // Function to get the base64 encoded image data
  const saveSignature = () => {
    const imageData = signatureRef.current.toDataURL();
    console.log(imageData); // You can send this data to your backend or use it as needed
    onSubmit(imageData);
  };
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <div>
        <label htmlFor="" className="text-base mb-1 mt-4 font-semibold">
          Signature:
        </label>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            width: "300px",
            height: 100,
            className: "border rounded-lg bg-[#fff]",
          }}
        />
        <div className="flex items-center gap-2 mt-4">
          <button
            disabled={isSubmitting}
            onClick={clearSignature}
            className="border border-red-300 bg-red-500 px-4 py-2 rounded-md text-white font-semibold"
          >
            Clear
          </button>
          <button
            disabled={isSubmitting}
            onClick={saveSignature}
            className="border border-blue-300 bg-blue-500 rounded-md px-4 py-2 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
