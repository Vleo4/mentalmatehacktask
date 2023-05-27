import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Approved,
  CreateProblem,
  Login,
  Main,
  MyProblemID,
  MyProblems,
  Problems,
  Profile,
  PsychoProfile,
  Register,
} from "./pages/index.js";
import { Alert, Navbar } from "./components";
import ProblemID from "./pages/Psycho/ProblemID/ProblemID.jsx";
import { isPsycho } from "./api/apiPublic.js";
const Layout = () => {
  const location = useLocation();
  const isDisplay =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
    <Alert/>
      {!isDisplay && <Navbar />}
      <div className="main-content">
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={<Main />} />

          {/* PSYCHO */}
          <Route path="/profile" exact element={<Profile />} />

          {/* PATIENT */}
          <Route path="/psycho-profile/:id" exact element={<PsychoProfile />} />
          <Route path="/problem/create" exact element={<CreateProblem />} />

          {/* UNIVERSAL */}
          <Route
            path="/problem/:id"
            exact
            element={isPsycho() ? <ProblemID /> : <MyProblemID />}
          />
          <Route
            path="/problems"
            exact
            element={isPsycho() ? <Problems /> : <MyProblems />}
          />
          <Route path="/approved-problems" exact element={<Approved />} />
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
