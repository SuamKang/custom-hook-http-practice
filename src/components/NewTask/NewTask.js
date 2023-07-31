import useFetch from "../../hooks/useFetch";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: postRequest } = useFetch();

  // 새로운 할 일 받아 직접 변환하는 상태 업데이트 함수 (useFetch에서 applyData로 받게됨)
  const createTask = (taskText, taskData) => {
    // Firebase에서 설정된 'name' 키값은 일반적인 고유의 id를 특정하고 있음. 따라서 id로 사용가능
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  // 버튼 이벤트
  const enterTaskHandler = async (taskText) => {
    postRequest(
      {
        url: "https://react-custom-hook-practi-8dec7-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText) // bind메소드를 활용하여 함수 구성을 사전에 설정
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
