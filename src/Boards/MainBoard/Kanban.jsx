import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { FaPlus } from "react-icons/fa6";
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
import { useDispatch, useSelector } from "react-redux";

import { Button, Form } from "react-bootstrap";
import TabComponent from "../TabComponent";
import "./kanban.css";

import NewJobModal from "../../components/Modals/NewJobModal";
import { Modal } from "antd";
import { getTasks, updateTasks } from "../../store/slices/JobsSlice";
import JobDetailModal from "../../components/Modals/JobDetailModal";
import AddBoardModal from "../../components/Modals/AddBoardModal";

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
  // const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  // const tasks = useSelector(getTasks);

  const [isDragging, setIsDragging] = useState(false);
  const [addNewBoard, setAddNewBoard] = useState(false);

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const { id: activeId } = active;
    const { id: overId } = over;
    console.log("IDs", activeId, overId.slice(overId.indexOf("-") + 1));

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

      const destinationColumn = columns.find(
        (column) => column.id === overId.slice(overId.indexOf("-") + 1)
      );

      // console.log(
      //   "Source and Destination COlumn",
      //   sourceColumn.id,
      //   destinationColumn
      // );
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

  const handleAddJob = () => {
    setAddNewJobModal((is) => !is);
  };
  const handleAddBoard = () => {
    setModalContent(<NewJobModal />);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleShowJobDetailModal() {
    console.log("DONE");
    // setShowJobDetailModal((is) => !is);
  }

  const handleAddNewJob = (newJob) => {
    // dispatch(addJob({ id: 12, content: "componay name" }));
    setTasks((tasks) => ({
      ...tasks,
      newLead: [newJob, ...tasks.newLead],
    }));
  };

  const handleAddNewBoard = function () {
    setAddNewBoard((is) => !is);
  };

  const handleAdd = function (newTitle) {
    // console.log("title", newTitle);
    const id = crypto.randomUUID();
    setColumns((columns) => [
      ...columns,
      { id: `column-${id}`, title: newTitle },
    ]);
    setTasks((tasks) => ({
      ...tasks,
      [`column-${id}`]: [], // Add an empty array for tasks associated with the new column
    }));
    // setAddNewJobModal(false);
  };

  console.log("data", columns, tasks);

  return (
    <>
      <div className="kanban-container">
        <button
          variant="primary"
          className="btn-add-board px-3 py-2 flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-full text-white "
          onClick={handleAddJob}
        >
          <FaPlus className="text-white mr-1" />
          New job
        </button>
        <DndContext
          autoScroll={false}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
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
        {showAddNewJobModal && (
          <NewJobModal
            open={showAddNewJobModal}
            onOk={() => setAddNewJobModal(false)}
            onCancel={() => setAddNewJobModal(false)}
            onAddJob={handleAddNewJob}
          />
        )}
        {addNewBoard && (
          <AddBoardModal
            open={addNewBoard}
            onOk={() => setAddNewBoard(false)}
            onCancel={() => setAddNewBoard(false)}
            onAddTitle={handleAdd}
          />
        )}
      </div>
    </>
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
    <>
      {tasks.length > 0 ? (
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
      ) : null}
    </>
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
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleTaskClick = function (task) {
    setSelectedTask(task);
    setShowJobDetailModal(true);
  };
  return (
    <>
      <div
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
          handleTaskClick(content);
        }}
      >
        <div className="p-4">
          <h1 className="text-lg font-semibold text-gray-600 hover:text-blue-700">
            Leon Simmons
          </h1>
          <p className=" text-sm">{content}</p>
        </div>
        <div className="border-b border-gray-200" />
        <div className="flex justify-between items-center px-4 py-2 bg-slate-50">
          <div className="bg-blue-100 text-sm text-blue-600 px-2 py-1 font-medium  rounded">
            New
          </div>
          <p className="text-xs text-gray-400">
            Updated 3 min ago{" "}
            <span className="p-1 rounded bg-gray-200">TD</span>
          </p>
        </div>
      </div>
      {showJobDetailModal && (
        <JobDetailModal
          open={showJobDetailModal}
          onOk={() => setShowJobDetailModal(false)}
          onCancel={() => setShowJobDetailModal(false)}
          selectedTask={selectedTask}
        />
      )}
    </>
  );
}

export default KanbanBoard;
