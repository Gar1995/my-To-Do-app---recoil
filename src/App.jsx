import "./App.css";
import Statistics from "./components/Statistics/Statistics";
import TodoList from "./components/TodoList/TodoList";
import { FcTimeline } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { dashboardState } from "./recoilState";

const App = () => {
  const [showDashboard, setShowDashboard] = useRecoilState(dashboardState);

  return (
    <div className="todo-wrapper">
      {showDashboard && <Statistics />}
      <div className="todo-app">
        <div className="showDashboard-btn-container">
          <FcTimeline
            size={36}
            onClick={() => setShowDashboard(!showDashboard)}
            className="showDashboard-btn"
          />
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
