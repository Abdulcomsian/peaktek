import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { Modal } from "antd";
import { useRef } from "react";
import toast from "react-hot-toast";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureModal({
  id,
  open,
  onCancel,
  onOk,
  setIsDone,
}) {
  const signatureRef = useRef();

  // Function to clear the signature canvas
  const clearSignature = () => {
    signatureRef.current.clear();
  };

  // Function to get the base64 encoded image data
  const saveSignature = async () => {
    const imageData = signatureRef.current.toDataURL(); // You can send this data to your backend or use it as needed
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
        setIsDone(true);
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
      <label
        htmlFor="signature"
        className="block w-full text-sm font-medium text-gray-900 mb-2"
      >
        Draw Signature
      </label>
      <SignatureCanvas
        id="signature"
        ref={signatureRef}
        penColor="black"
        canvasProps={{
          width: "460px",
          height: 100,
          className: "border rounded-lg bg-[#fff] py-4",
        }}
      />
      <div className="flex items-center gap-2 mt-4">
        <Button
          onClick={clearSignature}
          className="text-black mr-2 border border-gray-300 px-4 py-1"
        >
          Clear
        </Button>
        <Button
          onClick={saveSignature}
          className="text-white btn-gradient px-4 py-1"
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
