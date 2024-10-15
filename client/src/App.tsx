import { BrowserRouter , Route, Routes } from "react-router-dom"
import PreNavbar from "./components/preNavbar"
import Navbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import AddQuestion from "./pages/addQuestion"
import Calender from "./pages/calender"

function App() {
  return(
    <>
    <BrowserRouter>
    {/* <PreNavbar/> */}
    <Navbar/>
    <Routes>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
        <Route path="/Add-Question" element={<AddQuestion/>}/>
        <Route path="/Calender" element={<Calender/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
