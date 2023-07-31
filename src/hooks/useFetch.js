import { useState, useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // requestConfig는 객체형태로 상황에 맞는 요청을 보낼때 조건에 따라 적용하여 전달할것이다.
  // useCallback을 적용해서 리랜더링 시 중복해서 함수 재생성 방지(메모리 추가 차지 방지)
  // useFetch로부터 받았던 requestConfig, applyData를 사용되는 컴포넌트에서 직접 계산하기 쉽고 불필요한 의존성 해결을 위해 사용하는 함수 내부 매개변수로 전달해준다. -> 이렇게 되면 사용하는 컴포넌트에서 커스텀훅 인자로 전달하지 않아도 되며, useCallback에서 사용될 의존성을 줄일 수 있다.
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data); // 매개변수로 전달받은 applyData에 응답받은 데이터 data전달
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  // custom hook에서 최종적으로 반환해 줄것들(객체 속성값 단순화 적용)
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
