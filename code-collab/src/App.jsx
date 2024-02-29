import './App.css';
import {Routes , Route} from "react-router-dom";
import HomePage from './Components/Pages/CodeEditor/HomePage';
import CodeEditor from './Components/Pages/CodeEditor/CodeEditor';
import Main from './Components/Pages/CodeEditor/Main/Main';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<CodeEditor/>} />
        {/* multiple files routing */}
        <Route path='/main/*' >
          <Route path=':id' element={<Main/>} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
