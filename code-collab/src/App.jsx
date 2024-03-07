import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Pages/CodeEditor/HomePage";
import CodeEditor from "./Components/Pages/CodeEditor/CodeEditor";
import Main from "./Components/Pages/CodeEditor/Main/Main";
import User from "./Components/Pages/User/User";
import Login from "./Components/Pages/Auth/Login";
import Signup from "./Components/Pages/Auth/Signup";
import { useAuth } from "./Components/context/auth";
import PageNotFound from "./Components/Layout/Routes/PageNotFound";

function App() {
  const [auth, setauth] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        {(auth?.token) ? (
          <>
            <Route path="/user" element={<User />} />
            <Route path="/user/:id" element={<CodeEditor />} />
            {/* multiple files routing */}
            <Route path="/main/*">
              <Route path=":id" element={<Main />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<PageNotFound />} />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
