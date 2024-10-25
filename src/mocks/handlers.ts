import { http } from "msw";

export type Users = {
  username: string;
  password: string;
};

// 로그인 요청 데이터 타입 정의
interface LoginRequest {
  username: string;
  password: string;
}

// 사용자의 리스트
const users: Users[] = [
  {
    username: "so356hot",
    password: "hyjhyj486!",
  },
  {
    username: "borami",
    password: "test1234",
  },
  {
    username: "sunny",
    password: "test1234",
  },
];

export const handlers = [
  // 로그인 요청을 가로채고 처리하는 핸들러
  http.post("http://localhost:8000/login", async ({ request }) => {
    const { username, password } = (await request.json()) as LoginRequest; // 요청에서 username과 password 추출

    // user.json 파일에서 일치하는 사용자 찾기
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // 유저가 존재하면 성공 응답
      return new Response(
        JSON.stringify({
          message: "로그인 성공",
          user: { username: user.username },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // 유저가 존재하지 않으면 에러 응답
      return new Response(
        JSON.stringify({
          message: "등록되지 않은 회원입니다",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }),
];
