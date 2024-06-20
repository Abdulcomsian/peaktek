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
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { NewJobModal, JobDetailModal, AddBoardModal } from "@components/Modals";

import "./kanban.css";
import Button from "@components/Button";

const initialColumns = [
  { id: "newLead", title: "New Lead" },
  { id: "signedDeal", title: "Signed Deal" },
  { id: "adjuster", title: "Adjustor" },
  { id: "jobCompleted", title: "Completed" },
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
  jobCompleted: [
    { id: "task-6", content: "Task 4" },
    { id: "task-7", content: "Task 5" },
  ],
};

const boardData = [
  {
    id: "column-1",
    title: "New Lead",
    order: 0,
    type: 1,
    tasks: [
      {
        id: 1,
        content: {
          jobTitle: "Leon Simmons",
          address: "F-17 Islamabad",
          createdAt: "",
        },
      },
      {
        id: 2,
        content: { jobTitle: "Steve", address: "", createdAt: "" },
      },
    ],
  },
  {
    id: "column-2",
    title: "Signed Deal",
    type: 2,
    order: 1,
    tasks: [
      {
        id: 3,
        content: { jobTitle: "Leon Simmons", address: "", createdAt: "" },
      },
      {
        id: 4,
        content: { jobTitle: "Steve", address: "", createdAt: "" },
      },
      {
        id: 5,
        content: { jobTitle: "Marker", address: "", createdAt: "" },
      },
    ],
  },
  {
    id: "column-3",
    title: "Adjustor",
    type: 3,
    order: 2,
    tasks: [
      {
        id: 6,
        content: { jobTitle: "Leon Simmons", address: "", createdAt: "" },
      },
      {
        id: 7,
        content: { jobTitle: "Steve", address: "", createdAt: "" },
      },
      {
        id: 8,
        content: { jobTitle: "Marker", address: "", createdAt: "" },
      },
    ],
  },
  {
    id: "column-4",
    title: "Completed",
    type: 4,
    order: 3,
    tasks: [
      {
        id: 9,
        content: { jobTitle: "Leon Simmons", address: "", createdAt: "" },
      },
      {
        id: 10,
        content: { jobTitle: "Steve", address: "", createdAt: "" },
      },
      {
        id: 11,
        content: { jobTitle: "Marker", address: "", createdAt: "" },
      },
    ],
  },
];

function KanbanBoard() {
  // const [tasks, setTasks] = useState(initialTasks);
  // const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(boardData);
  const [showAddNewJobModal, setAddNewJobModal] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [addNewBoard, setAddNewBoard] = useState(false);
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
    console.log("IDS", activeId, overId);

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
      // const sourceColumn = data.find((column) =>
      //   // tasks[column.id].some((task) => task.id === activeId)
      //   // column.tasks
      // );
      const sourceColumn = data.tasks.filter((task) => task.id === activeId);
      const destinationColumn = columns.find(
        (column) => column.id === overId.slice(overId.indexOf("-") + 1)
      );
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
  const handleAddNewJob = (newJob) => {
    setTasks((tasks) => ({
      ...tasks,
      newLead: [newJob, ...tasks.newLead],
    }));
  };
  const handleAddNewBoard = function () {
    setAddNewBoard((is) => !is);
  };
  const handleAdd = function (newTitle) {
    const id = crypto.randomUUID();
    setColumns((columns) => [
      ...columns,
      { id: `column-${id}`, title: newTitle },
    ]);
    setTasks((tasks) => ({
      ...tasks,
      [`column-${id}`]: [],
    }));
  };

  return (
    <>
      <button
        onClick={handleAddJob}
        className="flex items-center justify-center gap-1 mb-3  bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-3 py-2 mr-3 group"
      >
        <FaPlus className="text-white mr-1" />
        New job
      </button>
      <div className="kanban-container">
        <DndContext
          autoScroll={true}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={data.map((col) => col.id)}
            strategy={rectSortingStrategy}
          >
            <div style={{ display: "flex", gap: "16px" }}>
              {data.map((column, index) => {
                return (
                  <DraggableColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={column.tasks}
                    someoneIsDragging={isDragging}
                  />
                );
              })}
              {/* <Button className="btn-add" onClick={handleAddNewBoard}>
                &#x2B;
              </Button> */}
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
      <h3 className="border-b border-gray-300 px-3 py-3 ">{title}</h3>
      <Column id={id} tasks={tasks} someoneIsDragging={someoneIsDragging} />
    </div>
  );
}

function Column({ id, tasks, someoneIsDragging }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <>
      {tasks.length > 0 ? (
        <div ref={setNodeRef} className="flex flex-col gap-2 p-3">
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
    // setSelectedTask(task);
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
          handleTaskClick();
        }}
      >
        <div className="p-3">
          <h1 className="text-base font-semibold text-gray-600 mb-2 hover:text-blue-700">
            {content.jobTitle}
          </h1>
          <Button>Delete</Button>
          <p className=" text-sm">{content.address}</p>
        </div>
        <div className="border-b border-gray-200" />
        <div className="flex justify-between items-center px-3 py-2 bg-slate-50">
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
