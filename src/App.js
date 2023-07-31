import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useFetch from "./hooks/useFetch";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: getRequest } = useFetch();

  // 응답 받은 데이터 형식(객체 -> 배열) 변환 함수(useFetch에서 applyData로 받게됨)
  const transformTasks = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  useEffect(() => {
    // useEffect안에서 사이드 이펙트로 http함수 설정
    getRequest(
      {
        url: "https://react-custom-hook-practi-8dec7-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTasks
    );
  }, [getRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={getRequest}
      />
    </React.Fragment>
  );
}

export default App;
