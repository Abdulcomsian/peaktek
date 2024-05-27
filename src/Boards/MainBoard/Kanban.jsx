import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import { Modal, Button, Form, Card } from "react-bootstrap";

const initialColumns = [
  { id: "todo", title: "New Lead" },
  { id: "in-progress", title: "Single Deal" },
  { id: "done", title: "Adjustor" },
];

const initialTasks = {
  todo: [
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
  ],
  "in-progress": [{ id: "task-3", content: "Task 3" }],
  done: [
    { id: "task-4", content: "Task 4" },
    { id: "task-5", content: "Task 5" },
  ],
};

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    if (activeId.startsWith("column-") && overId.startsWith("column-")) {
      // Handle column dragging
      const activeIndex = columns.findIndex(
        (col) => col.id === activeId.replace("column-", "")
      );
      const overIndex = columns.findIndex(
        (col) => col.id === overId.replace("column-", "")
      );
      if (activeIndex !== overIndex) {
        setColumns((columns) => arrayMove(columns, activeIndex, overIndex));
      }
    } else {
      // Handle task dragging
      const sourceColumn = columns.find((column) =>
        tasks[column.id].some((task) => task.id === activeId)
      );
      const destinationColumn = columns.find((column) => column.id === overId);

      if (
        sourceColumn &&
        destinationColumn &&
        sourceColumn.id !== destinationColumn.id
      ) {
        setTasks((prev) => {
          const sourceTasks = prev[sourceColumn.id];
          const destinationTasks = prev[destinationColumn.id];

          const activeTask = sourceTasks.find((task) => task.id === activeId);

          return {
            ...prev,
            [sourceColumn.id]: sourceTasks.filter(
              (task) => task.id !== activeId
            ),
            [destinationColumn.id]: [...destinationTasks, activeTask],
          };
        });
      }
    }
  };

  //   const handleAddBoard = function () {
  //     //   setColumns()
  //   };
  const handleAddBoard = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: newCompanyName.toLowerCase(), title: newCompanyName },
    ]);
    setShowModal(false);
    setNewCompanyName("");
  };

  return (
    <>
      <Button variant="primary" onClick={handleAddBoard}>
        New
      </Button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={columns.map((col) => `column-${col.id}`)}
          strategy={rectSortingStrategy}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            {columns.map((column) => (
              <DraggableColumn
                key={column.id}
                id={`column-${column.id}`}
                title={column.title}
                tasks={tasks[column.id]}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddColumn}>
            Add Board
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DraggableColumn({ id, title, tasks }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    minWidth: "200px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    backgroundColor: "white",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3>{title}</h3>
      <Column id={id.replace("column-", "")} tasks={tasks} />
    </div>
  );
}

function Column({ id, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} content={task.content} />
        ))}
      </SortableContext>
    </div>
  );
}

function Task({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    padding: "8px",
    margin: "4px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    zIndex: "1",
  };

  return (
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    //   {content}
    // </div>
    <Card ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default KanbanBoard;
