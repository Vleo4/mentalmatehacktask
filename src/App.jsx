import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Login, Main, Problems, Profile, Register } from "./pages/index.js";
import { Navbar } from "./components";
import { isAuth } from "./api/AuthContext";
import ProblemID from "./pages/Psycho/ProblemID/ProblemID.jsx";
import {isPsycho} from "./api/api.js";
import MyProblemID from "./pages/Public/MyProblemID/MyProblemID.jsx";
import CreateProblem from "./pages/Public/CreateProblem/CreateProblem.jsx";
const Layout = () => {
  const location = useLocation();
  const isDisplay =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const isAuthorize = isAuth();
  return (
    <>
      {!isDisplay && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/problems" exact element={<Problems />} />
          <Route path="/problem/:id" exact element={isPsycho()?<ProblemID />:<MyProblemID/>} />
          <Route path="/problem/create" exact element={<CreateProblem/>} />
          <Route path="/" exact element={<Main />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;
