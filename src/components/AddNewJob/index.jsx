import { useState } from "react";
import { Button } from "..";
import { FaPlus } from "react-icons/fa6";
import { NewJobModal } from "@components/Modals";

export default function AddNewJob({ className }) {
  const [showAddNewJobModal, setAddNewJobModal] = useState(false);
  return (
    <>
      <Button
        onClick={() => setAddNewJobModal(true)}
        className={className}
        variant="gradient"
      >
        <FaPlus className="text-white mr-1" />
        New Job
      </Button>
      {showAddNewJobModal && (
        <NewJobModal
          open={showAddNewJobModal}
          onOk={() => setAddNewJobModal(false)}
          onCancel={() => setAddNewJobModal(false)}
          onAddJob={() => setInvalidatePage((is) => !is)}
        />
      )}
    </>
  );
}