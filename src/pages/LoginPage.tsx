import { useState, FormEvent } from "react";
import style from "../styles/LoginPage.module.css";
import { Navigate } from "react-router-dom";

// 응답 데이터 타입 정의
interface LoginResponse {
  message: string;
  user?: {
    username: string;
  };
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 에러 메시지 초기화

    if (!username || !password) {
      setError("아이디와 패스워드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: LoginResponse = await response.json();

      if (response.status === 200) {
        // 로그인 성공
        console.log("로그인 성공:", data.user?.username);
        setRedirect(true);
      } else if (response.status === 401) {
        // 인증 실패
        setError(data.message || "등록되지 않은 회원입니다@");
      } else {
        // 기타 에러
        setError("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className={style.LoginPage} onSubmit={login}>
      <h2>로그인 페이지</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="패스워드"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className={style.error}>{error}</div>}
      <button type="submit">로그인</button>
    </form>
  );
}
