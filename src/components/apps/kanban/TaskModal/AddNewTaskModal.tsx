"use client";
import "react-datepicker/dist/react-datepicker.css";

import { Modal, Button, TextInput, Select, Label } from "flowbite-react";
import { useEffect } from "react";
import { TaskProperties } from "@/components/apps/kanban/kanbanData";


function AddNewList({
  show,
  onHide,
  onSave,
  newTaskData,
  setNewTaskData,
  updateTasks,
}: any) {
  let { task, taskText, taskProperty, date, taskImage } = newTaskData;
  // Function to handle saving changes and updating tasks
  const handleSave = () => {
    onSave();
    updateTasks();
    onHide();
  };
  return (
    <Modal size={"lg"} show={show} onClose={onHide}>
      <Modal.Header className="pb-0">Add Task</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <TextInput
              id="task"
              value={task}
              className="form-control"
              placeholder="Task"
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, task: e.target.value })
              }
            />
          </div>
          <div className="col-span-12">
            <TextInput
              id="taskText"
              value={taskText}
              className="form-control"
              placeholder="Description"
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, taskText: e.target.value })
              }
            />
          </div>
          <div className="col-span-12">
            <TextInput
              id="taskImage"
              value={taskImage}
              className="form-control"
              placeholder="Task Image"
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, taskImage: e.target.value })
              }
            />
            {taskImage !== undefined && (
              <img
                src={taskImage}
                alt="Selected"
                style={{ width: "100%", height: "auto", marginTop: "8px" }}
              />
            )}
          </div>
          <div className="col-span-12">
            <Select
              id="askProperty-label"
              value={taskProperty}
              className="select-md"
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, taskProperty: e.target.value })
              }
            >
              <option value="">Select Task Property</option>

              {TaskProperties.map((property:any) => (
                <option key={property} value={property}>
                  {property}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-span-12">
            <TextInput
              id="dueDate"
              type="date"
              className="form-control"
              placeholder="Due Date"
              value={date}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, date: e.target.value })
              }
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color={"lighterror"} onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddNewList;
