import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Random from '../Components/Random'
import AdminDashboard from '../Layout/AdminDashboard'
import LoginPage from '../Pages/LoginPage'
import SignUpPage from '../Pages/SignUpPage'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import PatientDashboard from '../Layout/PatientDashboard'
import PatientProfilePage from '../Pages/Patient/PatientProfilePage'
import DoctorDashboard from '../Layout/DoctorDashboard'
import DoctorProfilePage from '../Pages/Doctor/DoctorProfilePage'
import PatientAppointmentPage from '../Pages/Patient/PatientAppointmentPage'
import DoctorAppointmentPage from '../Pages/Doctor/DoctorAppointmentPage'

const AppRoutes = () => {
return (
    <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
                    <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                        <Route path="/dashboard" element={<Random />} />
                        <Route path="/pharmacy" element={<Random />} />
                        <Route path="/patients" element={<Random />} />
                        <Route path="/appointments" element={<Random />} />
                        <Route path="/doctors" element={<Random />} />
                    </Route>
                    <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
                        <Route path="dashboard" element={<Random />} />
                        <Route path="profile" element={<PatientProfilePage />} />
                        <Route path="appointments" element={<PatientAppointmentPage />} />
                    </Route>
                    <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
                        <Route path="dashboard" element={<Random />} />
                        <Route path="profile" element={<DoctorProfilePage />} />
                        <Route path="patients" element={<Random />} />
                        <Route path="appointments" element={<DoctorAppointmentPage />} />
                        <Route path="pharmacy" element={<Random />} />
                    </Route>
                </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes