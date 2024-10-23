import { BrowserRouter , Route, Routes } from "react-router-dom"
import PreNavbar from "./components/preNavbar"
import Navbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import AddQuestion from "./pages/addQuestion"
import Calender from "./pages/calender"
import ChatRoom from "./pages/chatRooms"
import { UserContextProvider } from "./context/userContext"
import Question from "./pages/question"

function App() {
  return(
    <UserContextProvider>
    <BrowserRouter>
    {/* <PreNavbar/> */}
    <Navbar/>
    <Routes>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
        <Route path="/Add-Question" element={<AddQuestion/>}/>
        <Route path="/Calender" element={<Calender/>}/>
        <Route path="/ChatRoom" element={<ChatRoom/>}/>
        <Route path="/Question/:qid" element={<Question/>}/>
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
