import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import PortalLogin from "./pages/portal/PortalLogin";
import EnrollRegis from "./pages/enrollment/EnrollRegis";
import EnrollmentMain from "./pages/enrollment/EnrollmentMain";

import StudentHome from "./pages/portal/student/Portal_Student_Home";
import StudentProfile from "./pages/portal/student/Portal_Student_Profile";
import StudentSubjects from "./pages/portal/student/Portal_Student_Subjects";
import StudentGrades from "./pages/portal/student/Portal_Student_Grades";
import StudentClearance from "./pages/portal/student/Portal_Student_Clearance";
import StudentRequest from "./pages/portal/student/Portal_Student_Request";

import TeacherHome from "./pages/portal/teacher/Portal_Teacher_Home";
import TeacherProfile from "./pages/portal/teacher/Portal_Teacher_Profile";
import TeacherTeachingLoad from "./pages/portal/teacher/Portal_Teacher_Load";
import TeacherStudents from "./pages/portal/teacher/Portal_Teacher_Students";
import TeacherGrade from "./pages/portal/teacher/Portal_Teacher_Grade";
import TeacherClearance from "./pages/portal/teacher/Portal_Teacher_Clearance";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<PortalLogin />} />
                <Route path="/enroll" element={<EnrollRegis />} />
                <Route path="/enrollment-main" element={<EnrollmentMain />} />

                <Route path="/Portal_Student_Home" element={<StudentHome />} />
                <Route path="/Portal_Student_Profile" element={<StudentProfile />} />
                <Route path="/Portal_Student_Subjects" element={<StudentSubjects />} />
                <Route path="/Portal_Student_Grades" element={<StudentGrades />} />
                <Route path="/Portal_Student_Clearance" element={<StudentClearance />} />
                <Route path="/Portal_Student_Request" element={<StudentRequest />} />

                <Route path="/Portal_Teacher_Home" element={<TeacherHome />} />
                <Route path="/Portal_Teacher_Profile" element={<TeacherProfile />} />
                <Route path="/Portal_Teacher_Load" element={<TeacherTeachingLoad />} />
                <Route path="/Portal_Teacher_Students" element={<TeacherStudents />} />
                <Route path="/Portal_Teacher_Grade" element={<TeacherGrade />} />
                <Route path="/Portal_Teacher_Clearance" element={<TeacherClearance />} 




/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;