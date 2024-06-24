export default function TaskAssignment() {
  return;
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Task Assignment</h1>
    <AssigneeSelector />
  </div>;
}

const AssigneeSelector = () => {
  const [assignee, setAssignee] = useState(null); // State to hold selected assignee

  const handleAssigneeChange = (value) => {
    setAssignee(value);
  };

  const handleUnassign = () => {
    setAssignee(null);
  };

  return (
    <div className="relative">
      <Select
        placeholder="Assignee"
        value={assignee}
        onChange={handleAssigneeChange}
        className="w-40"
      >
        <Option value="user1">User 1</Option>
        <Option value="user2">User 2</Option>
        <Option value="user3">User 3</Option>
      </Select>
      {assignee && (
        <Button
          type="text"
          className="absolute right-0 text-red-600"
          onClick={handleUnassign}
        >
          Unassign
        </Button>
      )}
    </div>
  );
};
