import { useState, FormEvent } from "react";
import style from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
  message: string;
  user?: {
    username: string;
  };
}

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 에러 메시지 초기화

    try {
      // 클라이언트 측 유효성 검사
      if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
        setError("아이디는 4자 이상이어야 하며 영어로 시작해야 합니다.");
        return;
      }

      if (password.length < 4) {
        setError("비밀번호는 4자 이상이어야 합니다.");
        return;
      }

      if (password !== passwordCheck) {
        setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      // 회원가입 요청
      const response = await fetch(`http://localhost:8000/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: RegisterResponse = await response.json();

      // 상태 코드에 따른 처리
      switch (response.status) {
        case 201: // 회원가입 성공
          alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
          break;
        case 409: // 중복된 사용자
          setError(data.message || "이미 존재하는 아이디입니다@");
          break;
        case 400: // 잘못된 입력
          setError(data.message || "입력값을 확인해주세요@");
          break;
        default:
          setError("회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className={style.RegisterPage} onSubmit={register}>
      <h2>회원가입페이지</h2>
      <input
        type="text"
        placeholder="사용자이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={style.input}
      />
      <input
        type="password"
        placeholder="패스워드"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={style.input}
      />
      <input
        type="password"
        placeholder="패스워드 확인"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        className={style.input}
      />
      {error && <div className={style.error}>{error}</div>}
      <button type="submit" className={style.button}>
        가입하기
      </button>
    </form>
  );
}
