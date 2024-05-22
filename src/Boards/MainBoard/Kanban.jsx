import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./kanban.css";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Take out the garbage" },
    "task-3": { id: "task-3", content: "Take out the garbage" },
    "task-4": { id: "task-4", content: "Take out the garbage" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      tasksId: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-1",
      title: "watch movie",
      tasksId: ["task-1", "task-2", "task-3"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

function Column({ column }) {
  return (
    <div className="columContainer">
      <h3 className="column-title">{column.title}</h3>
      <ul className="task-list">{column.tas}</ul>
    </div>
  );
}

export default function Kanban() {
  const [data, setData] = useState(initialData);

  const column = data.columnOrder.map((columnId, i, arr) => {
    return data.columns[columnId];
  });
  console.log("column", column);

  //   const tasks = column.tasksId

  return (
    <div>
      {column.map((column) => (
        <Column column={column} />
      ))}
    </div>
  );
}
