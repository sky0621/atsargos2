import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home.tsx";
import Login from "./components/pages/Login/Login.tsx";
import NotFound from "./components/pages/NotFound.tsx";

function App() {
  return (
    <RecoilRoot>
      <div>aa</div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
