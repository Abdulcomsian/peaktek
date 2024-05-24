import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable, DragOverlay } from "@dnd-kit/core";
import "./kanban.css";
import Button from "../../components/Button";
import Card from "react-bootstrap/Card";

import { DndContext } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

const initialData = {
  columnOrder: [1, 3, 4, 6, 5, 7],
  tasks: [
    { id: 1, title: "New lead", jobs: ["job-1", "job-2", "job-3", "job-4"] },
    {
      id: 7,
      title: "Appointment Scheduled",
      jobs: ["job-3", "job-2", "job-1"],
    },
    {
      id: 3,
      title: "Proposal sent/presented",
      jobs: ["job-1", "job-2", "job-3", "job-4"],
    },
    { id: 4, title: "Proposal signed", jobs: ["job-3", "job-2", "job-1"] },
    {
      id: 5,
      title: "Pre-production",
      jobs: ["job-1", "job-2", "job-3", "job-4"],
    },
    { id: 6, title: "Production", jobs: ["job-3", "job-2", "job-1"] },
  ],
};

function Draggable(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </li>
  );
}

export default function Kanban() {
  //   const [data, setData] = useState(initialData);

  //   const handleDragEnd = ({ active, over }) => {
  //     if (!over) return;

  //     const oldIndex = data.columnOrder.indexOf(active.id);
  //     const newIndex = data.columnOrder.indexOf(over.id);

  //     setData((prevData) => ({
  //       ...prevData,
  //       columnOrder: arrayMove(prevData.columnOrder, oldIndex, newIndex),
  //     }));
  //   };

  //   const tasks = data.tasks;

  //   const handleAddBoard = function (id) {};

  //   return (
  //     <div className="kanban-container">
  //       <Button className="btn-add-board">Add Board</Button>
  //       <SortableContext
  //         items={data.columnOrder}
  //         strategy={rectSortingStrategy}
  //         onDragEnd={handleDragEnd}
  //       >
  //         <ul className="board-list">
  //           {data.columnOrder.map((orderId) => (
  //             <SortableColumn
  //               task={tasks.find(function (task) {
  //                 return task.id === orderId;
  //               })}
  //               key={orderId}
  //             />
  //           ))}
  //         </ul>
  //       </SortableContext>
  //       <DragOverlay>
  //         {({ active }) => {
  //           if (!active) return null;
  //           return (
  //             <Column
  //               task={tasks.find((task) => task.id === active.id)}
  //               isDragging
  //             />
  //           );
  //         }}
  //       </DragOverlay>
  //     </div>
  //   );
  const [items] = useState(["1", "2", "3", "4", "5"]);
  const [activeId, setActiveId] = useState(null);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ overflow: "auto", height: "400px" }}>
        {items.map((id) => (
          <Draggable key={id} id={id}>
            <Item value={`Item ${id}`} />
          </Draggable>
        ))}
      </div>

      <DragOverlay>{activeId ? <p>123</p> : null}</DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }
}

function Item({ value }) {
  return <p>{value}</p>;
}

function Job({ job }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

function SortableColumn({ task }) {
  const { attributes, listeners, setNodeRef, isDragging, over, overIndex } =
    useSortable({ id: task.id });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      className={`board-item ${isDragging ? "is-dragging" : ""} ${
        over ? "over" : ""
      }`}
    >
      <div className="column-container" {...listeners}>
        <header className="column-header">
          <div className="board__title">
            {task.title} <span>(0)</span>
          </div>
          <div className="pricing">$0.00</div>
        </header>
        <div className="jobs-container">
          {task.jobs.map((job) => (
            <Job job={job} key={job} />
          ))}
        </div>
      </div>
    </li>
  );
}
