export default function ModalContainer({
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  children,
}) {
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
}
