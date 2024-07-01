import { useState } from "react";
import { Button } from "../UI";
import SignatureModal from "@components/Modals/SignatureModal";

export default function ShowSignatureModalBtn() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        className="mb-3  text-xs md:text-sm"
        variant="gradient"
        onClick={() => setShowModal(true)}
      >
        Sign now
      </Button>
      {showModal && (
        <SignatureModal
          open={showModal}
          onCancel={() => setShowModal(false)}
          onOk={() => setShowModal(false)}
        />
      )}
    </>
  );
}
