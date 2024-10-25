import style from "../styles/MainPage.module.css";

export default function MainPage() {
  return (
    <div className={style.MainPage}>
      <p>홈페이지입니다.</p>
      <button onClick={() => (window.location.href = "/register")}>
        회원가입
      </button>
      <button onClick={() => (window.location.href = "/login")}>로그인</button>
    </div>
  );
}
