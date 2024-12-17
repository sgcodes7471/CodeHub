import { BrowserRouter , Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import AddQuestion from "./pages/addQuestion"
import Calender from "./pages/calender"
import ChatRoom from "./pages/chatRooms"
import { UserContextProvider } from "./context/userContext"
import Question from "./pages/question"
import Signup from "./pages/signup"
import Login from "./pages/login"
import ForgotPassword from "./pages/forgotPassword"
import OtpInput from "./pages/otp"
import Reset from "./pages/resetPassword"
import CodeEditor from "./pages/codeEditor"

function App() {
  return(
    <UserContextProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/Forgot-Password" element={<ForgotPassword/>}/>      
        <Route path="/Reset-Password" element={<Reset/>}/>
        <Route path="/Submit-OTP" element={<OtpInput/>}/>        
        <Route path="/Login" element={<Login/>}/>        
        <Route path="/Register" element={<Signup/>}/>        
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
        <Route path="/Add-Question" element={<AddQuestion/>}/>
        <Route path="/Calender" element={<Calender/>}/>
        <Route path="/ChatRoom" element={<ChatRoom/>}/>
        <Route path="/Question/:qid" element={<Question/>}/>
        <Route path="Code-Editor" element={<CodeEditor/>}/>
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
