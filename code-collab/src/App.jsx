import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Components/Pages/CodeEditor/HomePage";
import CodeEditor from "./Components/Pages/CodeEditor/CodeEditor";
import Main from "./Components/Pages/CodeEditor/Main/Main";
import User from "./Components/Pages/User/User";
import Login from "./Components/Pages/Auth/Login";
import Signup from "./Components/Pages/Auth/Signup";
import { useAuth } from "./Components/context/auth";
import PageNotFound from "./Components/Layout/Routes/PageNotFound";
import Private from "./Components/Layout/Routes/Private";
import { useEffect } from "react";

function App() {
  const [auth, setauth] = useAuth();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      localStorage.removeItem("auth");
      setauth({
        ...auth,
        user: null,
        token: "",
      });
    }
  }, []);
  return (
    <>

<Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="dashboard/*" element={<Private />}>
          <Route path="user" element={<User />} />
          <Route path="user/:id" element={<CodeEditor />} />
          {/* multiple files routing */}
          <Route path="main/*">
            {/* <Route path=":id" element={<Main />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;



