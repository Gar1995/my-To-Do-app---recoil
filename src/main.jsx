import React from "react";
import ReactDOM from "react-dom/client";
import LazyTodoList from "./components/LazyLoad/LazyTodoList";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { PropagateLoader } from "react-spinners";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense
        fallback={
          <div
            className="loading"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <h1 style={{letterSpacing:'6px', fontSize:'20px'}}>Loading ...</h1>
            <PropagateLoader color="#12a0c0de" />
          </div>
        }
      >
        <LazyTodoList />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
