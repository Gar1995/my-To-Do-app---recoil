import { DefaultValue, atom, selector } from "recoil";
const dashboardState = atom({
  key: "dashboardState",
  default: false,
});

const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

const editMode = atom({
  key: "editModeState",
  default: false,
});

const itemIsCheckedState = atom({
  key: "itemIsCheckedState",
  default: false,
});

const todoRenameState = atom({
  key: "todoEditState",
  default: { id: null, value: "" },
});

const inputState = atom({
  key: "inputState",
  default: "",
});

//---------------------------------------------
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const todoListState = atom({
  key: "todoListState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("tasks")],
});

const todosStatisticsState = selector({
  key: "todosStatistics",
  get: ({ get }) => {
    const todos = get(todoListState);
    const totalTodos = todos.length;
    const totalCompleted = todos.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalTodos - totalCompleted;
    const percentCompleted =
      totalTodos === 0 ? 0 : (totalCompleted / totalTodos) * 100;

    return {
      totalTodos,
      totalCompleted,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Completed":
        return list.filter((item) => item.isComplete);
      case "Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export {
  dashboardState,
  todoListState,
  todoRenameState,
  inputState,
  itemIsCheckedState,
  todoListFilterState,
  todosStatisticsState,
  filteredTodoListState,
  editMode,
};
