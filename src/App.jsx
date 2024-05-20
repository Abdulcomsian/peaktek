import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./authentication/Login"
import Register from "./authentication/register"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
