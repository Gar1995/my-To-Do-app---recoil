import styles from "./styles.module.css";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import { useRecoilValue } from "recoil";
import { filteredTodoListState, todosStatisticsState } from "../../recoilState";
import { useEffect, useState } from "react";

function TodoList() {
  const { totalTodos, totalCompleted, totalUncompletedNum } =
    useRecoilValue(todosStatisticsState);
  const filteredTodos = useRecoilValue(filteredTodoListState);
  const [heading, setHeading] = useState("Welcome 🙋‍♂️");

  useEffect(() => {
    if (totalCompleted === 0 && totalTodos > 0) {
      setHeading("No todos completed yet 🤷‍♂️");
    }
    if (totalCompleted === 1) {
      setHeading("Good start, keep it doing... 💪");
    } else if (totalCompleted === totalUncompletedNum && totalTodos > 1) {
      setHeading("Half todos are done, well done... 😏🆒");
    } else if (
      totalCompleted > totalUncompletedNum &&
      totalUncompletedNum != 0
    ) {
      setHeading("More than half todos are done... 😏👍");
    } else if (totalCompleted === totalTodos && totalCompleted > 0) {
      setHeading("All todos are done, excellent... 👏🎉");
    }
  }, [totalCompleted, totalTodos, totalUncompletedNum]);

  return (
    <>
      <h4>{heading}</h4>
      <div className={styles.dashboard}>
        <TodoForm />
      </div>
      {filteredTodos.map((todoItem) => (<TodoItem todoItem={todoItem} key={todoItem.id} />))}
    </>
  );
}

export default TodoList;
