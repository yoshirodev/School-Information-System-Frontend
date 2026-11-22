import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import PortalLogin from "./pages/portal/PortalLogin";
import EnrollRegis from "./pages/enrollment/EnrollRegis";
import EnrollmentMain from "./pages/enrollment/EnrollmentMain";
import StudentHome from "./pages/portal/student/Portal_Student_Home";
import StudentProfile from "./pages/portal/student/Portal_Student_Profile";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<PortalLogin />} />
                <Route path="/enroll" element={<EnrollRegis />} />
                <Route path="/enrollment-main" element={<EnrollmentMain />} />

                <Route path="/Portal_Student_Home" element={<StudentHome />} />
                <Route path="/Portal_Student_Profile" element={<StudentProfile />}

/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;