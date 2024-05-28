import styles from "./styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoListState, inputState } from "../../recoilState";
import { FcPlus } from "react-icons/fc";

function TodoForm() {
  const [inputValue, setInputValue] = useRecoilState(inputState);
  const setTodoList = useSetRecoilState(todoListState);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  //Add todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue || /^\s*$/.test(inputValue))
      return toast.error("Please name your todo", {
        icon: "⚠️",
        position: "top-right",
      });
    setTodoList((prevTodo) => [
      ...prevTodo,
      {
        id: Math.random() * 1000,
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
    toast.success("New todo is created", { position: "top-right" });
  };

  return (
    <>
      <Toaster />
      <form onSubmit={(e) => handleSubmit(e)}>
        <FcPlus
          size={40}
          className={styles["btn-add"]}
          onClick={(e) => handleSubmit(e)}
        />
        <input
          type="text"
          placeholder="Todo name ..."
          value={inputValue}
          name="text"
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
        />
      </form>
    </>
  );
}

export default TodoForm;
