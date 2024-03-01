import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const updateTask = (id) => {
    axios
      .put(
        `http://localhost:8000/api/task/update/${id}`,
        { completed: true },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8000/api/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTask = () => {
    if (text === "") {
      alert("Empty task");
      return;
    }
    axios
      .post(
        "http://localhost:8000/api/task/create",
        { text },
        { withCredentials: true }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/task/display", { withCredentials: true })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTasks]);
  return (
    <>
      <div className="MainContainer">
        <input
          type="text"
          onChange={(event) => setText(event.target.value)}
          placeholder="Add Task"
        />
        <button className="LogoutButton" onClick={addTask}>
          Add
        </button>
        <ol>
          {tasks.map((task) => {
            return (
              <li key={task._id}>
                <p>{task.text}</p>
                {task.completed && (
                  <span className="complete">Task Completed</span>
                )}
                {!task.completed && (
                  <button
                    onClick={() => updateTask(task._id)}
                    className="LogoutButton"
                  >
                    Mark Completed
                  </button>
                )}
                <button
                  className="LogoutButton"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Main;
