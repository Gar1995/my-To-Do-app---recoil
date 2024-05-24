import { lazy } from "react";

const LazyTodoList = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
    import("../../App.jsx")
  )
);

export default LazyTodoList;
