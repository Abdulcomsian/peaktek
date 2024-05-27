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

import "./kanban.css";

const initialColumns = [
  { id: "newLead", title: "New Lead" },
  { id: "signedDeal", title: "Single Deal" },
  { id: "adjuster", title: "Adjustor" },
];

const initialTasks = {
  newLead: [
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
  ],
  signedDeal: [{ id: "task-3", content: "Task 3" }],
  adjuster: [
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
  const handleAddBoard = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    setTasks((tasks) => ({
      ...tasks,
      newLead: [
        ...tasks.newLead,
        { id: newCompanyName.toLowerCase(), title: newCompanyName },
      ],
    }));
    setShowModal(false);
    setNewCompanyName("");
  };

  return (
    <div className="kanban-container">
      <Button
        variant="primary"
        className="btn-add-board"
        onClick={handleAddBoard}
      >
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center fs-2">New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="companyName">
            <Form.Label>Job Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address and select"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddColumn}>
            Add Board
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function DraggableColumn({ id, title, tasks }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    minWidth: "350px",
    backgroundColor: "rgb(244, 246, 248)",
    borderRadius: "10px",
    padding: "15px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3 className="column-title">{title}</h3>
      <Column id={id.replace("column-", "")} tasks={tasks} />
    </div>
  );
}

function Column({ id, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="task-list">
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
    margin: "4px 0",
    border: "1px solid rgb(207 207 207 / 56%)",
    borderRadius: "10px",
    backgroundColor: "white",
    zIndex: "1",
  };

  console.log("content", content);

  return (
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    //   {content}
    // </div>
    <Card
      className="task-card"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Card.Body>
        <Card.Title className="task-owner">Leon Simmons</Card.Title>
        <Card.Text className="address">{content}</Card.Text>
      </Card.Body>
      <Card.Footer className="task-card-footer">
        <span className="task-status">New</span>
        <span className="last-update">
          Updated 3 min ago <span className="profile-text-box">IM</span>
        </span>
      </Card.Footer>
    </Card>
  );
}

export default KanbanBoard;
