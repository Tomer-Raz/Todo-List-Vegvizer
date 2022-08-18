import React from "react";
import TasksPage from "./pages/tasks/TasksPage.component";

const App = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#0070c9", color: "white", display: "flex", justifyContent: "center" }}>
        <h1 >Vegvizer home assignment - Updated version of the Todo List</h1>
      </div>
      <TasksPage />
    </div>
  );
}

export default App;
