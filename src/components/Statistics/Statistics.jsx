import styles from "./styles.module.css";
import TodoFilter from "../TodoFilter/TodoFilter";
import { FcServices, FcTodoList } from "react-icons/fc";
import { todosStatisticsState } from "../../recoilState";
import { useRecoilValue } from "recoil";
import { FaClipboardCheck } from "react-icons/fa";

const Statistics = () => {
  const { totalTodos, totalCompleted, totalUncompletedNum } =
    useRecoilValue(todosStatisticsState);

  return (
    <div className={styles.statistics}>
      <TodoFilter />
      <div className={styles.container}>
        <div className={styles.card}>
          <FcTodoList size={42} />
          Total <span>{totalTodos}</span>
        </div>
        <div className={styles.card}>
          <FaClipboardCheck size={42} fill="#4CAF50" />
          Completed <span>{totalCompleted}</span>
        </div>
        <div className={styles.card}>
          <FcServices size={42} />
          Uncompleted <span>{totalUncompletedNum}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
