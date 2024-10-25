import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // vite는 es모듈 기반으로 작동하기 때문에 msw 패키지의 es 모듈을 사용할 수 있어야 함
//   // 따라서 이 파일에 vite가 es 모듈을 제대로 인식할 수 있도록 설정함
//   resolve: {
//     alias: {
//       // vite가 msw 모듈을 올바르게 처리하도록 설정
//       msw: "msw/src/main.tsx",
//     },
//   },
// });
