import { useState } from "react";
import Input from "../Input";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addJob } from "../../store/slices/JobsSlice";
import TabComponent from "../../Boards/TabComponent";

function JobDetailModal({ onClick, open, onCancel, onOk }) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      className="w-full"
      footer={null}
      width="80%"
    >
      <TabComponent />
    </Modal>
  );
}

export default JobDetailModal;
