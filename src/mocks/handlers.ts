import { http, HttpResponse } from "msw";

export type Users = {
  username: string;
  password: string;
};

// 로그인 요청 데이터 타입 정의
interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
}

// 사용자의 리스트 (let으로 변경하여 새 사용자 추가 가능하도록 함)
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
  // 회원가입 요청을 처리하는 핸들러
  http.post("http://localhost:8000/register", async ({ request }) => {
    const { username, password } = (await request.json()) as RegisterRequest;

    // 입력값 검증
    if (!username || !password) {
      return HttpResponse.json(
        {
          message: "아이디와 비밀번호를 모두 입력해주세요.",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 사용자 이름 중복 체크
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return HttpResponse.json(
        {
          message: "이미 존재하는 아이디입니다.",
        },
        {
          status: 409,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 새 사용자 추가
    const newUser = { username, password };
    users.push(newUser);

    return HttpResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: { username: newUser.username },
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),

  // 로그인 요청을 처리하는 핸들러
  http.post("http://localhost:8000/login", async ({ request }) => {
    const { username, password } = (await request.json()) as LoginRequest;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      return HttpResponse.json(
        {
          message: "로그인 성공",
          user: { username: user.username },
        },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return HttpResponse.json(
        {
          message: "등록되지 않은 회원입니다",
        },
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
