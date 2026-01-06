"use client";
import { useContext, useEffect, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { Icon } from "@iconify/react";
import EditTaskModal from "./TaskModal/EditTaskModal";
import { KanbanDataContext } from "@/app/context/kanbancontext/index";
import { Draggable } from "@hello-pangea/dnd";
import { Badge, Dropdown } from "flowbite-react";
import { patchFetcher, putFetcher } from "@/app/api/globalFetcher";
import { mutate } from "swr";
interface TaskDataProps {
  task: { id: any };
  onDeleteTask: () => void;
  index: number;
  category:any;
}
const TaskData: React.FC<TaskDataProps> = ({
  task,
  onDeleteTask,
  index,
  category
}: any) => {
  const { setError,todoCategories, setTodoCategories } = useContext(KanbanDataContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleMenuClick = (event: any) => setAnchorEl(!anchorEl);

  const handleDeleteClick = () => onDeleteTask(task.id);



  const handleSaveEditedTask = async (editedTaskData: { id: any }) => {
    try {
      const response = await mutate('/api/kanban',patchFetcher("/api/kanban/edit-task", {
        taskId: editedTaskData.id,
        newData: editedTaskData,
      }),false);
      if (response.status === 200) {
        setEditedTask(editedTaskData);
        let remainingTodos = todoCategories.map((item) => {
          if(item.name === category.name){
            let updatedChild = item.child.map((task) => {
              if(task.id === editedTaskData.id){
                return {...task , editedTaskData}
              }return task
            });
            return {id:item.id , name: item.name , child: updatedChild}
          }else{
             return item
          }
        });
        setTodoCategories(remainingTodos);
      } else {
        throw new Error("Failed to edit task");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {

  },[editedTask])

  const formatDate = (selectedDate: string | number | Date) => {
    const dateObj = new Date(selectedDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  const backgroundColor =
    editedTask?.taskProperty === "Design"
      ? "success"
      : editedTask?.taskProperty === "Development"
        ? "warning"
        : editedTask?.taskProperty === "Mobile"
          ? "primary"
          : editedTask?.taskProperty === "UX Stage"
            ? "warning"
            : editedTask?.taskProperty === "Research"
              ? "secondary"
              : editedTask?.taskProperty === "Data Science"
                ? "error"
                : editedTask?.taskProperty === "Branding"
                  ? "primary"
                  : "#fff";

  return (
    <Draggable draggableId={String(task?.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white dark:bg-dark rounded-md dark:shadow-dark-md shadow-md"
        >
          <div className="flex gap-2 justify-between items-center p-3">
            <h5 className="text-sm line-clamp-2">{editedTask?.task}</h5>

            <div>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="btn-circle-hover cursor-pointer p-0 rounded-full h-6 w-6 ">
                    <TbDotsVertical size={14} />
                  </span>
                )}
              >
                <Dropdown.Item
                  onClick={handleShowEditModal}
                  className="flex gap-2 items-center"
                >
                  <Icon icon="solar:pen-new-square-broken" height={15} />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleDeleteClick}
                  className="flex gap-2 items-center"
                >
                  <Icon
                    icon="solar:trash-bin-minimalistic-outline"
                    height={15}
                  />
                  Delete
                </Dropdown.Item>
              </Dropdown>
              <EditTaskModal
                show={showEditModal}
                onHide={handleCloseEditModal}
                task={task}
                editedTask={editedTask}
                onSave={handleSaveEditedTask}
              />
            </div>
          </div>
          <div>
            {editedTask?.taskImage && (
              <img
                src={editedTask?.taskImage}
                alt="Task Image"
                className="w-full"
              />
            )}
          </div>
          {editedTask?.taskText && (
            <p className="text-darklink dark:text-bodytext text-sm px-3 line-clamp-3">
              {editedTask?.taskText}
            </p>
          )}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2 ">
              <Icon icon="solar:calendar-linear" height={15} />
              <span className="text-xs text-darklink dark:text-bodytext leading-[normal]">
                {formatDate(editedTask?.date)}
              </span>
            </div>
            <div>
              <Badge size={"xs"} className="rounded-md" color={`${backgroundColor}`}>
                {editedTask?.taskProperty}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default TaskData;
