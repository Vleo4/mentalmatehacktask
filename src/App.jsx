import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login, Main, Profile, Register} from "./pages/index.js";
const Layout= () => {
    return (
        <>
            <div className="main-content">
                <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/profile" exact element={<Profile />} />
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
  )
}

export default App
