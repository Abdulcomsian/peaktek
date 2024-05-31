import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
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
import { useEffect, useState } from "react";

import { Modal, Button, Form, Card, Badge } from "react-bootstrap";

import "./kanban.css";

const initialColumns = [
  { id: "newLead", title: "New Lead" },
  { id: "signedDeal", title: "Single Deal" },
  { id: "adjuster", title: "Adjustor" },
];

const initialTasks = {
  newLead: [
    { id: "task-6", content: "Task 6" },
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
  const [showAddNewJobModal, setAddNewJobModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event) {
    console.log("drag start");
    setIsDragging(true);
    setAddNewJobModal((is) => !is);
  }

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

      // if (
      //   sourceColumn &&
      //   destinationColumn &&
      //   sourceColumn.id !== destinationColumn.id
      // ) {
      //   setTasks((prev) => {
      //     const sourceTasks = prev[sourceColumn.id];
      //     const destinationTasks = prev[destinationColumn.id];

      //     const activeTask = sourceTasks.find((task) => task.id === activeId);

      //     return {
      //       ...prev,
      //       [sourceColumn.id]: sourceTasks.filter(
      //         (task) => task.id !== activeId
      //       ),
      //       [destinationColumn.id]: [...destinationTasks, activeTask],
      //     };
      //   });
      // }

      if (
        sourceColumn &&
        destinationColumn &&
        sourceColumn.id !== destinationColumn.id
      ) {
        setTasks((prevTasks) => {
          const sourceTasks = [...prevTasks[sourceColumn.id]]; // Create a copy of source tasks
          const destinationTasks = [...(prevTasks[destinationColumn.id] || [])]; // Create a copy of destination tasks, or initialize as an empty array if it doesn't exist

          const activeTaskIndex = sourceTasks.findIndex(
            (task) => task.id === activeId
          );
          const activeTask = sourceTasks[activeTaskIndex];

          // Remove the task from the source column
          sourceTasks.splice(activeTaskIndex, 1);

          // Add the task to the destination column
          destinationTasks.push(activeTask);

          return {
            ...prevTasks,
            [sourceColumn.id]: sourceTasks,
            [destinationColumn.id]: destinationTasks,
          };
        });
      }
    }
  };

  const handleAddNewBoard = () => {
    setAddNewJobModal(true);
  };
  const handleAddBoard = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleShowJobDetailModal() {
    console.log("DONE");
    // setShowJobDetailModal((is) => !is);
  }

  const handleAddJob = (e) => {
    e.preventDefault();
    setTasks((tasks) => ({
      ...tasks,
      newLead: [
        { id: newCompanyName.toLowerCase(), title: newCompanyName },
        ...tasks.newLead,
      ],
    }));
    setShowModal(false);
    setNewCompanyName("");
  };

  const handleAdd = function (e) {
    e.preventDefault();
    setColumns((columns) => [
      ...columns,
      { id: `column-${newBoardTitle}`, title: newBoardTitle },
    ]);
    setTasks((tasks) => ({
      ...tasks,
      [newBoardTitle.toLowerCase()]: [], // Add an empty array for tasks associated with the new column
    }));
    setAddNewJobModal(false);
  };

  return (
    <>
      <div className="kanban-container">
        <Button
          variant="primary"
          className="btn-add-board"
          onClick={handleAddBoard}
        >
          New
        </Button>
        <DndContext
          autoScroll={false}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          onDragStart={handleDragStart}
        >
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
                  tasks={tasks[column.id] ? tasks[column.id] : []}
                  someoneIsDragging={isDragging}
                />
              ))}
              <Button className="btn-add" onClick={handleAddNewBoard}>
                &#x2B;
              </Button>
            </div>
          </SortableContext>
        </DndContext>
        <Modal
          className="newJobModal"
          show={showModal}
          onHide={handleCloseModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center fs-2">New job</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mb-4">
            <Form.Group controlId="companyName">
              <Form.Label>Job address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address and select"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className="w-100" variant="primary" onClick={handleAddJob}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {showAddNewJobModal && (
        <AddNewJobModal
          title={newBoardTitle}
          onChange={setNewBoardTitle}
          showModal={showAddNewJobModal}
          handleCloseModal={() => setAddNewJobModal((is) => !is)}
          onAddBoard={handleAdd}
        />
      )}
      {isDragging && (
        <AddNewJobModal
          title={newBoardTitle}
          onChange={setNewBoardTitle}
          showModal={showAddNewJobModal}
          handleCloseModal={() => setAddNewJobModal((is) => !is)}
          onAddBoard={handleAdd}
        />
      )}
    </>
  );
}

function AddNewJobModal({
  showModal,
  handleCloseModal,
  title,
  onChange,
  onAddBoard,
}) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center fs-2">New Board Title</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">
        <Form.Group controlId="companyName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter address and select"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="w-100" variant="primary" onClick={onAddBoard}>
          Add Board
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DraggableColumn({ id, title, tasks, someoneIsDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    minWidth: "350px",
    backgroundColor: "#f2f4f6",
    borderRadius: "10px",
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.1)",
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3 className="column-title">{title}</h3>
      <Column
        id={id.replace("column-", "")}
        tasks={tasks}
        someoneIsDragging={someoneIsDragging}
      />
    </div>
  );
}

function Column({ id, tasks, someoneIsDragging }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="task-list">
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            content={task.content}
            someoneIsDragging={someoneIsDragging}
          />
        ))}
      </SortableContext>
    </div>
  );
}

function Task({ id, content, someoneIsDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    margin: "4px 0",
    border: "1px solid rgb(207 207 207 / 56%)",
    borderRadius: "10px",
    backgroundColor: "white",
    zIndex: isDragging ? 999 : "auto", // Set high zIndex while dragging
    overflow: "hidden",
  };

  const handleClick = (e) => {
    console.log("Clicked"); // Debugging statement
    alert("Clicked");
  };

  return (
    <Card
      className="task-card"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => {
        if (someoneIsDragging) {
          console.log("a card somewhere is being dragged still");
          return;
        }
        if (isDragging) {
          console.log("this card is being dragged still");
          return;
        }
        alert(
          "I should only appear when clicking items without dragging them, not on drag end"
        );
      }}
    >
      <Card.Body>
        <Card.Title className="task-owner">Leon Simmons</Card.Title>
        <Card.Text className="address">{content}</Card.Text>
      </Card.Body>
      <Card.Footer className="task-card-footer">
        <Badge bg="primary">New</Badge>
        <span className="last-update">
          Updated 3 min ago <span className="profile-text-box">IM</span>
        </span>
      </Card.Footer>
    </Card>
  );
}

export default KanbanBoard;
