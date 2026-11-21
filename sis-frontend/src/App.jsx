import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import PortalLogin from "./pages/portal/PortalLogin";
import EnrollRegis from "./pages/enrollment/EnrollRegis";
import EnrollmentMain from "./pages/enrollment/EnrollmentMain";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<PortalLogin />} />
                <Route path="/enroll" element={<EnrollRegis />} />
                <Route path="/enrollment-main" element={<EnrollmentMain />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;