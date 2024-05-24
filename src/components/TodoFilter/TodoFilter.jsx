import styles from "./styles.module.css";
import { useRecoilState } from "recoil";
import { todoListFilterState } from "../../recoilState";
import { FcFilledFilter } from "react-icons/fc";

const TodoFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  return (
    <div className={styles.container}>
      <FcFilledFilter />
      Filter:
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="Show All">📃 All todos</option>
        <option value="Completed">✔️ Completed todos</option>
        <option value="Uncompleted">⌛ Uncompleted todos</option>
      </select>
    </div>
  );
};

export default TodoFilter;
