import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

async function enableMocking() {
  // vite의 경우
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  // 서버 시작 (컴포넌트 외부에서 호출)
  worker.start();
}

const rootElement = document.getElementById("root")!;

enableMocking().then(() => {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
