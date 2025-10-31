import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Signup from "./Componenets/Signup";
import Login from "./Componenets/Login";
import Dashboard from "./Componenets/Dashboard";
import Addtask from "./Componenets/Addtask";
import Edit from "./Componenets/Edit";
import Update from "./Componenets/Update";

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Dashboard' element={<Dashboard/>}></Route>
          <Route path='/Addtask' element={<Addtask/>}></Route>
          <Route path="/Edit/:id" element={<Edit/>}></Route>
          <Route path="/Update/:id" element={<Update/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
