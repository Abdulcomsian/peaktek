import { Modal } from "antd";

import TabComponent from "../../Boards/TabComponent";

function JobDetailModal({ open, onCancel, onOk, selectedTask }) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      className="w-full"
      footer={null}
      width="95%"
      // height="80vh"
    >
      <TabComponent selectedTask={selectedTask} />
    </Modal>
  );
}

export default JobDetailModal;
