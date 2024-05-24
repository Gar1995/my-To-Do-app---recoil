/* eslint-disable react/prop-types */
import styles from "./styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { todoListState } from "../../recoilState";
import { FaSquare, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoCheckbox } from "react-icons/io5";

const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

function TodoItem({ todoItem }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [inputValue, setInputValue] = useState(todoItem ? todoItem.text : "");
  const [isEditing, setIsEditing] = useState(false);

  const index = todoList.findIndex((listItem) => listItem === todoItem);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const removeItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
    toast.success("Todo deleted", {
      style: {
        color: "red",
      },
      position: "top-right",
    });
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...todoItem,
      isComplete: !todoItem.isComplete,
    });
    setTodoList(newList);
    todoItem.isComplete
      ? toast.success("Todo unchecked", { icon: "🔘", position: "top-right" })
      : toast.success("Todo completed", { icon: "👏", position: "top-right" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = replaceItemAtIndex(todoList, index, {
      ...todoItem,
      text: inputRef.current.value,
    });
    setTodoList(newList);
    setIsEditing(!isEditing);
    toast.success("Todo updated", {
      position: "top-right",
    });
  };

  return (
    <>
      <Toaster containerStyle={{ fontSize: "22px", fontWeight: "500" }} />
      <div
        className={
          todoItem.isComplete
            ? styles["task-row-completed"]
            : styles["task-row-uncompleted"]
        }
      >
        {!todoItem.isComplete ? (
          <FaSquare
            className={styles.checkbox}
            size={28}
            onClick={toggleItemCompletion}
          />
        ) : (
          <IoCheckbox
            size={28}
            onClick={toggleItemCompletion}
            className={styles.checkbox}
          />
        )}
        {!isEditing && (
          <span
            className={!todoItem.isComplete ? styles.unchecked : styles.checked}
            onClick={() => setIsEditing(!isEditing)}
          >
            {todoItem.text}
          </span>
        )}
        {isEditing && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={styles["form-edit"]}
          >
            <input
              type="text"
              value={inputValue}
              ref={inputRef}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        )}
        <FaTrash
          onClick={removeItem}
          size={24}
          className={styles["icon-delete"]}
        />
      </div>
    </>
  );
}

export default TodoItem;
