import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import PortalLogin from "./pages/portal/PortalLogin";
import EnrollRegis from "./pages/enrollment/EnrollRegis";
import EnrollmentMain from "./pages/enrollment/EnrollmentMain";
import StudentHome from "./pages/portal/student/Portal_Student_Home";
import StudentProfile from "./pages/portal/student/Portal_Student_Profile";
import RegistrarHome from "./pages/portal/registrar/Portal_Registrar_Home";
import RegistrarProfile from "./pages/portal/registrar/Portal_Registrar_Profile";
import Portal_Registrar_Studlist from "./pages/portal/registrar/Portal_Registrar_Studlist";
import Portal_Registrar_Doc from "./pages/portal/registrar/Portal_Registrar_Doc";
import Portal_Registrar_Req from "./pages/portal/registrar/Portal_Registrar_Req";

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

                <Route path="/Portal_Registrar_Home" element={<RegistrarHome />} />
                <Route path="/Portal_Registrar_Profile" element={<RegistrarProfile />} />
                <Route path="/Portal_Registrar_Studlist" element={<Portal_Registrar_Studlist />} />
                <Route path="/Portal_Registrar_Doc" element={<Portal_Registrar_Doc />} />
                <Route path="/Portal_Registrar_Req" element={<Portal_Registrar_Req />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
