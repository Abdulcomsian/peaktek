import { clientBaseURL, clientEndPoints } from "@services/config";
import { Modal } from "antd";
import { useRef } from "react";
import toast from "react-hot-toast";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureModal({ id, open, onCancel, onOk }) {
  const signatureRef = useRef();

  // Function to clear the signature canvas
  const clearSignature = () => {
    signatureRef.current.clear();
  };

  // Function to get the base64 encoded image data
  const saveSignature = async () => {
    const imageData = signatureRef.current.toDataURL();
    console.log(imageData); // You can send this data to your backend or use it as needed
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.post(
        `${clientEndPoints?.createSignature}/${id}`,
        { sign_image: imageData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
        onOk();
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onCancel}
      footer={null}
      closeIcon={null}
    >
      <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{
          width: "460px",
          height: 100,
          className: "border rounded-lg bg-[#fff] py-4",
        }}
      />
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={clearSignature}
          className="border border-red-300 bg-red-500 px-4 py-2 rounded-md text-white font-semibold"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          className="border border-blue-300 bg-blue-500 rounded-md px-4 py-2 text-white font-semibold"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
