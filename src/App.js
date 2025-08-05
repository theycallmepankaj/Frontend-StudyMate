import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/contact";
import DashboardContent from "./components/Dashboard/StudentDashboard/DashboardContent";
import MainDashboardLayout from "./components/Dashboard/StudentDashboard/MainDashboardLayout";
import Home from "./components/home/home";
import Register from "./components/Register";
import LogIn from "./components/login";
import DoubtPage from "./components/Dashboard/StudentDashboard/DoubtPage";
import NotesPage from "./components/Dashboard/StudentDashboard/Notes";
import AssignmentsPage from "./components/Dashboard/StudentDashboard/AssignmentPage";
import DoubtsPage from "./components/Dashboard/StudentDashboard/FilesPage";
import FilesPage from "./components/Dashboard/StudentDashboard/FilesPage";
import FileSharingPage from "./components/Dashboard/StudentDashboard/FilesPage";
import ChatPage from "./components/Dashboard/StudentDashboard/ChatPage";
import AskQuestionPage from "./components/Dashboard/StudentDashboard/AskDobtPage";
import StudentProfilePage from "./components/Dashboard/StudentDashboard/profile";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard/TeacherDashboard";
import TeaDashboard from "./components/Dashboard/TeacherDashboard/TeaDashboard";
import TeaAssignment from "./components/Dashboard/TeacherDashboard/TeaAssignment";
import SolveDoubtsPage from "./components/Dashboard/TeacherDashboard/SolveDoubt";
import AnnouncementPage from "./components/Dashboard/TeacherDashboard/Announcement";
import CreateAssignmentPage from "./components/Dashboard/TeacherDashboard/CreateAssignment";
import SubmitAssignmmentPage from "./components/Dashboard/StudentDashboard/SubmitAssignment";
// import DoubtsPage from "./components/Dashboard/StudentDashboard/DoubtPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path='/home' element={<Home/>}/>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<LogIn />} />

        {/* NESTED ROUTE SETUP for MainDashboardLayout */}
        <Route path="mainDashboard" element={<MainDashboardLayout />}>
          <Route path="dashboard" element={<DashboardContent />} />
             <Route path="studentProfile" element={<StudentProfilePage/>}/>
              <Route path="doubtPage" element={<DoubtPage />} />
              <Route path="askQuestion" element={<AskQuestionPage/>}/>
              <Route path="assignmentPage" element={<AssignmentsPage />} />
              <Route path="submitAssignment" element={<SubmitAssignmmentPage/>}/>
               <Route path="notesPage" element={<NotesPage />} />
               <Route path="filesPage" element={<FileSharingPage/>}/>
               <Route path="chatPage" element={<ChatPage/>}/>
         
        </Route>

        <Route path="teacherDashboard" element={<TeacherDashboard/>}>
         <Route path="teaDashboard" element={<TeaDashboard/>}/>
         <Route path="teaAssignment" element={<TeaAssignment/>}/>
         <Route path="solveDoubt" element={<SolveDoubtsPage/>}/>
         <Route path="announcement" element={<AnnouncementPage/>}/>
         <Route path="createAssignment" element={<CreateAssignmentPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
