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
import { useEffect, useState } from "react";
import { NewJobModal, JobDetailModal, AddBoardModal } from "@components/Modals";
import { boardDataLoaded, updateColumn } from "@store/slices/JobsSlice";

import "./kanban.css";
import { Button } from "@components/UI";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobs, updateJobStatus } from "@services/apiJobs";
import { Spin } from "antd";
import { useAuth } from "@context/AuthContext";
import toast from "react-hot-toast";

function KanbanBoard() {
  const { logout } = useAuth();
  const data = useSelector((store) => store.jobs.boardData);
  const [invalidatePage, setInvalidatePage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [showAddNewJobModal, setAddNewJobModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [addNewBoard, setAddNewBoard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBoardData() {
      try {
        setIsLoading(true);
        const resp = await getJobs();
        if (resp.status >= 200 && resp.status < 300) {
          dispatch(boardDataLoaded(resp.data.data));
        }
        if (resp.response?.status === 500) toast.error("Something went wrong.");
        if (resp.response?.status === 401) {
          logout();
          navigate("/");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBoardData();
  }, [invalidatePage]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    const sourceColumn = data.find((job) =>
      job.tasks.some((task) => task.id === activeId)
    );
    const destinationColumn = data.find((job) => `column-${job.id}` === overId);

    if (
      sourceColumn &&
      destinationColumn &&
      sourceColumn.id !== destinationColumn.id
    ) {
      const draggedTask = sourceColumn.tasks.find(
        (task) => task.id === activeId
      );

      const updatedSourceColumn = {
        ...sourceColumn,
        tasks: sourceColumn.tasks.filter((task) => task.id !== activeId),
      };

      const updatedDestinationColumn = {
        ...destinationColumn,
        tasks: [...destinationColumn.tasks, draggedTask],
      };

      dispatch(updateColumn({ updatedSourceColumn, updatedDestinationColumn }));
      try {
        const resp = await updateJobStatus(
          draggedTask,
          updatedDestinationColumn
        );
      } catch (error) {}
    }
    // }
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

  if (isLoading) return <Spin fullscreen={true} />;

  return (
    <div className="p-4 grid grid-rows-[auto_1fr] gap-y-6 h-full pb-0">
      <Button
        onClick={handleAddJob}
        className="justify-self-end"
        variant="gradient"
      >
        <FaPlus className="text-white mr-1" />
        New Job
      </Button>
      <div className="max-w-full overflow-y-auto">
        <div className="kanban-container">
          <DndContext
            autoScroll={true}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={data?.map((col) => col.id)}
              strategy={rectSortingStrategy}
            >
              <div style={{ display: "flex", gap: "16px" }}>
                {data.map((column, index) => (
                  <DraggableColumn
                    key={column.id}
                    id={`column-${column.id}`}
                    title={column.name}
                    tasks={column.tasks}
                    someoneIsDragging={isDragging}
                  />
                ))}
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
              onAddJob={() => setInvalidatePage((is) => !is)}
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
      </div>
    </div>
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
                data={task}
                id={task.id}
                someoneIsDragging={someoneIsDragging}
              />
            ))}
          </SortableContext>
        </div>
      ) : null}
    </>
  );
}

function Task({ id, data, someoneIsDragging }) {
  const navigate = useNavigate();
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
    navigate(`/job-details/${id}?jobStatus=${data.status.name}`);
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
            return;
          }
          if (isDragging) {
            return;
          }
          handleTaskClick();
        }}
      >
        <div className="p-3">
          <h1 className="text-base font-semibold text-gray-600 mb-2 hover:text-blue-700">
            {data.name}
          </h1>
          <Button>Delete</Button>
          <p className="text-sm">{data.address}</p>
        </div>
        <div className="border-b border-gray-200" />
        <div className="flex justify-between items-center px-3 py-2 bg-slate-50">
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
